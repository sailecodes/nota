"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { AlertDialogHeader, AlertDialogFooter } from "../../ui/alert-dialog";
import { Button } from "../../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { deleteAccount } from "@/actions/account.action";
import { useRouter } from "next/navigation";

export default function Danger() {
  const router = useRouter();

  return (
    <Card className="col-span-full border-red-400">
      <CardHeader>
        <CardTitle className="text-red-400">Danger Zone</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <span className="text-sm text-muted-foreground">
          Permanently delete your account and all associated data.
        </span>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="w-[158px] hover:cursor-pointer">
              Delete account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. To reiterate, this will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="hover:cursor-pointer">Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="hover:cursor-pointer"
                onClick={() => {
                  deleteAccount();
                  router.push("/");
                }}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
