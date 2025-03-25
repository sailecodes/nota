import { Card } from "../ui/card";

export default function Demo() {
  return (
    <div className="flex flex-col gap-5 py-24">
      <header className="text-5xl font-bold">Nota in Action</header>
      <p className="text-muted-foreground text-lg font-semibold">
        See how your meetings are transformed into organized, actionable notes in seconds.
      </p>
      <Card className="h-[650px]">{/* TODO: Placeholder */}</Card>
    </div>
  );
}
