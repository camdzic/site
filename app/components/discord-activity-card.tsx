'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { DisplayActivity } from '../lib/discord-activity';

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1_000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function ProgressBar({ startMs, endMs }: { startMs: number; endMs: number }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());

    const id = setInterval(() => {
      setNow(Date.now());
    }, 1_000);

    return () => {
      clearInterval(id);
    };
  }, []);

  const total = Math.max(0, endMs - startMs);
  const elapsed =
    now === null ? 0 : Math.max(0, Math.min(total, now - startMs));
  const percent = total > 0 ? (elapsed / total) * 100 : 0;

  return (
    <div className="mt-2 flex w-full flex-col gap-1">
      <div className="h-[2px] w-full overflow-hidden rounded-full bg-foreground/10">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-1000 ease-linear"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex justify-between font-mono text-xs text-muted">
        <span>{formatTime(elapsed)}</span>
        <span>{formatTime(total)}</span>
      </div>
    </div>
  );
}

function CardBody({ activity }: { activity: DisplayActivity }) {
  return (
    <>
      <div className="relative shrink-0">
        <Image
          alt={activity.largeImageAlt}
          className="rounded-xl object-cover"
          height={56}
          src={activity.largeImageUrl}
          unoptimized
          width={56}
        />

        {activity.smallImageUrl && (
          <Image
            alt={activity.smallImageAlt || ''}
            className="-right-1 -bottom-1 absolute rounded-full object-cover ring-2 ring-surface"
            height={22}
            src={activity.smallImageUrl}
            unoptimized
            width={22}
          />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate font-medium text-foreground">{activity.name}</p>

        {activity.details && (
          <p className="truncate text-foreground text-sm">{activity.details}</p>
        )}

        {activity.state && (
          <p className="truncate text-foreground text-sm">{activity.state}</p>
        )}

        {activity.progress && (
          <ProgressBar
            endMs={activity.progress.endMs}
            key={activity.progress.startMs}
            startMs={activity.progress.startMs}
          />
        )}
      </div>
    </>
  );
}

export function DiscordActivityCard({
  activity
}: {
  activity: DisplayActivity;
}) {
  const className = clsx(
    'flex w-full items-center gap-4 rounded-2xl bg-surface px-4 py-3',
    activity.href &&
      'transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
  );

  if (activity.href) {
    return (
      <a
        className={className}
        href={activity.href}
        rel="noreferrer noopener"
        target="_blank"
      >
        <CardBody activity={activity} />
      </a>
    );
  }

  return (
    <div className={className}>
      <CardBody activity={activity} />
    </div>
  );
}
