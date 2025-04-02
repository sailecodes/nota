"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { emailAddressSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { changeEmailAddress } from "@/actions/account";
import { Verified } from "lucide-react";
import { Badge } from "../ui/badge";
import { UserResource } from "@clerk/types";

interface EmailAddressProps {
  user: UserResource | null;
  isLoaded: boolean;
}

export default function EmailAddress({ user, isLoaded }: EmailAddressProps) {
  const emailAddressForm = useForm<z.infer<typeof emailAddressSchema>>({
    resolver: zodResolver(emailAddressSchema),
    defaultValues: {
      emailAddress: "",
    },
  });
  const emailAddress = emailAddressForm.watch();
  const [isChangingEmailAddress, setIsChangingEmailAddress] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded) {
      emailAddressForm.reset({
        emailAddress: user?.primaryEmailAddress?.emailAddress || "",
      });
    }
  }, [isLoaded]);

  const handleChangeEmailAddress = async (data: z.infer<typeof emailAddressSchema>) => {
    try {
      setIsChangingEmailAddress(true);
      await changeEmailAddress(data);
      setIsChangingEmailAddress(false);
      await user?.reload();
    } catch (err) {
      console.error("Email change error: ", err);
    }
  };

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Email address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...emailAddressForm}>
          <form
            className="flex justify-between gap-4"
            onSubmit={emailAddressForm.handleSubmit(handleChangeEmailAddress)}>
            <FormField
              control={emailAddressForm.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem className="grow-1">
                  <FormLabel className="gap-1 text-muted-foreground">
                    <span>Primary</span>
                    {user?.primaryEmailAddress?.verification.status === "verified" ? (
                      <Verified className="w-4 h-4 stroke-green-300" />
                    ) : (
                      <Badge className=" ml-1">Not verified</Badge>
                    )}
                  </FormLabel>
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
              disabled={emailAddress.emailAddress === user?.primaryEmailAddress?.emailAddress}
              className="self-end w-[119px]">
              {isChangingEmailAddress ? "Changing..." : "Change email"}
            </Button>
          </form>
        </Form>
        <p className="text-xs text-muted-foreground">
          You'll receive a verification email to confirm before any change is shown.
        </p>
      </CardContent>
    </Card>
  );
}
