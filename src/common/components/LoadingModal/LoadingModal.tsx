import React from "react";
import styles from "./LoadingModal.module.scss";
import Munji_GIF from "image/mungi_loading.gif";

const randomText = [
  "Tip) 스티커를 이용해 롤링 페이퍼를 꾸며보세요.",
  "먼지처럼 작은 롤링 페이퍼 메모들이 모여 내용이 가득찬 롤링 페이퍼를 만들어보세요",
  "마음을 전하고 싶으실 때 롤링 페이퍼를 만들어보세요!",
  "잠깐! 우주에서 온 먼지는 지구가 생긴 이래로 항상 지구에 떨어져 온 것을 알고 계신가요?",
  "우주 먼지는 영어로 Cosmic dust라고 한대요.",
];

const LoadingModal = () => {
  const getRandomInt = () => {
    let min = 0,
      max = randomText.length;

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  };

  return (
    // <div className={styles.LoadingModal}>
    <div className={styles.contents}>
      <div className={styles.text}>{randomText[getRandomInt()]}</div>

      <div>
        <img src={Munji_GIF} alt="loading..." width={80} />
      </div>
      <span className={styles.loadingText}>Loading......</span>
    </div>
    // </div>
  );
};

export default LoadingModal;
