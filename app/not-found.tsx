import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from './components/page-shell';
import { profile } from './data/profile';

export const metadata: Metadata = {
  title: `Page not found · ${profile.name}`
};

export default function NotFound() {
  return (
    <PageShell className="gap-6">
      <p className="font-mono text-sm tabular-nums text-muted">
        404 · Not Found
      </p>
      <h1 className="font-serif text-5xl font-semibold tracking-tight sm:text-6xl">
        Page not found
      </h1>
      <p className="max-w-md text-base leading-relaxed">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>
      <Link
        className="text-sm font-medium text-accent underline-offset-4 hover:underline"
        href="/"
      >
        &larr; Back home
      </Link>
    </PageShell>
  );
}
