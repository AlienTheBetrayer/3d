import { Button } from '@/shared/ui';

export default function Home() {
  return (
    <main className="w-screen h-screen grid place-items-center">
      <ul className="w-full max-w-96 **:w-full flex flex-col gap-1">
        <li>
          <Button variant="default">Default</Button>
        </li>

        <li>
          <Button variant="outline">Outline</Button>
        </li>

        <li>
          <Button variant="ghost">Ghost</Button>
        </li>

        <li>
          <Button variant="link">Link</Button>
        </li>

        <li>
          <Button variant="destructive">Destructive</Button>
        </li>

        <li>
          <Button variant="secondary">Secondary</Button>
        </li>
      </ul>
    </main>
  );
}
