import { DiscordIcon, EmailIcon, GitHubIcon } from '../icons';
import { profile } from './profile';

export const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/camdzic',
    Icon: GitHubIcon
  },
  {
    label: 'Discord',
    href: `https://discord.com/users/${profile.discordId}`,
    Icon: DiscordIcon
  },
  {
    label: 'Email',
    href: 'mailto:acamdzic0@proton.me',
    Icon: EmailIcon
  }
] as const;
