import Header from "common/components/Header/Header";
import TopLabel from "common/components/TopLabel/TopLabel";
import React, { memo } from "react";

const Stickers = memo(() => {
  return (
    <>
      <Header />
      <section>
        <TopLabel contents="스티커로 롤링 페이퍼를 꾸며보세요." />
      </section>
    </>
  );
});

export default Stickers;
