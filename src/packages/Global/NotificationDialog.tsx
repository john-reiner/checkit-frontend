import { useDisclosure } from '@mantine/hooks';
import { Dialog, Group, Button, Alert, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

export default function NotificationDialog () {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Group position="center">
        <Button onClick={toggle}>Toggle dialog</Button>
      </Group>

      <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
        <Alert icon={<IconAlertCircle size="1rem" />} title="Bummer!" color="red">
          Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
        </Alert>
      </Dialog>
    </>
  );
}