import Header from "common/components/Header/Header";
import TopLabel from "common/components/TopLabel/TopLabel";
import React, { memo, useCallback, useEffect } from "react";
import useStore, { IStore, useColor, useText, useUser } from "store";
import { fabric } from "fabric";
import { Button } from "antd";
import styles from "./ContentsPosition.module.scss";
import { getCurrentUser, setUserImage } from "queries/firebaseQuery";
import { useNavigate, useParams } from "react-router-dom";
import { usePopupManager } from "react-popup-manager";
import CustomModal from "common/components/CustomModal/CustomModal";
import { User } from "store/memoSlice";
import { getParentElSize, zoomValue } from "share/utils";

const ContentsPosition = memo(() => {
  const initUser = useUser();
  const color = useColor();
  const text = useText();
  const setStoreUser = useStore((store: IStore) => store.memo.setUser);

  const params = useParams();
  const { open } = usePopupManager();
  const navigate = useNavigate();

  const canvas = React.useRef<fabric.Canvas>(undefined);

  useEffect(() => {
    const size = getParentElSize("canvas");

    const newCanvas = new fabric.Canvas("canvas", {
      height: size.height,
      width: size.width,
      enableRetinaScaling: true,
      allowTouchScrolling: true,
    });

    newCanvas.setZoom(zoomValue);
    canvas.current = newCanvas;
  }, []);

  React.useEffect(() => {
    if (params?.id) {
      getUser(params.id);
    }
  }, [params?.id]);

  const getUser = async (name: string) => {
    const result = (await getCurrentUser(name)) as User;
    setStoreUser(result);
    return result;
  };

  useEffect(() => {
    if (canvas) {
      if (!!initUser?.image) {
        canvas.current = canvas.current.loadFromJSON(initUser.image, (arg) => {
          const objects = canvas.current.getObjects();

          objects.forEach((obj) => {
            obj.lockMovementX = true;
            obj.lockMovementY = true;
            obj.selectable = false;
            obj.hasControls = false;
          });

          createMemoPic();
        });
      }
      createMemoPic();
    }

    return () => {
      canvas.current?.remove();
    };
  }, [canvas, initUser?.image]);

  const createMemoPic = useCallback(() => {
    const textObj = new fabric.Text(text, {
      fontSize: 25,
      originX: "left",
      originY: "top",
      left: 10,
      top: 10,
      fontFamily: "Gaegu",
    });

    const height = textObj.calcTextHeight();
    const width = textObj.width;

    const calcWidth = (w: number, h: number) => {
      const compare = w >= h ? w : h;

      if (compare < 100) {
        return 100;
      } else {
        return compare;
      }
    };

    const memoObj = new fabric.Rect({
      fill: color,
      rx: 5,
      ry: 5,
      width: calcWidth(width, height) + 20,
      height: height + 50,
    });

    const groupObj = new fabric.Group([memoObj, textObj], {
      left: 50,
      top: 50,
      scaleX: 1.5,
      scaleY: 1.5,
    });

    canvas.current.add(groupObj);

    canvas.current.setActiveObject(groupObj);
  }, [canvas, color, text]);

  const onSaveRP = useCallback(async () => {
    if (canvas && params?.id) {
      const url = JSON.stringify(canvas.current.toJSON());

      await setUserImage(params.id, { image: url }).then((res) => {
        open(CustomModal, {
          okText: "스티커 추가하기",
          contents: (
            <div>
              + 버튼을 눌러 <br />
              스티커로 롤링 페이퍼를 꾸며보세요!
            </div>
          ),
          isConfirm: true,
          onClose: (isOk) => {
            canvas.current.discardActiveObject();
            canvas.current.renderAll();

            navigate(`/main/${params.id}`, { replace: true });
          },
        });
      });
    }
  }, [canvas, params?.id]);

  return (
    <>
      <Header />
      <section style={{ width: "100%", height: "100%" }}>
        <TopLabel contents={initUser ? `${initUser.name} 님` : ""} />

        <canvas id="canvas" />

        <div className={styles.nextBtnWrapper}>
          <div className={styles.nextInfo}>
            메모지를 움직여 원하는 곳에 붙여주세요! <br />
            수정 불가능하니 신중하게!
          </div>

          <Button
            type="primary"
            onClick={onSaveRP}
            style={{ backgroundColor: "#38393b" }}
          >
            메모 남기기
          </Button>
        </div>
      </section>
    </>
  );
});

export default ContentsPosition;
