import { Button } from "antd";
import React from "react";
import styles from "./Page404.module.scss";

const Page404 = () => {
  return (
    <section className={styles.Wrapper}>
      <div>
        <div>해당 롤링 페이퍼 정보를 찾을 수 없습니다.</div>
        <div>새로운 롤링 페이퍼를 생성해보세요!</div>
      </div>
      <Button>새로운 롤링 페이퍼 생성하기</Button>
    </section>
  );
};

export default Page404;
