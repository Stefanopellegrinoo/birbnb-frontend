'use client'

import Navbar from "@/components/layout/Navbar";
import { Footer } from "../footer/Footer";
import Header from "../header/Header";

export default function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />

    </>
  );
}

/*
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import { AppShell, Burger,Group,Skeleton} from '@mantine/core';
import { Footer } from "../footer/Footer";

export default function ClientLayout({ children }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      aside={{ width: 300, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <MantineLogo size={30} />
        </Group>
      </AppShell.Header>
      <AppShell.Main>
       { children }
      </AppShell.Main>
      <AppShell.Footer p="md">
        <Footer></Footer>
      </AppShell.Footer>
    </AppShell>
  );
}
*/