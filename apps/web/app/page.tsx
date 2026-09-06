'use client';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui';
import { EmojiPicker, EmojiPickerContent, EmojiPickerFooter, EmojiPickerSearch } from '@/shared/ui/emoji-picker';
import { useState } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

        <li className="mt-4">
          <Popover onOpenChange={setIsOpen} open={isOpen}>
            <PopoverTrigger render={<Button>Open emoji picker</Button>} />
            <PopoverContent className="w-fit p-0">
              <EmojiPicker
                className="h-[342px]"
                onEmojiSelect={({ emoji }) => {
                  setIsOpen(false);
                  alert(emoji);
                }}
              >
                <EmojiPickerSearch />
                <EmojiPickerContent />
                <EmojiPickerFooter />
              </EmojiPicker>
            </PopoverContent>
          </Popover>
        </li>
      </ul>
    </main>
  );
}
