import React, { memo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetHeaderInfo } from "route/path";
import BackIcon from "images/back_icon.png";
import { Button } from "antd";
import styles from "./Header.module.scss";

const Header = memo((props) => {
  const location = useLocation();
  const navigation = useNavigate();
  const { isBackIcon, isNewBtn } = GetHeaderInfo(location.pathname);

  const onGoBack = useCallback(() => {
    navigation(-1);
  }, []);

  return (
    <section className={styles.Header}>
      {isBackIcon && (
        <div className={styles.goBackBtnWrapper}>
          <button onClick={onGoBack}>
            <img src={BackIcon} alt="go back button" />
          </button>
        </div>
      )}
      <div className={styles.Title}>Munji Rolling Paper</div>
      {isNewBtn && <Button className={styles.createBtn}>생성하기</Button>}
    </section>
  );
});

export default Header;
