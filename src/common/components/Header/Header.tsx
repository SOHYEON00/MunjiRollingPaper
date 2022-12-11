import React, { memo, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GetHeaderInfo, getPath, PathTitles } from "route/path";
import BackIcon from "images/back_icon.png";
import { Button } from "antd";
import styles from "./Header.module.scss";

const Header = memo((props) => {
  const location = useLocation();
  const navigation = useNavigate();
  const params = useParams();

  const { isBackIcon, isNewBtn } = GetHeaderInfo(location.pathname, params);

  const onGoBack = useCallback(() => {
    navigation(-1);
  }, []);

  const onCreate = useCallback(() => {
    navigation(getPath(PathTitles.Landing));
  }, []);

  return (
    <section className={styles.Header}>
      <div className={styles.goBackBtnWrapper}>
        {isBackIcon && (
          <button onClick={onGoBack}>
            <img src={BackIcon} alt="go back button" />
          </button>
        )}
      </div>
      <div className={styles.Title}>Munji Rolling Paper</div>
      {isNewBtn ? (
        <Button className={styles.createBtn} onClick={onCreate}>
          생성하기
        </Button>
      ) : (
        <div className={styles.createBtn}></div>
      )}
    </section>
  );
});

export default Header;
