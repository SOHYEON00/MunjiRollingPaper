import { Button, Input } from "antd";
import * as React from "react";
import styles from "./Landing.module.scss";
import { debounce } from "lodash";
import { createNewUser, storagePath } from "queries/firebaseQuery";
import { useNavigate } from "react-router-dom";
import { usePopupManager } from "react-popup-manager";
import CustomModal from "common/components/CustomModal/CustomModal";
import { getDefaultsImage, saveLocalStorage } from "share/utils";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "queries/firebaseConfig";

const DEFAULT1 = "default1.png";
const DEFAULT2 = "default2.png";

const Landing = () => {
  const [name, setName] = React.useState<string>("");
  const navigate = useNavigate();
  const { open } = usePopupManager();

  const [image1, setImage1] = React.useState<any>("");
  const [image2, setImage2] = React.useState<any>("");

  React.useEffect(() => {
    const getLs = getLSImage(DEFAULT1);

    if (!getLs) {
      getDefaults(DEFAULT1, (url: string) => {
        setImage1(url);
        saveLocalStorage(DEFAULT1, url);
      });
    } else {
      setImage1(getLs);
    }
  }, []);

  React.useEffect(() => {
    const getLs = getLSImage(DEFAULT2);

    if (!getLs) {
      getDefaults(DEFAULT2, (url: string) => {
        setImage2(url);
        saveLocalStorage(DEFAULT2, url);
      });
    } else {
      setImage2(getLs);
    }
  }, []);

  async function getDefaults(name: string, callback: (url: string) => void) {
    const url = await getDownloadURL(ref(storage, `${storagePath}${name}`));
    callback(url);
    return url;
  }

  function getLSImage(name: string) {
    const result = getDefaultsImage(name);
    return result || "";
  }

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
    <section className={styles.LandingPage}>
      <div className={styles.imgWrapper}>
        <img
          className={styles.defaultImg1}
          src={image1}
          alt="sticker set1"
          height={100}
        />
        <img
          className={styles.defaultImg2}
          src={image2}
          alt="sticker set2"
          height={100}
        />
        <img
          className={styles.defaultImg1}
          src={image1}
          alt="sticker set1"
          height={100}
        />
        <img
          className={styles.defaultImg2}
          src={image2}
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
  );
};

export default React.memo(Landing);
