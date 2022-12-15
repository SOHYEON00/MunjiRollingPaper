import React, { memo, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GetHeaderInfo, getPath, PathTitles } from "route/path";
import BackIcon from "images/back_icon.png";
import { Button } from "antd";
import styles from "./Header.module.scss";
import HeaderIcon from "image/header2.png";

const Header = memo((props) => {
  const location = useLocation();
  const navigation = useNavigate();
  const params = useParams();

  const { isBackIcon, isNewBtn } = GetHeaderInfo(location.pathname, params);

  const onGoBack = useCallback(() => {
    navigation(-1);
  }, []);

  const onGoToMain = useCallback(() => {
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
      {/* <div className={styles.Title} onClick={onGoToMain}>
        먼지 롤링 페이퍼
      </div> */}

      <div onClick={onGoToMain}>
        <img
          src={HeaderIcon}
          alt="title"
          width={150}
          // height={55}
        />
      </div>
      {isNewBtn ? (
        <Button className={styles.createBtn} onClick={onGoToMain}>
          New
        </Button>
      ) : (
        <div className={styles.createBtn}></div>
      )}
    </section>
  );
});

export default Header;
