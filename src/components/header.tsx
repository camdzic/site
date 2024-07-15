import { discordURL, githubURL } from '@/data';
import { DiscordLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';

import Link from 'next/link';

import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';

export default function Header() {
  return (
    <div className="flex items-center justify-end space-x-1 p-6">
      <Link href={githubURL} target="_blank" rel="noreferrer">
        <Button variant="ghost" size="icon">
          <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">GitHub</span>
        </Button>
      </Link>
      <Link href={discordURL} target="_blank" rel="noreferrer">
        <Button variant="ghost" size="icon">
          <DiscordLogoIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Discord</span>
        </Button>
      </Link>
      <div className="h-5 w-[6px]" />
      <ModeToggle />
    </div>
  );
}
