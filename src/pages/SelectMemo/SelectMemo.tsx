import { Button } from "antd";
import Header from "common/components/Header/Header";
import TopLabel from "common/components/TopLabel/TopLabel";
import React, { memo, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStore, { IStore, useColor } from "store";
import styles from "./SelectMemo.module.scss";

const MemoColorList: string[] = [
  "#ffd7d4",
  "#ffcd9c",
  "#fffbb3",
  "#d1ff75",
  "#bdffc2",
  "#afedda",
  "#a1e3f7",
  "#93b2fa",
  "#a098d4",
  "#daa8f0",
  "#f779d4",
  "#e37b96",
];

const SelectMemo = memo((props) => {
  const initColor = useColor();
  const setColor = useStore((store: IStore) => store.memo.setColor);

  const navigate = useNavigate();
  const params = useParams();

  const [selectedColor, setSelectedColor] = useState<string>(initColor);

  const onChangeSelectedColor = useCallback((color: string) => {
    setSelectedColor(color);
  }, []);

  const onSaveColor = useCallback(() => {
    setColor(selectedColor);
    navigate(`main/memo/contents/${params?.id}`);
  }, [selectedColor, params?.id]);

  return (
    <>
      <Header />
      <TopLabel contents="메모지 색상을 선택해주세요." />
      <section className={styles.MemoWrapper}>
        {MemoColorList.map((color) => {
          return (
            <div
              style={{
                backgroundColor: color,
                boxShadow:
                  selectedColor !== color
                    ? `0 0 27px ${color}8f`
                    : `0 0 27px rgba(231, 44, 44, 0.55)`,
              }}
              key={color}
              className={styles.memoDiv}
              onClick={() => onChangeSelectedColor(color)}
            ></div>
          );
        })}
      </section>
      <div className={styles.nextBtnWrapper}>
        <Button onClick={onSaveColor} disabled={!selectedColor} type="primary">
          다음으로
        </Button>
      </div>
    </>
  );
});

export default SelectMemo;
