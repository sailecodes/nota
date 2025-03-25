import { NavigationMenuLink } from "../ui/navigation-menu";

interface NavLinksLinkProps {
  header: string;
  links: string[];
  linkTexts: string[];
  linkIcons: any[];
}

export default function NavLinksLink({ header, links, linkTexts, linkIcons }: NavLinksLinkProps) {
  return (
    <div>
      <header className="text-muted-foreground text-sm text-nowrap font-semibold px-2 mb-1">
        {header}
      </header>
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
