import Header from "common/components/Header/Header";
import TopLabel from "common/components/TopLabel/TopLabel";
import React, { memo, useCallback, useEffect, useState } from "react";
import useStore, { IStore, useColor, useText, useUser } from "store";
import { fabric } from "fabric";
import { Button } from "antd";
import styles from "./ContentsPosition.module.scss";
import { setDoc } from "firebase/firestore";
import { getCurrentUser, setUserImage } from "queries/firebaseQuery";
import { useNavigate, useParams } from "react-router-dom";
import { usePopupManager } from "react-popup-manager";
import CustomModal from "common/components/CustomModal/CustomModal";
import { User } from "store/memoSlice";

const ContentsPosition = memo(() => {
  const initUser = useUser();
  const color = useColor();
  const text = useText();
  const setStoreUser = useStore((store: IStore) => store.memo.setUser);

  const params = useParams();
  const { open } = usePopupManager();
  const navigate = useNavigate();

  const [canvas, setCanvas] = useState(undefined);

  useEffect(() => {
    const newCanvas = new fabric.Canvas("canvas", {
      height: 643,
      width: 516,
    });

    setCanvas(newCanvas);
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
      createMemoPic();

      if (!!initUser?.image) {
        canvas.setBackgroundImage(
          initUser.image,
          canvas.renderAll.bind(canvas)
        );
      }
    }
  }, [canvas, initUser?.image]);

  const createMemoPic = useCallback(() => {
    const textObj = new fabric.Text(text, {
      fontSize: 15,
      originX: "left",
      originY: "top",
      left: 10,
      top: 10,
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
      width: calcWidth(width, height) + 50,
      height: height + 50,
    });

    const scale = memoObj.width > 500 ? 500 / memoObj.width : memoObj.width;

    const groupObj = new fabric.Group([memoObj, textObj], {
      left: 200,
      top: 400,
      scaleX: scale,
      scaleY: scale,
    });

    canvas.add(groupObj);
    canvas.centerObject(groupObj);
  }, [canvas, color, text]);

  const onSaveRP = useCallback(async () => {
    if (canvas && params?.id) {
      const url = canvas.toDataURL({
        format: "png",
      });

      await setUserImage(params.id, { image: url }).then((res) => {
        open(CustomModal, {
          okText: "스티커 추가하기",
          contents: "스티커로 롤링 페이퍼를 꾸며보세요",
          onClose: (isOk) => {
            navigate(`/main/stickers/${params.id}`, { replace: true });
          },
        });
      });
    }
  }, [canvas, params?.id]);

  return (
    <>
      <Header />
      <section>
        <TopLabel contents={initUser ? `${initUser.name} 님` : ""} />

        <canvas id="canvas" />

        <div className={styles.nextBtnWrapper}>
          <div className={styles.nextInfo}>이젠 수정이 불가능해요!</div>

          <Button type="primary" onClick={onSaveRP}>
            메모 남기기
          </Button>
        </div>
      </section>
    </>
  );
});

export default ContentsPosition;