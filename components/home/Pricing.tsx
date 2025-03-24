import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Check } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";

export default function Pricing() {
  return (
    <div className="flex flex-col gap-5 py-24">
      <header className="text-4xl font-bold">Simple, transparent pricing</header>
      <p className="text-muted-foreground text-lg">
        Get started with smart meeting summaries and action tracking. Upgrade when your workflow
        grows.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <Card className="h-[550px]">
          <CardHeader>
            <CardTitle className="text-xl">Starter</CardTitle>
            <CardDescription>
              <p className="text-base mb-5">
                Get started with Nota and make meetings more manageable — no commitments, just
                smarter workflows.
              </p>
              <p className="text-black text-4xl font-bold">Free</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Check />
              <p>Up to 5 uploads/mo (max 100MB each)</p>
            </div>
            <div className="flex gap-2">
              <Check />
              <p>AI-powered transcription & summaries</p>
            </div>
            <div className="flex gap-2">
              <Check />
              <p>Automatic action item extraction</p>
            </div>
            <div className="flex gap-2">
              <Check />
              <p>Access to dashboard & smart search</p>
            </div>
            <div className="flex gap-2">
              <Check />
              <p>Email support</p>
            </div>
          </CardContent>
          <CardFooter className="mt-auto">
            <Link
              href="/payment"
              className={buttonVariants({
                size: "lg",
                variant: "default",
                className: "w-full",
              })}>
              Get Started Now
            </Link>
          </CardFooter>
        </Card>
        <Card className="h-[550px]">
          <CardHeader>
            <CardTitle className="text-xl">Team</CardTitle>
            <CardDescription>
              <p className="text-base mb-5">
                For professionals and teams who need reliable transcription, summaries, and action
                tracking — with more power and fewer limits.
              </p>
              <p className="text-black text-4xl font-bold">$15/mo</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Check />
              <p>Unlimited uploads (max 500MB each)</p>
            </div>
            <div className="flex gap-2">
              <Check />
              <p>Faster processing & priority support</p>
            </div>
          </CardContent>
          <CardFooter className="mt-auto">
            <Link
              href="/payment"
              className={buttonVariants({
                size: "lg",
                variant: "default",
                className: "w-full",
              })}>
              Upgrade To Pro
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
