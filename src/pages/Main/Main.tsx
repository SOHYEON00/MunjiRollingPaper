import { Button } from "antd";
import Header from "common/components/Header/Header";
import TopLabel from "common/components/TopLabel/TopLabel";
import { getCurrentUser } from "queries/firebaseQuery";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPath, PathTitles } from "route/path";
import useStore, { IStore } from "store";
import { User } from "store/memoSlice";
import styles from "./Main.module.scss";

const Main = () => {
  const params = useParams();
  const navigate = useNavigate();
  const setStoreUser = useStore((store: IStore) => store.memo.setUser);

  const [user, setUser] = React.useState<User>(undefined);

  /* ************** Get User Logics ************** */

  React.useEffect(() => {
    if (params?.id) {
      getUser(params.id);
    }
  }, [params?.id]);

  const getUser = async (name: string) => {
    const result = (await getCurrentUser(name)) as User;
    setUser({ ...result, id: name });
    setStoreUser(result);
    return result;
  };

  /* ************** Event functions ************** */

  const onCreateNewMemo = React.useCallback(() => {
    navigate(`/main/memo/${params.id}`);
  }, [params.id]);

  const onCreateNewRP = React.useCallback(() => {
    navigate(getPath(PathTitles.Landing));
  }, []);

  /* ************** Render Items ************** */

  const ErrorInfo = React.memo(() => {
    return (
      <div className={styles.infoMsgWrapper}>
        <p>해당 롤링 페이퍼 정보를 찾을 수 없습니다.</p>
        <p>새로운 롤링 페이퍼를 생성해보세요!</p>
      </div>
    );
  });

  const UserImageInfo = React.memo(({ userProps }: { userProps: User }) => {
    return (
      <>
        {userProps?.image ? (
          <img src={userProps.image} alt="user background" />
        ) : (
          <div className={styles.infoMsgWrapper}>
            <p>작성된 롤링 페이퍼가 없어요!</p>
            <p>{userProps.name} 님을 위한 첫 번째 롤링페이퍼를 작성해보세요!</p>
          </div>
        )}
      </>
    );
  });

  return (
    <>
      <Header />
      <section className={styles.Wrapper}>
        {user && (
          <TopLabel
            contents={`${user?.name} 님에게 롤링 페이퍼를 작성해주세요!`}
          />
        )}
        <div className={styles.imgWrapper}>
          {user ? <UserImageInfo userProps={user} /> : <ErrorInfo />}
        </div>

        <div className={styles.createBtnWrapper}>
          {user ? (
            <Button
              className={styles.createBtn}
              type="primary"
              onClick={onCreateNewMemo}
            >
              새로운 메모 작성하기
            </Button>
          ) : (
            <Button
              className={styles.createBtn}
              type="primary"
              onClick={onCreateNewRP}
            >
              새로운 롤링 페이퍼 생성하기
            </Button>
          )}
        </div>
      </section>
    </>
  );
};

export default Main;
