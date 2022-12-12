import React, { memo, useCallback, useEffect, useState } from "react";
import { PopupProps } from "react-popup-manager/dist/src";
import { Modal, ModalProps } from "antd";
import { CloseButtonFooter } from "common/components/CustomModal/CustomModal";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "queries/firebaseConfig";
import { storagePath } from "queries/firebaseQuery";
import styles from "./Main.module.scss";
import { getDefaultsImage, saveLocalStorage } from "share/utils";

interface StickerListModalProps extends ModalProps, PopupProps {
  contents?: string | React.ReactNode;
  isConfirm?: boolean;
  onStickerCallback: (url: string) => void;
}

const StickerListModal = memo(
  ({
    title,
    isOpen,
    onClose,
    isConfirm = false,
    okText,
    onStickerCallback,
    ...props
  }: StickerListModalProps) => {
    const [list, setList] = useState<string[]>([]);

    /* ************** UseEffects ************** */
    useEffect(() => {
      const getList = getDefaultsImage("list");

      if (!getList) {
        promiseResolver();
      } else {
        setList(JSON.parse(getList));
      }
      promiseResolver();

      return () => {
        Modal.destroyAll();
      };
    }, []);

    function promiseResolver() {
      const stroageRef = ref(storage, `${storagePath}`);
      return listAll(stroageRef).then((result) => {
        const promise = result.items.map((imgRef) =>
          getDownloadURL(ref(storage, `${storagePath}${imgRef.name}`))
        );

        Promise.all(promise)
          .then((arr) => {
            setList(arr);
            saveLocalStorage("list", JSON.stringify(arr));
          })
          .catch((e) => {
            console.log("catch", e);
          });
      });
    }

    /* ************** Event Methods ************** */
    const onCancel = useCallback(() => {
      if (onClose) {
        onClose(false);
      }
    }, [onClose]);

    const onSelectSticker = useCallback(
      (e) => {
        const selected = e.target.src;

        if (!!selected && onClose && onStickerCallback) {
          onStickerCallback(selected);
          onClose(true);
        }
      },
      [onClose, onStickerCallback]
    );

    /* ************** Render ************** */
    return (
      <Modal
        title={title}
        open={isOpen}
        onCancel={onCancel}
        width={500}
        footer={
          <div className={styles.info}>
            스티커를 선택하여 롤링 페이퍼를 꾸며보세요.
          </div>
        }
        className={styles.StickerListModal}
        {...props}
      >
        <div className={styles.stickerList}>
          {list?.map((sticker, index) => {
            const key = `${sticker}${index}`;
            return (
              <img
                src={sticker}
                alt={key}
                width={97}
                height={"auto"}
                className={styles.sticker}
                key={key}
                onClick={onSelectSticker}
              />
            );
          })}
        </div>
      </Modal>
    );
  }
);

export default StickerListModal;
