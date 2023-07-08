import { Dialog, Alert, CloseButton, Group, Notification } from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { useEffect } from 'react';

interface NotificationDialogProps {
  opened: boolean
  message: string,

  closeDialog: () => void,
  timeout: number,
  color: string
}

export default function NotificationDialog ({
  opened,
  message,

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
      <Dialog opened={opened} onClose={closeDialog} p={0}  size="lg" radius="md">
        <Notification icon={<IconCheck />} color={color}>
          {message}
        </Notification>
      </Dialog>
    </>
  );
}