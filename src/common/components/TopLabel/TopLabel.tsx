import React from "react";
import styles from "./TopLabel.module.scss";

interface TopLabelProps {
  contents: string | React.ReactNode;
}

const TopLabel = ({ contents, ...props }: TopLabelProps) => {
  return (
    <div {...props} className={styles.TopLabel}>
      {contents}
    </div>
  );
};

export default TopLabel;
