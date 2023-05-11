import { useEffect, useState, FC, useContext } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

import { bigStar } from "../../../asests";
import { ShopContext } from "../../../context";
import { useTypedSelector } from "../../../hooks";
import { Loader, Modal } from "../../../components";
import { IDefaultState } from "../../../types/products";
import { ProductTypes } from "../../../store/actionTypes";

import style from "./InfoPage.module.scss";

const InfoPage: FC = () => {
  const dispatch = useDispatch();

  const params = useParams();

  const { isAuth } = useContext(ShopContext);

  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const state: IDefaultState | any[] = useTypedSelector((state) => state.shop.products);

  const infoState: IDefaultState | any = state.filter((state) => state.id == params.id);

  useEffect(() => {
    setLoading(false);

    setTimeout(() => setLoading(true), 2000);
  }, []);

  const addBasket = () => {
    dispatch({ type: ProductTypes.ADD_BASKET, payload: infoState[0] });
  };

  const addBtnAction = isAuth ? addBasket : () => setModal(true);

  return (
    <>
      {modal ? (
        <Modal visible={modal} setVisible={setModal}>
          Please login for order
        </Modal>
      ) : null}
      {loading ? (
        <div className={style.content}>
          <div className={style.content__header}>
            <img className={style.content__header__img} src={infoState[0].image}></img>
            <div className={style.content__header__title}>
              <p className={style.content__header__title_txt}> {infoState[0].title}</p>
              <div className={style.content__header__title_rate} style={{ backgroundImage: `url(${bigStar})` }}>
                <p className={style.content__header__title_rate_txt}>{infoState[0].rating?.rate}</p>
              </div>
            </div>
            <div className={style.content__header__basket}>
              <div className={style.content__header__basket_price}>
                <p className={style.content__header__basket_price_txt}>Price`</p>
                {infoState[0].price}$
              </div>
              <button className={style.content__header__add} onClick={addBtnAction}>
                Add to basket
              </button>
            </div>
          </div>
          <div className={style.content__body}>
            <div className={style.content__body__info}>
              <p className={style.content__body__info_txt}>Product info</p>
              {infoState[0].description}
            </div>
            <div className={style.content__body__info}>
              <p className={style.content__body__info_txt}>Rating</p>
              <div>
                Rate count: <span>{infoState[0].rating?.count}</span>{" "}
              </div>
              <div>
                Rate: <span>{infoState[0].rating?.rate}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default InfoPage;
