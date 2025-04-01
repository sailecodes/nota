"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { changeUserEmail, updateUserInformation } from "@/actions/account";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { userEmailSchema, userInformationSchema } from "@/lib/zodSchemas";
import AccountSkeleton from "@/components/account/account-skeleton";

export default function AccountPage() {
  const { user, isLoaded } = useUser();

  const userInformationForm = useForm<z.infer<typeof userInformationSchema>>({
    resolver: zodResolver(userInformationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
    },
  });

  const userEmailForm = useForm<z.infer<typeof userEmailSchema>>({
    resolver: zodResolver(userEmailSchema),
    defaultValues: {
      emailAddress: "",
    },
  });

  const [isUpdatingUserInformation, setIsUpdatingUserInformation] = useState<boolean>(false);
  const [isChangingEmail, setIsChangingEmail] = useState<boolean>(false);
  const [userData, setUserData] = useState<{
    firstName: string;
    lastName: string;
    username: string;
    emailAddress: string;
  } | null>(null);

  const userInformation = userInformationForm.watch();
  const userEmail = userEmailForm.watch();

  useEffect(() => {
    if (isLoaded) {
      userInformationForm.reset({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        username: user?.username || "",
      });

      userEmailForm.reset({
        emailAddress: user?.primaryEmailAddress?.emailAddress || "",
      });

      setUserData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        username: user?.username || "",
        emailAddress: user?.primaryEmailAddress?.emailAddress || "",
      });
    }
  }, [isLoaded]);

  const handleUpdateUserInformation = async (data: z.infer<typeof userInformationSchema>) => {
    try {
      setIsUpdatingUserInformation(true);
      updateUserInformation(data);
      setIsUpdatingUserInformation(false);

      const updatedUser = await user?.reload();

      setUserData({
        firstName: updatedUser?.firstName || "",
        lastName: updatedUser?.lastName || "",
        username: updatedUser?.username || "",
        emailAddress: userData?.emailAddress || "",
      });
    } catch (err) {
      console.error("User information update error: ", err);
    }
  };

  const handleChangeUserEmail = async (data: z.infer<typeof userEmailSchema>) => {
    try {
      setIsChangingEmail(true);
      changeUserEmail(data);
      setIsChangingEmail(false);

      const updatedUser = await user?.reload();

      setUserData({
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        username: userData?.username || "",
        emailAddress: updatedUser?.primaryEmailAddress?.emailAddress || "",
      });
    } catch (err) {
      console.error("Email change error", err);
    }
  };

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
    <>
      {isLoaded && (
        <div className="flex flex-col gap-3 max-w-7xl mx-auto p-4">
          {/* Profile Settings */}
          <Card className="bg-background">
            <CardHeader>
              <CardTitle>Profile information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...userInformationForm}>
                <form
                  onSubmit={userInformationForm.handleSubmit(handleUpdateUserInformation)}
                  className="grid grid-cols-2 gap-4">
                  <FormField
                    control={userInformationForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">First name</FormLabel>
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
                        <FormLabel className="text-muted-foreground">Last name</FormLabel>
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
                        <FormLabel className="text-muted-foreground">Username</FormLabel>
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
                      (userInformation.firstName === userData?.firstName &&
                        userInformation.lastName === userData?.lastName &&
                        userInformation.username === userData?.username)
                    }
                    className="self-end justify-self-end">
                    {isUpdatingUserInformation ? "Updating..." : "Update information"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          {/* Email address */}
          <Card className="bg-background">
            <CardHeader>
              <CardTitle>Email address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...userEmailForm}>
                <form
                  className="flex justify-between gap-4"
                  onSubmit={userEmailForm.handleSubmit(handleChangeUserEmail)}>
                  <FormField
                    control={userEmailForm.control}
                    name="emailAddress"
                    render={({ field }) => (
                      <FormItem className="grow-1">
                        <FormLabel className="text-muted-foreground">Primary</FormLabel>
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
                    disabled={userEmail.emailAddress === userData?.emailAddress}
                    className="self-end">
                    {isChangingEmail ? "Changing..." : "Change email"}
                  </Button>
                </form>
              </Form>
              <p className="text-xs text-muted-foreground">
                You'll receive a verification email to confirm the change.
              </p>
            </CardContent>
          </Card>
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
      )}
    </>
  );
}
