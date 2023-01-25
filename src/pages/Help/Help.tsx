import React from "react";
import Munji_GIF from "image/mungi_loading.gif";
import Header from "common/components/Header/Header";
import styles from "./Help.module.scss";
import Thumbnail from "image/thumbnail.png";

const Help = () => {
  return (
    <>
      <Header />
      <div className={styles.Container}>
        <div className={styles.subContainer}>
          <img src={Thumbnail} style={{ width: "100%", height: "auto" }} />
          <section className={styles.infoSection}>
            <div>
              우주의 먼지 같은 우리가 뭉치면 서로에게 든든한 왕먼지가 될 수
              있어!
            </div>
            <div>서로의 마음을 모을 수 있는 롤링페이퍼 사이트입니다.</div>
          </section>

          <img
            className={styles.gif}
            src={Munji_GIF}
            alt="loading..."
            width={80}
          />

          <section className={styles.askWrapper}>
            <div>문의사항은 아래 연락처로 주세요</div>
            <div style={{ fontWeight: 600 }}>
              <span>연락처</span> <span>soulless0426@gmail.com</span>
            </div>
          </section>

          <section className={styles.worker}>
            <div style={{ fontWeight: 600 }}>Thanks to</div>
            <div>
              <span>Developer</span> <span>Amy Oh</span>
            </div>
            <div>
              <span>Designer</span> <span>미야</span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Help;
