import {
  Anchor,
  Button,
  Container,
  Paper,
  Text,
  Title,
  Group,
} from '@mantine/core';
import classes from './Form.module.css';

export function Form({
  title,
  children,
  onSubmit,
  error,
  submitLabel = 'Enviar',
}) {
  return (
    <Container size={420} my={40} > 
      <Title ta="center" mb="md" className={classes.title}>
        {title}
      </Title>

      <Paper
        withBorder
        shadow="sm"
        p={22}
        mt={30}
        radius="md"
        component="form"
        onSubmit={onSubmit}
        className={classes.formContainer}
      >
        {error && (
          <Text color="red" mb="sm" size="sm">
            {error}
          </Text>
        )}

        {children}

        <Group mt="xl">
          <Button fullWidth type="submit" radius="md">
            {submitLabel}
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}