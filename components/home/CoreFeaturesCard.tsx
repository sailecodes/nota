import { Badge } from "../ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface CoreFeaturesCardProps {
  className?: string;
  title: string;
  description: string;
}

export default function CoreFeaturesCard({ className, title, description }: CoreFeaturesCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Badge className="text-sm">{title}</Badge>
        </CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
