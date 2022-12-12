import { Button, Input } from "antd";
import * as React from "react";
import styles from "./Landing.module.scss";
import { debounce } from "lodash";
import { createNewUser } from "queries/firebaseQuery";
import { useNavigate } from "react-router-dom";
import { usePopupManager } from "react-popup-manager";
import CustomModal from "common/components/CustomModal/CustomModal";
import Header from "common/components/Header/Header";
import Image1 from "images/default1.png";
import Image2 from "images/default2.png";

const Landing = () => {
  const [name, setName] = React.useState<string>("");
  const navigate = useNavigate();
  const { open } = usePopupManager();

  /* Event Handler */
  const onCreateRP = React.useCallback(async () => {
    if (!!name) {
      const result = (await createNewUser(name)) as any;

      if (result?.id) {
        open(CustomModal, {
          contents: <div>롤링페이퍼 생성이 완료되었습니다.</div>,
          okText: "작성하기",
          onClose: (isOk) => {
            if (isOk) {
              navigate(`/main/${result.id}`);
            }
          },
        });
      } else {
        OpenErrorModal(
          "롤링페이퍼 생성이 미완료 되었습니다. 다시 시도해주세요"
        );
      }
    } else {
      OpenErrorModal("이름을 입력해주세요.");
    }
  }, [name]);

  const OpenErrorModal = React.useCallback((contents: string) => {
    open(CustomModal, {
      contents: <div>{contents}</div>,
      okText: "확인",
      isConfirm: true,
    });
  }, []);

  const onSetName = React.useCallback((e) => {
    const { value } = e.target;
    debounceSetName(value);
  }, []);

  const debounceSetName = debounce((value: string) => setName(value), 300);

  return (
    <>
      <Header />
      <section className={styles.LandingPage}>
        <div className={styles.imgWrapper}>
          <img
            className={styles.defaultImg1}
            src={Image1}
            alt="sticker set1"
            height={100}
          />
          <img
            className={styles.defaultImg2}
            src={Image2}
            alt="sticker set2"
            height={100}
          />
          <img
            className={styles.defaultImg1}
            src={Image1}
            alt="sticker set1"
            height={100}
          />
          <img
            className={styles.defaultImg2}
            src={Image2}
            alt="sticker set2"
            height={100}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <div className={styles.inputWrapper}>
            <Input onChange={onSetName} width={150} className={styles.input} />{" "}
            님에게
          </div>
          <Button className={styles.button} onClick={onCreateRP}>
            롤링페이퍼 생성하기
          </Button>
        </div>
      </section>
    </>
  );
};

export default React.memo(Landing);
