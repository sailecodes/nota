"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { updateUserInformation } from "@/actions/account";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { userInformationSchema } from "@/lib/zodSchemas";

export default function AccountPage() {
  const { user } = useUser();

  const userInformationForm = useForm<z.infer<typeof userInformationSchema>>({
    resolver: zodResolver(userInformationSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      username: user?.username ?? "",
    },
  });

  const [isUpdatingUserInformation, setIsUpdatingUserInformation] = useState<boolean>(false);
  const userInformation = userInformationForm.watch();

  const handleUpdateUserInformation = (data: z.infer<typeof userInformationSchema>) => {
    try {
      setIsUpdatingUserInformation(true);
      updateUserInformation(data);
      setIsUpdatingUserInformation(false);
      // TODO: Update button to be disabled with new information
    } catch (err) {
      console.error("Account update error: ", err);
    }
  };

  const [newEmail, setNewEmail] = useState("");
  const handleEmailUpdate = () => {};

  // const handleSave = async () => {
  //   if (!user) return;

  //   setIsSaving(true);

  //   try {
  //     await user.update({ firstName, lastName, username });
  //   } catch (err) {
  //     console.error("Update error:", err);
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };

  // const handleDeleteAccount = async () => {
  //   if (confirm("Are you sure you want to delete your account? This cannot be undone.")) {
  //     try {
  //       await user?.delete();
  //     } catch (err) {
  //       console.log("Account deletion error: ", err);
  //     }
  //   }
  // };

  return (
    <div className="flex flex-col gap-3 max-w-7xl mx-auto p-4">
      {/* Profile Settings */}
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Profile information</CardTitle>
        </CardHeader>
        <CardContent className="">
          <Form {...userInformationForm}>
            <form
              onSubmit={userInformationForm.handleSubmit(handleUpdateUserInformation)}
              className="grid grid-cols-2 gap-4 items-end">
              <FormField
                control={userInformationForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={userInformationForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={userInformationForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="secondary"
                disabled={
                  isUpdatingUserInformation ||
                  (userInformation.firstName === user?.firstName &&
                    userInformation.lastName === user?.lastName &&
                    userInformation.username === user?.username)
                }
                className="justify-self-end">
                {isUpdatingUserInformation ? "Updating..." : "Update"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Email Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Current:</p>
            <p>{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter new email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <Button onClick={handleEmailUpdate}>Update Email</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            You'll receive a verification email to confirm the change.
          </p>
        </CardContent>
      </Card> */}

      {/* <Card className="bg-background">
        <CardHeader>
          <CardTitle>Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            You&apos;ll receive a secure link to reset your password.
          </p>
          <Button variant="secondary">Reset password</Button>
        </CardContent>
      </Card>
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Subscription & Billing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Plan</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">Starter</Badge>
                <span className="text-sm text-muted-foreground">Renews Apr 30, 2025</span>
              </div>
            </div>
            <Button variant="secondary">Manage Plan</Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Usage</p>
              <p className="text-sm font-medium mt-1">2 / 3 uploads used</p>
            </div>
            <Button
              variant="secondary"
              size="sm">
              Upgrade
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Subscription & Billing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Plan</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">Starter</Badge>
                <span className="text-sm text-muted-foreground">Renews Apr 30, 2025</span>
              </div>
            </div>
            <Button variant="secondary">Manage Plan</Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Usage</p>
              <p className="text-sm font-medium mt-1">2 / 3 uploads used</p>
            </div>
            <Button
              variant="secondary"
              size="sm">
              Upgrade
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="border-red-400">
        <CardHeader>
          <CardTitle className="text-red-400">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}>
            Delete account
          </Button>
        </CardContent>
      </Card> */}
    </div>
  );
}
