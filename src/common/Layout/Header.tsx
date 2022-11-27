import Button from "common/components/Button/Button";
import BackIcon from "images/BackIcon";
import * as React from "react";
import { useLocation } from "react-router-dom";
import { GetHeaderInfo } from "route/path";

const Header = () => {
  const location = useLocation();
  const { isBackIcon, isNewBtn } = GetHeaderInfo(location.pathname);

  return (
    <section
      className={`flex-row flex h-14 ${
        isBackIcon || isNewBtn ? "justify-between" : "justify-center"
      } items-center px-[10px] py-[15px]`}
    >
      {isBackIcon && (
        <div className="w-[108px]">
          <BackIcon />
        </div>
      )}
      <div className="font-mono text-xl subpixel-antialiased">
        Munji Rolling Paper
      </div>
      {isNewBtn && <Button contents="새로 생성하기" />}
    </section>
  );
};

export default React.memo(Header);
