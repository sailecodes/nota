"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { emailAddressSchema } from "@/lib/schemas/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { changeEmailAddress } from "@/actions/account.actions";
import { CheckCircle2, CircleX, Verified } from "lucide-react";
import { Badge } from "../../ui/badge";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

interface EmailAddressProps {
  user: User;
}

export default function EmailAddress({ user }: EmailAddressProps) {
  const emailAddressForm = useForm<z.infer<typeof emailAddressSchema>>({
    resolver: zodResolver(emailAddressSchema),
    defaultValues: {
      emailAddress: user.email,
    },
  });
  const emailAddressFormVals = emailAddressForm.watch();
  const [isChangingEmailAddress, setIsChangingEmailAddress] = useState<boolean>(false);

  const handleChangeEmailAddress = async (data: z.infer<typeof emailAddressSchema>) => {
    setIsChangingEmailAddress(true);

    const res = await changeEmailAddress(data);

    setIsChangingEmailAddress(false);

    if (res) {
      console.error("Email change error: ", res.msg);
      toast.error(res.msg, { icon: <CircleX className="w-4 h-4 stroke-red-300" /> });
    } else {
      toast.success("Email verification sent!", {
        description: `We've sent you a confirmation email at ${emailAddressFormVals.emailAddress}.`,
        icon: <CheckCircle2 className="w-4 h-4 stroke-green-300" />,
      });
    }
  };

  return (
    <Card className="col-span-full bg-background">
      <CardHeader>
        <CardTitle>Email Address</CardTitle>
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
                    {user.confirmed_at ? (
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
              disabled={emailAddressFormVals.emailAddress === user.email}
              className="self-end w-[158px]">
              {isChangingEmailAddress ? "Changing..." : "Change email"}
            </Button>
          </form>
        </Form>
        <p className="text-xs text-muted-foreground">
          You'll receive a verification email to confirm before any permanent change is shown.
        </p>
      </CardContent>
    </Card>
  );
}
