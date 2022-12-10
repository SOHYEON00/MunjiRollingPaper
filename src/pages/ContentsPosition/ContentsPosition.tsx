import Header from "common/components/Header/Header";
import TopLabel from "common/components/TopLabel/TopLabel";
import React, { memo } from "react";

const ContentsPosition = memo(() => {
  return (
    <>
      <Header />
      <section>
        <TopLabel contents="" />
      </section>
    </>
  );
});

export default ContentsPosition;
