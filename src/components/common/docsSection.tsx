'use client';

import DocsIcon from '@icons/docsIcons';
import GitHubIcon from '@icons/githubIcon';
import { Button } from '@images/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@images/components/ui/sheet';

type Content = {
  dir: 'ltr' | 'rtl';
  values: {
    open: string;
    editProfile: string;
    description: string;
    name: string;
    username: string;
    save: string;
    close: string;
  };
};

const content: Content = {
  dir: 'ltr',
  values: {
    open: 'Open',
    editProfile: 'Edit profile',
    description:
      "Make changes to your profile here. Click save when you're done.",
    name: 'Name',
    username: 'Username',
    save: 'Save changes',
    close: 'Close',
  },
};

export function DocSection() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'outline'} className="cursor-pointer">
          <DocsIcon /> Documentation
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>BYAAS Documentation</SheetTitle>
          <SheetDescription>
            This secction contains the documentation needed to understand its
            functionality. All the documentation is made with learning and with
            the aim to apply the best practices while generating all the
            requiered templates.
          </SheetDescription>
        </SheetHeader>
        {/* Main content of the documentation section */}
        <div className="no-scrollbar overflow-y-auto px-4">
          Documentation here
        </div>
        <SheetFooter>
          <Button type="submit">
            <GitHubIcon /> <a
              href="https://github.com/and3sil4/byaas.git"
              target='_blank'
              rel="noopener noreferrer"
            >View on GitHub</a>
          </Button>
          <SheetClose asChild>
            <Button variant="outline"> Close Documentation </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
