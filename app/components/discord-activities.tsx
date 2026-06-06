'use client';

import { useLanyard } from 'react-use-lanyard';
import {
  type DisplayActivity,
  normalizeActivities
} from '../lib/discord-activity';
import { DiscordActivityCard } from './discord-activity-card';

export function DiscordActivities({
  userId,
  initialActivities
}: {
  userId: string;
  initialActivities: DisplayActivity[];
}) {
  const lanyard = useLanyard<{ userId: string; socket: true }>({
    userId,
    socket: true
  });

  const activities =
    lanyard.loading || !lanyard.status
      ? initialActivities
      : normalizeActivities(lanyard.status.activities);

  if (activities.length === 0) {
    return null;
  }

  return (
    <section className="flex w-full flex-col items-start gap-4">
      <h2 className="font-semibold text-muted text-sm uppercase tracking-widest">
        Now Active
      </h2>

      <ul className="flex w-full flex-col gap-3">
        {activities.map((activity) => (
          <li className="w-full" key={activity.id}>
            <DiscordActivityCard activity={activity} />
          </li>
        ))}
      </ul>
    </section>
  );
}
