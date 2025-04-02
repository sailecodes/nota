import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { RiNextjsLine } from "react-icons/ri";
import {
  SiClerk,
  SiDeepgram,
  SiGithub,
  SiGooglegemini,
  SiLangchain,
  SiLinkedin,
  SiPostgresql,
  SiPrisma,
  SiShadcnui,
  SiTailwindcss,
  SiZod,
} from "react-icons/si";
import NavLinksLink from "./nav-links-link";

const NavLinksSocialContent = [
  {
    header: "Other projects",
    links: ["https://github.com/sailecodes"],
    linkTexts: ["GitHub"],
    linkIcons: [<SiGithub className="text-primary" />],
  },
  {
    header: "Let's connect",
    links: ["https://linkedin.com/in/elias-iv-roman/"],
    linkTexts: ["LinkedIn"],
    linkIcons: [<SiLinkedin className="text-primary" />],
  },
];

const NavLinksStackContent = [
  {
    header: "Framework",
    links: ["https://nextjs.org/"],
    linkTexts: ["Next.js"],
    linkIcons: [<RiNextjsLine className="text-primary" />],
  },
  {
    header: "Authentication",
    links: ["https://clerk.com/", "https://zod.dev/"],
    linkTexts: ["Clerk", "zod"],
    linkIcons: [<SiClerk className="text-primary" />, <SiZod className="text-primary" />],
  },
  {
    header: "Database",
    links: ["https://neon.tech/", "https://www.prisma.io/"],
    linkTexts: ["Postgres (Neon)", "Prisma"],
    linkIcons: [<SiPostgresql className="text-primary" />, <SiPrisma className="text-primary" />],
  },
  {
    header: "Styling",
    links: ["https://tailwindcss.com/", "https://ui.shadcn.com/"],
    linkTexts: ["Tailwind CSS", "shadcn/ui"],
    linkIcons: [
      <SiTailwindcss className="text-primary" />,
      <SiShadcnui className="text-primary" />,
    ],
  },
  {
    header: "AI Models",
    links: [
      "https://deepgram.com/",
      "https://www.langchain.com/",
      "https://deepmind.google/technologies/gemini/",
    ],
    linkTexts: ["Deepgram", "Langchain", "Gemini"],
    linkIcons: [
      <SiDeepgram className="text-primary" />,
      <SiLangchain className="text-primary" />,
      <SiGooglegemini className="text-primary" />,
    ],
  },
];

export default function NavLinks() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4">
        <NavigationMenuItem>
          <Link
            href="/pricing"
            legacyBehavior
            passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Pricing
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Socials</NavigationMenuTrigger>
          <NavigationMenuContent className="grid grid-cols-[max-content_max-content] gap-5 px-4 py-4">
            {NavLinksSocialContent.map((content) => (
              <NavLinksLink
                key={content.header}
                header={content.header}
                links={content.links}
                linkTexts={content.linkTexts}
                linkIcons={content.linkIcons!}
              />
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Stack</NavigationMenuTrigger>
          <NavigationMenuContent className="grid grid-cols-[max-content_max-content_max-content] gap-5 px-4 py-4">
            {NavLinksStackContent.map((content) => (
              <NavLinksLink
                key={content.header}
                header={content.header}
                links={content.links}
                linkTexts={content.linkTexts}
                linkIcons={content.linkIcons!}
              />
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
