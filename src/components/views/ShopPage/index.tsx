import { useEffect, useState, FC, useContext } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { star } from "../../../asests";
import { Loader, Modal } from "../../../components";
import { ShopContext } from "../../../context";
import { INFO_ROUTE } from "../../../constants";
import { useTypedSelector } from "../../../hooks";
import { IDefaultState } from "../../../types/products";
import { ProductTypes } from "../../../store/actionTypes";

import style from "./ShopPage.module.scss";

const ShopPage: FC = () => {
  const dispatch = useDispatch();

  const { isAuth } = useContext(ShopContext);

  const state = useTypedSelector((state) => state.shop);

  const nav = useNavigate();

  const [categories, setCategories] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, []);

  const handleClick = (prod: string) => {
    setCategories(prod);

    if (prod === categories) {
      setCategories("");

      dispatch({ type: ProductTypes.SET_CATEGORY, payload: "" });
    } else {
      dispatch({ type: ProductTypes.SET_CATEGORY, payload: prod });
    }
  };

  const addBasket = (item: object) => {
    dispatch({ type: ProductTypes.ADD_BASKET, payload: item });
  };

  return (
    <div className={style.row}>
      {modal ? (
        <Modal visible={modal} setVisible={setModal}>
          Please login for order
        </Modal>
      ) : null}
      {loading ? (
        <>
          <div className={style.products}>
            <ul className={style.products__list}>
              {state.category.map((product) => (
                <li
                  className={categories === product ? style.products__list_item_active : style.products__list_item}
                  key={product}
                  onClick={() => handleClick(product)}
                >
                  {product}
                </li>
              ))}
            </ul>
          </div>
          <div className={style.body}>
            {state.products.map((product: IDefaultState) => (
              <div className={style.card} key={product.id}>
                <div className={style.card__body} onClick={() => nav(INFO_ROUTE + "/" + product.id)}>
                  <img className={style.card__body__img} src={product.image}></img>
                  <div className={style.card__body__actions}>
                    <div className={style.card__body__actions_price}>{product.price}$</div>
                    <div className={style.card__body__actions_reating}>
                      <img src={star}></img>
                      {product.rating.rate}
                    </div>
                  </div>
                  <p className={style.card__body__title}>{product.title}</p>
                </div>
                <button className={style.card__btn} onClick={() => (isAuth ? addBasket(product) : setModal(true))}>
                  Add basket
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ShopPage;
