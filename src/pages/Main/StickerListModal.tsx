import React, { memo, useCallback, useEffect, useState } from "react";
import { PopupProps } from "react-popup-manager/dist/src";
import { Modal, ModalProps } from "antd";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "queries/firebaseConfig";
import { storagePath } from "queries/firebaseQuery";
import "./StickerListModal.scss";
import { getDefaultsImage, saveLocalStorage } from "share/utils";
import LoadingModal from "common/components/LoadingModal/LoadingModal";

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
    const [loaded, setLoaded] = useState<boolean>(false);

    /* ************** UseEffects ************** */
    useEffect(() => {
      const getList = getDefaultsImage("list");

      if (!getList) {
        promiseResolver();
        setLoaded(true);
      } else {
        setList(JSON.parse(getList));
        setLoaded(true);
      }

      promiseResolver();

      return () => {
        Modal.destroyAll();
      };
    }, []);

    function promiseResolver() {
      setLoaded(false);
      const stroageRef = ref(storage, `${storagePath}`);
      return listAll(stroageRef).then((result) => {
        const promise = result.items.map((imgRef) =>
          getDownloadURL(ref(storage, `${storagePath}${imgRef.name}`))
        );

        Promise.all(promise)
          .then((arr) => {
            setList(arr);
            saveLocalStorage("list", JSON.stringify(arr));
            setLoaded(true);
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
        style={{ top: "70px" }}
        footer={
          <div className={"info"}>
            스티커를 선택하여 롤링 페이퍼를 꾸며보세요.
          </div>
        }
        className={"StickerListModal"}
        {...props}
      >
        {loaded ? (
          <div className={"stickerList"}>
            {list?.map((sticker, index) => {
              const key = `${sticker}${index}`;
              return (
                <img
                  src={sticker}
                  alt={key}
                  height={"auto"}
                  className={"sticker"}
                  key={key}
                  onClick={onSelectSticker}
                />
              );
            })}
          </div>
        ) : (
          <LoadingModal />
        )}
      </Modal>
    );
  }
);

export default StickerListModal;
