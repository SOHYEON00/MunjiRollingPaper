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

    navigate(`/main/contents/position/${params.id}`);
  }, [text, params?.id]);

  return (
    <>
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
            style={{ backgroundColor: color, resize: "none", height: "54vh" }}
          />
        </div>

        <div className={styles.infoMessage}>
          <span className={styles.info}>안내</span>: 모든 메시지는 익명이
          보장되지만, 욕설이나 모욕, 성희롱 등 부적절한 메시지로 인해 경찰 협조
          요청이 들어올 경우, 운영자는 수사에 필요한 정보를 제공할 수 있습니다.
        </div>

        <div className={styles.nextBtnWrapper}>
          <Button
            type="primary"
            disabled={!text}
            onClick={onSaveText}
            style={{
              fontFamily: '"Gowun Dodum',
              backgroundColor: !text ? "" : "#38393b",
            }}
          >
            다음으로
          </Button>
        </div>
      </section>
    </>
  );
});

export default Contents;
