import { Badge } from "../ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface CoreFeaturesCardProps {
  title: string;
  description: string;
  icon: any;
  isLong?: boolean;
}

export default function CoreFeaturesCard({
  title,
  description,
  icon,
  isLong,
}: CoreFeaturesCardProps) {
  return (
    <Card
      className={`${
        isLong ? "col-span-2" : ""
      } py-8 hover:cursor-default hover:border-primary hover:bg-secondary`}>
      <CardHeader className="flex flex-col gap-4">
        <CardTitle className="flex items-center gap-3">
          {icon}
          <Badge>
            <p className="text-base">{title}</p>
          </Badge>
        </CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
