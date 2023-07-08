import { Dialog, Alert, CloseButton, Group, Notification } from '@mantine/core';
import { IconAlertCircle, IconCheck, IconLetterX } from '@tabler/icons-react';
import { useEffect } from 'react';

interface NotificationDialogProps {
  opened: boolean
  message: string
  status: string
  closeDialog: () => void
  timeout: number
}

export default function NotificationDialog ({
  opened,
  message,
  timeout,
  status,
  closeDialog,
}: NotificationDialogProps) {

  useEffect(() => {
    if (timeout > 0) {
      setTimeout(() => {
        closeDialog()
      }, timeout * 1000)
    }
  }, [timeout]);

  const renderIcon = (
    status: string
  ) => {
    if (status === "success") {
      return <IconCheck />
    } else if (status === "error") {
      return <IconLetterX />
    } else {
      return undefined
    }
  }

  const renderColor = (status: string  ) => {
    if (status === "success") {
      return "green"
    } else if (status === "error") {
      return "red"
    } else {
      return undefined
    }
  }

  return (
    <>
      <Dialog opened={opened} onClose={closeDialog} p={0}  size="lg" radius="md">
        <Notification icon={renderIcon(status)} color={renderColor(status)} onClose={() => closeDialog()}>
          {message}
        </Notification>
      </Dialog>
    </>
  );
}