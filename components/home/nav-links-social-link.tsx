import { NavigationMenuLink } from "../ui/navigation-menu";

interface NavLinksSocialLinkProps {
  link: string;
  icon: any;
  header: string;
  tagline: string;
}

export default function NavLinksSocialLink({ link, icon, header, tagline }: NavLinksSocialLinkProps) {
  return (
    <NavigationMenuLink
      href={link}
      target="_blank">
      <div className="flex items-center gap-2">
        {icon}
        <header className="text-base font-semibold">{header}</header>
      </div>
      <p className="text-muted-foreground">{tagline}</p>
    </NavigationMenuLink>
  );
}
