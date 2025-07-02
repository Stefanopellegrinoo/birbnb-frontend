'use client';
import { Anchor, Container, Group } from '@mantine/core';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './FooterSimple.module.css';

const links = [
  { link: 'https://github.com/ddso-utn/tp-cuatrimestral-jueves-manana-ju-ma-grupo-07', label: 'Github' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Careers' },
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
        {/* <MantineLogo size={28} /> */}
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}