import { Modal, ModalProps, Button } from "antd";
import React, { useCallback, useEffect } from "react";
import { PopupProps } from "react-popup-manager/dist/src";
import styles from "./Modal.module.scss";

interface CustomModalProps extends ModalProps, PopupProps {
  contents?: string | React.ReactNode;
  isConfirm?: boolean;
}

export const CloseButtonFooter = ({
  onOk,
  text,
}: {
  onOk: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  text: string | React.ReactNode;
}) => {
  return (
    <div className={styles.footer}>
      <Button onClick={onOk} type="primary">
        {text || "Ok"}
      </Button>
    </div>
  );
};

const CustomModal = ({
  title,
  contents,
  isOpen,
  onClose,
  isConfirm = false,
  okText,
  ...props
}: CustomModalProps) => {
  useEffect(() => {
    return () => {
      Modal.destroyAll();
    };
  }, []);

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
      width={300}
      footer={
        isConfirm ? null : <CloseButtonFooter onOk={onOk} text={okText} />
      }
      {...props}
    >
      {contents}
    </Modal>
  );
};

export default CustomModal;
