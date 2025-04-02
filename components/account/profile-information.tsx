"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { profileInformationSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateProfileInformation } from "@/actions/account";

interface ProfileInformationProps {
  user: any;
  isLoaded: boolean;
}

export default function ProfileInformation({ user, isLoaded }: ProfileInformationProps) {
  const userInformationForm = useForm<z.infer<typeof profileInformationSchema>>({
    resolver: zodResolver(profileInformationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
    },
  });
  const userInformation = userInformationForm.watch();
  const [isUpdatingUserInformation, setIsUpdatingUserInformation] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded)
      userInformationForm.reset({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        username: user?.username || "",
      });
  }, [isLoaded]);

  const handleUpdateUserInformation = async (data: z.infer<typeof profileInformationSchema>) => {
    try {
      setIsUpdatingUserInformation(true);
      await updateProfileInformation(data);
      setIsUpdatingUserInformation(false);
      await user?.reload();
    } catch (err) {
      console.error("User information update error: ", err);
    }
  };

  return (
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
                (userInformation.firstName === user?.firstName &&
                  userInformation.lastName === user?.lastName &&
                  userInformation.username === user?.username)
              }
              className="self-end justify-self-end w-[158px]">
              {isUpdatingUserInformation ? "Updating..." : "Update information"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
