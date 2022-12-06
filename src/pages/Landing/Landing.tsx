import { Button, Input } from "antd";
import * as React from "react";
import styles from "./Landing.module.scss";
import { debounce } from "lodash";
import { usePopupManager } from "react-popup-manager";
import CustomModal from "common/components/CustomModal/CustomModal";

const Landing = () => {
  const { open } = usePopupManager();
  const [name, setName] = React.useState<string>("");

  /* Event Handler */
  const onCreateRP = React.useCallback(() => {
    if (!!name) {
      open(CustomModal, {
        contents: <div>롤링페이퍼 생성이 완료되었습니다.</div>,
        okText: "작성하기",
      });
    } else {
      open(CustomModal, {
        contents: <div>이름을 입력해주세요.</div>,
      });
    }
  }, [name]);

  const onSetName = React.useCallback((e) => {
    const { value } = e.target;
    debounceSetName(value);
  }, []);

  const debounceSetName = debounce((value: string) => setName(value), 300);

  return (
    <section className={styles.LandingPage}>
      <div className={styles.inputWrapper}>
        <Input onChange={onSetName} width={150} className={styles.input} />{" "}
        님에게
      </div>
      <Button onClick={onCreateRP}>롤링페이퍼 생성하기</Button>
    </section>
  );
};

export default Landing;
