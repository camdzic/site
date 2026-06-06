import {
  BunIcon,
  GitIcon,
  JavaIcon,
  NextIcon,
  NodeIcon,
  PythonIcon,
  ReactIcon,
  TailwindIcon,
  TypeScriptIcon
} from '../icons';

export const tech = [
  { label: 'TypeScript', Icon: TypeScriptIcon },
  { label: 'Python', Icon: PythonIcon },
  { label: 'Java', Icon: JavaIcon },
  { label: 'React', Icon: ReactIcon },
  { label: 'Next.js', Icon: NextIcon },
  { label: 'Tailwind CSS', Icon: TailwindIcon },
  { label: 'Node.js', Icon: NodeIcon },
  { label: 'Bun', Icon: BunIcon },
  { label: 'Git', Icon: GitIcon }
] as const;
