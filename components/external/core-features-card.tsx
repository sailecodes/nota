import { ICoreFeaturesCardProps } from "@/schemas";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function CoreFeaturesCard({ title, description, icon }: ICoreFeaturesCardProps) {
  return (
    <div
      className={`p-[2px] rounded-xl hover:cursor-default hover:bg-gradient-to-r hover:from-blue-600 hover:via-green-500 hover:to-indigo-400 animate-gradient-x`}>
      <Card className="h-full py-8 hover:bg-background">
        <CardHeader className="flex flex-col gap-4">
          <CardTitle className="flex items-center gap-3">
            {icon}
            <p>{title}</p>
          </CardTitle>
          <CardDescription className="text-sm/relaxed">{description}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
