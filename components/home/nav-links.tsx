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
import NavLinksStackLink from "./nav-links-stack-link";
import NavLinksSocialLink from "./nav-links-social-link";

const NavLinksSocialContent = [
  {
    link: "https://github.com/sailecodes",
    icon: <SiGithub className="text-primary" />,
    header: "GitHub",
    tagline: "View my projects",
  },
  {
    link: "https://linkedin.com/in/elias-iv-roman/",
    icon: <SiLinkedin className="text-primary" />,
    header: "LinkedIn",
    tagline: "Let's connect",
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
    linkIcons: [<SiTailwindcss className="text-primary" />, <SiShadcnui className="text-primary" />],
  },
  {
    header: "AI Models",
    links: ["https://deepgram.com/", "https://www.langchain.com/", "https://deepmind.google/technologies/gemini/"],
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
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link
            href="/pricing"
            legacyBehavior
            passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Pricing</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Socials</NavigationMenuTrigger>
          <NavigationMenuContent className="grid grid-cols-[122px_122px] gap-3 min-w-[max-content] px-4 py-2">
            {NavLinksSocialContent.map((socialContent) => (
              <NavLinksSocialLink
                key={socialContent.header}
                link={socialContent.link}
                icon={socialContent.icon}
                header={socialContent.header}
                tagline={socialContent.tagline}
              />
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Stack</NavigationMenuTrigger>
          <NavigationMenuContent className="grid grid-cols-[155px_155px_155px] gap-3 px-4 py-4">
            {NavLinksStackContent.map((content) => (
              <NavLinksStackLink
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
