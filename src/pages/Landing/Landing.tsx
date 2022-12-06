import { Button, Input, Modal } from "antd";
import * as React from "react";
import styles from "./Landing.module.scss";
import { debounce } from "lodash";
import { createNewUser } from "queries/firebaseQuery";
import { useNavigate } from "react-router-dom";
import { PathTitles, replaceParam } from "route/path";

const Landing = () => {
  const [name, setName] = React.useState<string>("");
  const navigate = useNavigate();

  /* Event Handler */
  const onCreateRP = React.useCallback(async () => {
    if (!!name) {
      const result = (await createNewUser(name)) as any;

      if (result?.id) {
        Modal.confirm({
          content: <div>롤링페이퍼 생성이 완료되었습니다.</div>,
          okText: "작성하기",
          icon: undefined,
          onOk: () => {
            navigate(replaceParam(PathTitles.Main, [":id"], [result.id]));
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
    Modal.error({
      content: (
        <>
          <div>{contents}</div>
        </>
      ),
    });
  }, []);

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
