import { Button } from "antd";
import Header from "common/components/Header/Header";
import TopLabel from "common/components/TopLabel/TopLabel";
import { getCurrentUser, setUserImage } from "queries/firebaseQuery";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPath, PathTitles } from "route/path";
import useStore, { IStore } from "store";
import { User } from "store/memoSlice";
import styles from "./Main.module.scss";
import AddButtonImg from "images/like.png";
import { usePopupManager } from "react-popup-manager";
import StickerListModal from "./StickerListModal";
import { fabric } from "fabric";
import DownloadImg from "image/file.png";
import {
  generateCanvas,
  getParentElSize,
  setFabricImageDelControl,
  zoomValue,
} from "share/utils";
import CustomModal from "common/components/CustomModal/CustomModal";

const Main = () => {
  const params = useParams();
  const navigate = useNavigate();
  const setStoreUser = useStore((store: IStore) => store.memo.setUser);
  const resetStore = useStore((store: IStore) => store.memo.reset);

  const { open } = usePopupManager();

  const [user, setUser] = React.useState<User>(undefined);
  const [isEditSticker, setIsEditSticker] = React.useState<boolean>(false);
  const canvas = React.useRef<fabric.Canvas>(undefined);

  /* ************** Init Canvas ************** */

  React.useEffect(() => {
    resetStore();
  }, []);

  React.useEffect(() => {
    if (!!user?.image) {
      const size = getParentElSize("main");

      // canvas setting
      const newCanvas = new fabric.Canvas("main", {
        height: size.height,
        width: size.width,
        enableRetinaScaling: true,
        allowTouchScrolling: true,
      });

      setFabricImageDelControl();

      newCanvas.setZoom(zoomValue);
      newCanvas.setBackgroundImage(
        user.image,
        newCanvas.renderAll.bind(newCanvas)
      );

      canvas.current = newCanvas;
    }
  }, [user?.image]);

  React.useEffect(() => {
    return () => {
      if (canvas.current) {
        canvas.current.remove();
      }
    };
  }, []);

  /* ************** Get User Logics ************** */

  React.useEffect(() => {
    if (params?.id) {
      getUser(params.id);
    }
  }, [params?.id]);

  const getUser = async (name: string) => {
    const result = (await getCurrentUser(name)) as User;

    if (result) {
      setUser({ ...result, id: name });
    }

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

  const onDownloadPng = React.useCallback(() => {}, []);

  const onAddSticker = React.useCallback(() => {
    open(StickerListModal, {
      okText: "????????????",
      onStickerCallback: (url: string) => {
        if (!!url) {
          fabric.Image.fromURL(
            url,
            (img) => {
              img.set({
                scaleX: 100 / img.width,
                scaleY: 100 / img.height,
                strokeUniform: true,
                left: 50,
                top: 50,
              });
              setIsEditSticker(true);
              canvas.current.add(img);
              canvas.current.setActiveObject(img);
            },
            { crossOrigin: "anonymous" }
          );
        }
      },
    });
  }, []);

  const onFinishEditDeco = React.useCallback(async () => {
    const url = generateCanvas(canvas.current);

    canvas.current.discardActiveObject();
    canvas.current.renderAll();

    await setUserImage(params.id, { image: url })
      .then((res) => {
        open(CustomModal, {
          okText: "????????? ????????????",
          contents: "?????? ????????? ????????? ?????????????????????.",
          isConfirm: true,
          onClose: (isOk) => {
            window.location.reload();
          },
        });
      })
      .catch((e) => {
        open(CustomModal, {
          contents: "?????? ????????? ????????? ?????????????????????. ?????? ??????????????????.",
          isConfirm: true,
        });
        console.log(e);
      });
  }, [params.id]);

  /* ************** Render Items ************** */

  const ErrorInfo = React.memo(() => {
    return (
      <div className={styles.infoMsgWrapper}>
        <p>?????? ?????? ????????? ????????? ?????? ??? ????????????.</p>
        <p>????????? ?????? ???????????? ??????????????????!</p>
      </div>
    );
  });

  const UserImageInfo = React.memo(({ userProps }: { userProps: User }) => {
    return (
      <>
        {userProps?.image ? (
          <div></div>
        ) : (
          <div className={styles.infoMsgWrapper}>
            <p>????????? ?????? ???????????? ?????????!</p>
            <p>{userProps.name} ?????? ?????? ??? ?????? ?????????????????? ??????????????????!</p>
          </div>
        )}
      </>
    );
  });

  const ButtonUserInfo = React.memo(() => {
    return (
      <>
        {user ? (
          <Button
            className={styles.createBtn}
            type="primary"
            onClick={onCreateNewMemo}
          >
            ????????? ?????? ????????????
          </Button>
        ) : (
          <Button
            className={styles.createBtn}
            type="primary"
            onClick={onCreateNewRP}
          >
            ????????? ?????? ????????? ????????????
          </Button>
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
            contents={
              <div>
                <span style={{ fontWeight: 600 }}>{user?.name}</span> ??????
                ???????????????
              </div>
            }
          />
        )}
        <div className={styles.imgWrapper}>
          {user ? <UserImageInfo userProps={user} /> : <ErrorInfo />}
        </div>
        <canvas id="main"></canvas>
        <div className={styles.buttonWrapper}>
          {user?.image && (
            <div className={styles.iconButtonWrapper}>
              <div className={styles.addButtonWrapper}>
                <Button className={styles.addbutton}>
                  <img
                    src={DownloadImg}
                    alt="downloadImg"
                    width={40}
                    onClick={onDownloadPng}
                  />
                </Button>
              </div>
              <div className={styles.addButtonWrapper}>
                <Button className={styles.addbutton}>
                  <img
                    src={AddButtonImg}
                    alt="AddButtonImg"
                    width={40}
                    onClick={onAddSticker}
                  />
                </Button>
              </div>
            </div>
          )}

          <div>
            {isEditSticker && user?.image ? (
              <Button
                className={styles.createBtn}
                style={{ backgroundColor: "#f890a2" }}
                type="primary"
                onClick={onFinishEditDeco}
              >
                ?????? ????????? ????????? ????????????
              </Button>
            ) : (
              <ButtonUserInfo />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
