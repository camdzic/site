'use client';

import { useEffect, useState } from 'react';
import { profile } from '../data/profile';

const formatter = new Intl.DateTimeFormat(profile.locale, {
  timeZone: profile.timeZone,
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});

export function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = window.setInterval(update, 10_000);

    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="font-mono text-sm tabular-nums text-muted">
      <span>{time ?? '--:--'}</span>
      <span> · {profile.timeZone}</span>
    </p>
  );
}
