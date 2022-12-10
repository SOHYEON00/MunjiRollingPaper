import { Button, Input } from "antd";
import Header from "common/components/Header/Header";
import TopLabel from "common/components/TopLabel/TopLabel";
import React, { memo, useCallback, useState } from "react";
import useStore, { IStore, useColor, useText } from "store";
import styles from "./Contents.module.scss";
import { debounce } from "lodash";
import { usePopupManager } from "react-popup-manager";
import CustomModal from "common/components/CustomModal/CustomModal";
import { useNavigate, useParams } from "react-router-dom";

const Contents = memo(() => {
  const { open } = usePopupManager();
  const navigate = useNavigate();
  const params = useParams();

  const color = useColor();
  const initText = useText();

  const setStoreText = useStore((store: IStore) => store.memo.setText);

  const [text, setText] = useState<string>(initText);

  const onChangeText = useCallback(
    debounce(
      (e) => {
        setText(e.target.value);
      },
      [300]
    ),
    []
  );

  const onSaveText = useCallback(() => {
    setStoreText(text);

    open(CustomModal, {
      contents: "메모를 남기시겠습니까?",
      okText: "메모 남기기",
      onClose: (isOk) => {
        if (isOk) {
          navigate(`/main/contents/position/${params.id}`);
        }
      },
    });
  }, [text, params?.id]);

  return (
    <div>
      <Header />

      <section
        className={styles.ContentsWrapper}
        style={{ backgroundColor: `${color}26` }}
      >
        <TopLabel contents="롤링 페이퍼를 작성하세요" />

        <div className={styles.textAreaWrapper}>
          <Input.TextArea
            defaultValue={text}
            onChange={onChangeText}
            className={styles.textArea}
            style={{ backgroundColor: color, resize: "none", height: 500 }}
          />
        </div>

        <div className={styles.nextBtnWrapper}>
          <Button type="primary" disabled={!text} onClick={onSaveText}>
            다음으로
          </Button>
        </div>
      </section>
    </div>
  );
});

export default Contents;
