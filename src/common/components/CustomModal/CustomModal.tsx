import { Modal, ModalProps, Button } from "antd";
import React, { useCallback } from "react";
import { PopupProps } from "react-popup-manager/dist/src";

interface CustomModalProps extends ModalProps, PopupProps {
  contents?: string | React.ReactNode;
  isConfirm?: boolean;
}

export const CloseButtonFooter = (onCancel) => {
  return <Button onClick={onCancel}>Ok</Button>;
};

const CustomModal = ({
  title,
  contents,
  isOpen,
  onClose,
  isConfirm = false,
  ...props
}: CustomModalProps) => {
  const onCancel = useCallback(() => {
    if (onClose) {
      onClose(false);
    }
  }, [onClose]);

  const onOk = useCallback(() => {
    if (onClose) {
      onClose(true);
    }
  }, [onClose]);

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onCancel}
      onOk={onOk}
      footer={isConfirm ? <CloseButtonFooter onCancel={onCancel} /> : undefined}
      {...props}
    >
      {contents}
    </Modal>
  );
};

export default CustomModal;
