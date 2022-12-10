import * as React from "react";
import styles from "./DefaultLayout.module.scss";

const DefaultLayout = ({ children }: React.PropsWithChildren) => {
  return <section className={styles.DefaultLayout}>{children}</section>;
};

export default React.memo(DefaultLayout);
