import * as React from "react";
import Header from "./Header";

const DefaultLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <section className={"container md"}>
      <Header />
      {children}
    </section>
  );
};

export default React.memo(DefaultLayout);
