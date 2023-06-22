import { Dialog, Group, Button, Alert, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

interface NotificationDialogProps {
  opened: boolean
  message: string,
  title: string,
  closeDialog: () => void
}

export default function NotificationDialog ({
  opened,
  message,
  title,
  closeDialog
}: NotificationDialogProps) {

  return (
    <>
      {/* <Group position="center">
        <Button onClick={toggle}>Toggle dialog</Button>
      </Group> */}

      <Dialog opened={opened} withCloseButton onClose={closeDialog} size="lg" radius="md">
        <Alert icon={<IconAlertCircle size="1rem" />} title={title} color="green">
          {message}
        </Alert>
      </Dialog>
    </>
  );
}