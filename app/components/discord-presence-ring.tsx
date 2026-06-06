'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { type LanyardData, useLanyard } from 'react-use-lanyard';

export type DiscordStatus = LanyardData['discord_status'];

const statusRing: Record<DiscordStatus, string> = {
  online: 'ring-emerald-500',
  idle: 'ring-amber-500',
  dnd: 'ring-red-500',
  offline: 'ring-zinc-400'
};

export function DiscordPresenceRing({
  userId,
  initialPresence,
  children
}: {
  userId: string;
  initialPresence?: DiscordStatus;
  children: ReactNode;
}) {
  const lanyard = useLanyard<{ userId: string; socket: true }>({
    userId,
    socket: true
  });

  function getDiscordStatus() {
    if (lanyard.loading || !lanyard.status) {
      return initialPresence;
    }

    return lanyard.status.discord_status;
  }

  const discordStatus = getDiscordStatus();

  return (
    <div
      className={clsx(
        'shrink-0 rounded-full transition-shadow',
        discordStatus &&
          `ring-2 ring-offset-2 ring-offset-background ${statusRing[discordStatus]}`
      )}
    >
      {children}
    </div>
  );
}
