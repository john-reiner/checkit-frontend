import { Dialog, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useEffect } from 'react';

interface NotificationDialogProps {
  opened: boolean
  message: string,
  title: string,
  closeDialog: () => void,
  timeout: number,
  color: string
}

export default function NotificationDialog ({
  opened,
  message,
  title,
  timeout,
  closeDialog,
  color
}: NotificationDialogProps) {

  useEffect(() => {
    if (timeout > 0) {
      setTimeout(() => {
        closeDialog()
      }, timeout * 1000)
    }
  }, [timeout]);

  return (
    <>
      <Dialog opened={opened} withCloseButton onClose={closeDialog} size="lg" radius="md">
        <Alert icon={<IconAlertCircle size="1rem" />} title={title} color={color}>
          {message}
        </Alert>
      </Dialog>
    </>
  );
}