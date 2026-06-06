import type { Metadata } from 'next';
import Image from 'next/image';
import type { LanyardResponse } from 'react-use-lanyard';
import { Clock } from './components/clock';
import { DiscordActivities } from './components/discord-activities';
import { DiscordPresenceRing } from './components/discord-presence-ring';
import { PageShell } from './components/page-shell';
import { profile } from './data/profile';
import { socials } from './data/socials';
import { tech } from './data/tech';
import {
  type DisplayActivity,
  normalizeActivities
} from './lib/discord-activity';

export const metadata: Metadata = {
  title: `Home · ${profile.name}`
};

const emptyLanyard = {
  discordStatus: undefined,
  activities: [] as DisplayActivity[]
};

async function fetchInitialLanyard(userId: string) {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      return emptyLanyard;
    }

    const { data }: LanyardResponse = await res.json();

    return {
      discordStatus: data.discord_status,
      activities: normalizeActivities(data.activities)
    };
  } catch {
    return emptyLanyard;
  }
}

export default async function Home() {
  const initial = await fetchInitialLanyard(profile.discordId);

  return (
    <PageShell className="gap-10">
      <header className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <DiscordPresenceRing
          initialPresence={initial.discordStatus}
          userId={profile.discordId}
        >
          <Image
            alt={profile.name}
            className="h-20 w-20 rounded-full"
            height={80}
            priority
            src="/avatar.png"
            width={80}
          />
        </DiscordPresenceRing>

        <div className="flex flex-col items-start gap-2">
          <Clock />

          <h1 className="font-semibold font-serif text-4xl tracking-tight sm:text-5xl">
            {profile.name}
          </h1>
        </div>
      </header>

      <ul className="flex gap-3">
        {socials.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              aria-label={label}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              href={href}
              rel="noreferrer noopener"
              target="_blank"
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        ))}
      </ul>

      <DiscordActivities
        initialActivities={initial.activities}
        userId={profile.discordId}
      />

      <section className="flex flex-col items-start gap-3">
        <h2 className="font-semibold text-muted text-sm uppercase tracking-widest">
          About Me
        </h2>

        <p className="max-w-md text-base leading-relaxed">
          {profile.siteAbout}
        </p>
      </section>

      <section className="flex flex-col items-start gap-4">
        <h2 className="font-semibold text-muted text-sm uppercase tracking-widest">
          Technologies &amp; Frameworks
        </h2>

        <ul className="flex flex-wrap gap-6 text-muted">
          {tech.map(({ label, Icon }) => (
            <li key={label}>
              <Icon className="h-7 w-7" />
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
