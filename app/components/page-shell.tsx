'use client';

import clsx from 'clsx';
import { motion } from 'motion/react';
import { type ReactNode, useEffect, useState } from 'react';
import { ThemeToggle } from './theme-toggle';

export function PageShell({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col items-start justify-start px-6 pt-8 pb-12 sm:pt-28">
        <motion.div
          animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          className={clsx('flex w-full flex-col items-start', className)}
          initial={false}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </main>

      <ThemeToggle />
    </>
  );
}
