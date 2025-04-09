"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Form } from "../../ui/form";
import { profileInformationSchema } from "@/lib/schemas/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateProfileInformation } from "@/actions/account.actions";
import { User } from "@supabase/supabase-js";
import CustomField from "../../general/custom-field";
import { toast } from "sonner";
import { CheckCircle2, CircleX } from "lucide-react";

interface ProfileInformationProps {
  user: User;
}

export default function ProfileInformation({ user }: ProfileInformationProps) {
  const userInformationForm = useForm<z.infer<typeof profileInformationSchema>>({
    resolver: zodResolver(profileInformationSchema),
    defaultValues: {
      firstName: user.user_metadata.firstName,
      lastName: user.user_metadata.lastName,
    },
  });
  const userInformationFormVals = userInformationForm.watch();
  const [isUpdatingUserInformation, setIsUpdatingUserInformation] = useState<boolean>(false);

  const handleUpdateUserInformation = async (data: z.infer<typeof profileInformationSchema>) => {
    setIsUpdatingUserInformation(true);

    const res = await updateProfileInformation(data);

    setIsUpdatingUserInformation(false);

    if (res) {
      console.error("Profile information update error: ", res.msg);
      toast.error(res.msg, { icon: <CircleX className="w-4 h-4 stroke-red-300" /> });
    } else {
      toast.success("Profile information updated!", {
        icon: <CheckCircle2 className="w-4 h-4 stroke-green-300" />,
      });
    }
  };

  return (
    <Card className="col-span-full bg-background">
      <CardHeader>
        <CardTitle>Profile information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...userInformationForm}>
          <form
            onSubmit={userInformationForm.handleSubmit(handleUpdateUserInformation)}
            className="flex gap-4">
            <CustomField
              control={userInformationForm.control}
              name="firstName"
              label="First name"
              className="flex-1"
            />
            <CustomField
              control={userInformationForm.control}
              name="lastName"
              label="Last name"
              className="flex-1"
            />
            <Button
              type="submit"
              variant="secondary"
              disabled={
                isUpdatingUserInformation ||
                (userInformationFormVals.firstName === user.user_metadata.firstName &&
                  userInformationFormVals.lastName === user.user_metadata.lastName)
              }
              className="self-end w-[158px]">
              {isUpdatingUserInformation ? "Updating..." : "Update information"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
