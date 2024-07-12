import MainLayout from '@/components/main-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { skills } from '@/data';

export default function Home() {
  return (
    <MainLayout>
      <section className="flex flex-col">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
              Hi, I&apos;m Aldin 👋
            </h1>
            <p className="mt-1 md:text-xl">Backend Developer</p>
          </div>

          <Avatar className="h-24 w-24 sm:h-28 sm:w-28">
            <AvatarImage src="https://github.com/camdzic.png" alt="@camdzic" />
            <AvatarFallback className="animate-pulse bg-primary/10"></AvatarFallback>
          </Avatar>
        </div>
      </section>

      <section className="space-y-0.5">
        <h2 className="text-xl font-bold">About</h2>
        <p className="text-sm text-muted-foreground">
          I&apos;m a sixteen-year-old student currently pursuing a degree in
          computer science. I have a passion for software development and enjoy
          creating new things.
        </p>
      </section>

      <section className="space-y-0.5">
        <h2 className="text-xl font-bold">Skills</h2>
        <div className="flex select-none flex-wrap gap-1">
          {skills.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
      </section>

      <section className="space-y-0.5">
        <h2 className="text-xl font-bold">Contact</h2>
        <p className="text-sm text-muted-foreground">
          Want to chat? Just shoot me{' '}
          <a
            className="text-blue-500 hover:underline"
            href="mailto:acamdzic0@proton.me"
          >
            an email
          </a>{' '}
          and I&apos;ll get back to you as soon as possible.
        </p>
      </section>
    </MainLayout>
  );
}
