import { JSX } from "react";
import GitHubIcon from "./icons/github-icon";
import LinkedInIcon from "./icons/linkedin-icon";
import WebsiteIcon from "./icons/website-icon";

const socials: { id: string; goto: string; icon: JSX.Element }[] = [
  {
    id: "git-hub",
    goto: "https://github.com/and3sil4/byaas",
    icon: <GitHubIcon />,
  },
  {
    id: "linked-in",
    goto: "https://linkedin.com/in/and3sil4",
    icon: <LinkedInIcon />,
  },
  {
    id: "website",
    goto: "https://and3sil4.vercel.app/",
    icon: <WebsiteIcon />,
  },
];

const Footer = () => {
  const dateTime = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t border-border bg-muted px-20 py-4 flex
    flex-col sm:flex-row justify-around items-center gap-2 text-xs"
    >
      <p className="text-muted-foreground text-center sm:text-left flex flex-wrap items-center gap-x-1">
        &copy; {dateTime} All rights reserved.&nbsp;Developed with love by{" "}
        <a
          href="https://github.com/and3sil4"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent font-bold hover:underline transition-colors"
        >
          AND3SIL4
        </a>
      </p>

      <div className="flex gap-2">
        {/* Render socials and their call to actions */}
        {socials.map((social) => (
          <a
            key={social.id}
            href={social.goto}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent border rounded-full hover:border-accent transition-colors p-2"
            aria-label={social.id}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
