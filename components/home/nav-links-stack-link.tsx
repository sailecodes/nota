import { NavigationMenuLink } from "../ui/navigation-menu";

interface NavLinksStackLinkProps {
  header: string;
  links: string[];
  linkTexts: string[];
  linkIcons: any[];
}

export default function NavLinksStackLink({ header, links, linkTexts, linkIcons }: NavLinksStackLinkProps) {
  return (
    <div>
      <header className="font-semibold text-muted-foreground text-sm text-nowrap px-2 mb-1">{header}</header>
      <div>
        {linkTexts.map((linkText, ind) => (
          <NavigationMenuLink
            key={linkText}
            href={links[ind]}
            target="_blank">
            <div className="flex gap-2 items-center">
              {linkIcons[ind]}
              <p className="text-base">{linkText}</p>
            </div>
          </NavigationMenuLink>
        ))}
      </div>
    </div>
  );
}
