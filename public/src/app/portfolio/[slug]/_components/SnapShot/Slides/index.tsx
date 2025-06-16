import style from "./index.module.scss";

export function MobileSlide() {
  return (
    <div className={style.snapShotMobile}>
      <img
        className={style.placeHolder}
        src="/iphonebg.png"
        alt="product snapshot"
      />
      <img
        className={`${style.productImg} ${style.phoneImg}`}
        src="/iphoneDemoImg.png"
        alt="iphone demo image"
      />
    </div>
  );
}

export function DesktopSlide() {
  return (
    <div className={style.snapShotDesktop}>
      <img
        className={style.placeHolder}
        src="/laptopbg.png"
        alt="product snapshot"
      />
      <img
        className={`${style.productImg} ${style.laptopImg}`}
        src="/laptopDemoImg.png"
        alt="laptop demo image"
      />
    </div>
  );
}

export function TabletSlide() {
  return (
    <div className={style.snapShotTablet}>
      <img
        className={`${style.productImg} ${style.tabletImg}`}
        src="/ipadDemoImg.png"
        alt="ipad demo image"
      />
      <img
        className={style.placeHolder}
        src="/ipadbg.png"
        alt="product snapshot"
      />
    </div>
  );
}
