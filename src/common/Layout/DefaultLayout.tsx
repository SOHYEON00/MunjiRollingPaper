import Header from "common/components/Header/Header";
import * as React from "react";
import styles from "./DefaultLayout.module.scss";

const DefaultLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <section className={styles.DefaultLayout}>
      <Header />
      {children}
    </section>
  );
};

export default React.memo(DefaultLayout);
