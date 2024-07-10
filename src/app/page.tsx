import MainLayout from '@/components/main-layout';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { skills } from '@/data';

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-6">
        <div className="flex-grow">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
            Hi, I&apos;m Aldin 👋
          </h1>
          <p className="mt-1 md:text-xl">Backend Developer</p>
        </div>
        <Avatar className="h-28 w-28">
          <AvatarImage src="https://avatars.githubusercontent.com/u/111543914" />
        </Avatar>
      </div>

      <div className="space-y-0.5">
        <h2 className="text-xl font-bold">About</h2>
        <p className="text-sm text-muted-foreground">
          I&apos;m a sixteen-year-old student currently pursuing a degree in
          computer science. I have a passion for software development and enjoy
          creating new things.
        </p>
      </div>

      <div className="space-y-0.5">
        <h2 className="text-xl font-bold">Skills</h2>
        <div className="flex select-none gap-1">
          {skills.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
      </div>

      <div className="space-y-0.5">
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
      </div>
    </MainLayout>
  );
}
