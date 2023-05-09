import { FC, useEffect } from "react";

import { IModal } from "./type";

import { close } from "../../../asests";

import style from "./Modal.module.scss";

const Modal: FC<IModal> = ({ children, visible, setVisible }) => {
  const rootStyle = [style.container];

  if (visible) {
    rootStyle.push(style.active);
  }

  const containerClasses = rootStyle.join(" ");

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  }, []);

  return (
    <div className={containerClasses}>
      <div className={style.container__content}>
        <div className={style.container__content_close} onClick={() => setVisible(false)}>
          <img src={close} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
