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
  CanvasHeight,
  CanvasWidth,
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
      // canvas setting

      const size = getParentElSize("main");

      const newCanvas = new fabric.Canvas("main", {
        height: size.height || CanvasHeight,
        width: size.width || CanvasWidth,
        enableRetinaScaling: true,
        allowTouchScrolling: true,
      });

      newCanvas.setZoom(zoomValue);

      canvas.current = newCanvas.loadFromJSON(user.image, (arg) => {
        const objects = newCanvas.getObjects();

        objects.forEach((obj) => {
          obj.lockMovementX = true;
          obj.lockMovementY = true;
          obj.selectable = false;
          obj.hasControls = false;
        });
      });
      canvas.current.renderAll();
    }
  }, [user?.image]);

  React.useEffect(() => {
    return () => {
      if (canvas.current) {
        canvas.current.remove();
      }
    };
  }, []);

  React.useEffect(() => {
    if (canvas.current) {
      const objects = canvas.current.getObjects();
      setFabricImageDelControl();

      objects.forEach((obj) => {
        if (obj.type === "image") {
          obj.lockMovementX = false;
          obj.lockMovementY = false;
          obj.selectable = true;
          obj.hasControls = true;
        }
        obj.selectable = true;
        canvas.current.renderAll();
      });
    }
  }, [isEditSticker]);

  React.useEffect(() => {
    console.log("user", user);
  }, [user]);

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

  const onDownloadPng = React.useCallback(async () => {
    const downloadURI = (uri, name) => {
      const link = document.createElement("a");
      link.download = `${user?.name}_Rolling Paper.png`;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    canvas.current.backgroundColor = "white";

    canvas.current.setZoom(2);
    await canvas.current.requestRenderAll();

    const url = await canvas.current.toDataURL({
      width: canvas.current.width * 1.35,
      height: canvas.current.height * 1.35,
      left: 0,
      top: 0,
      format: "png",
      quality: 1.0,
    });

    await downloadURI(url, "Mungi_rolling_paper.png");
  }, [user?.name]);

  const onAddSticker = React.useCallback(() => {
    open(StickerListModal, {
      okText: "추가하기",
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
    const url = JSON.stringify(canvas.current.toJSON());

    canvas.current.discardActiveObject();
    canvas.current.renderAll();

    await setUserImage(params.id, { image: url })
      .then((res) => {
        open(CustomModal, {
          okText: "스티커 추가하기",
          contents: "롤링 페이퍼 꾸미기 적용되었습니다.",
          isConfirm: true,
          onClose: (isOk) => {
            window.location.reload();
          },
        });
      })
      .catch((e) => {
        open(CustomModal, {
          contents: "롤링 페이퍼 적용에 실패하였습니다. 다시 시도해주세요.",
          isConfirm: true,
        });
        console.log(e);
      });
  }, [params.id]);

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
          <div></div>
        ) : (
          <div className={styles.infoMsgWrapper}>
            <p>작성된 롤링 페이퍼가 없어요!</p>
            <p>{userProps.name} 님을 위한 첫 번째 롤링페이퍼를 작성해보세요!</p>
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
                <span style={{ fontWeight: 600 }}>{user?.name}</span> 님의
                롤링페이퍼
              </div>
            }
          />
        )}
        <div className={styles.imgWrapper}>
          {user ? <UserImageInfo userProps={user} /> : <ErrorInfo />}
        </div>
        <canvas id="main"></canvas>

        <div className={styles.buttonWrapper}>
          {user?.image && !isEditSticker && (
            <div className={styles.nextInfo}>
              이미지 다운로드는 크롬 또는 사파리에서 진행해주세요!
            </div>
          )}
          <div>
            {user?.image && (
              <div className={styles.iconButtonWrapper}>
                <div className={styles.addButtonWrapper}>
                  {!isEditSticker && (
                    <Button className={styles.addbutton}>
                      <img
                        src={DownloadImg}
                        alt="downloadImg"
                        width={30}
                        onClick={onDownloadPng}
                      />
                    </Button>
                  )}
                </div>
                <div className={styles.addButtonWrapper}>
                  <Button className={styles.addbutton}>
                    <img
                      className={styles.addbuttonIcon}
                      src={AddButtonImg}
                      alt="AddButtonImg"
                      width={30}
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
                  롤링 페이퍼 꾸미기 완료하기
                </Button>
              ) : (
                <ButtonUserInfo />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
