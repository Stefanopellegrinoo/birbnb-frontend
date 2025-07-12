'use client';
import { Anchor, Container, Group, Text, Flex } from '@mantine/core';
import classes from './FooterSimple.module.css';

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Flex
          justify="space-between"
          align="center"
          wrap="wrap"
          className={classes.bottom}
        >
          <Group spacing="xs" className={classes.legal}>
            <Text size="sm" c="dimmed">© {new Date().getFullYear()} Birbnb, Inc.</Text>
            <Text size="sm" c="dimmed">·</Text>
            <Anchor size="sm" c="dimmed" href="#">Privacidad</Anchor>
            <Text size="sm" c="dimmed">·</Text>
            <Anchor size="sm" c="dimmed" href="#">Términos</Anchor>
            <Text size="sm" c="dimmed">·</Text>
            <Anchor size="sm" c="dimmed" href="#">Mapa del sitio</Anchor>
          </Group>

          <Group spacing="md" className={classes.socials}>
            <Anchor href="https://facebook.com" target="_blank" aria-label="Facebook">🌐</Anchor>
            <Anchor href="https://x.com" target="_blank" aria-label="Twitter">✖️</Anchor>
            <Anchor href="https://instagram.com" target="_blank" aria-label="Instagram">📷</Anchor>
          </Group>
        </Flex>
      </Container>
    </div>
  );
}

