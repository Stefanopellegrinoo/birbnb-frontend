'use client';
import { Anchor, Container, Group } from '@mantine/core';
import classes from './FooterSimple.module.css';
import {Title} from '@mantine/core';
import Link from 'next/link';

const links = [
  { link: 'https://github.com/ddso-utn/tp-cuatrimestral-jueves-manana-ju-ma-grupo-07', label: 'Github' },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor
        c="dimmed"
        key={link.label}
        href={link.link}
        size="sm"
        >
        {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Link href="/" className={classes.link}>
            <Title order={2}>Birbnb</Title>
        </Link>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}