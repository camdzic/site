'use client';

import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '../icons';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') {
    return 'light';
  }

  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';

    setTheme(next);

    document.documentElement.classList.toggle('dark', next === 'dark');

    try {
      localStorage.setItem('theme', next);
    } catch {}
  };

  return (
    <button
      aria-label={
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      }
      className="absolute top-5 right-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface text-muted shadow-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      onClick={toggle}
      type="button"
    >
      {mounted && theme === 'dark' ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
}
