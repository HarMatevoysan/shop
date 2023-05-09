import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { Modal } from "../../../components";
import { useTypedSelector } from "../../../hooks";
import { IDefaultBasket } from "../../../types/basket";
import { ProductTypes } from "../../../store/actionTypes";

import style from "./BasketPage.module.scss";

const BasketPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const basketState = useTypedSelector((state) => state.basket.basket);

  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    if (!localStorage?.auth) {
      navigate("/");
    }
  }, [localStorage.auth]);

  const handleDelete = (id: number) => {
    dispatch({ type: ProductTypes.REMOVE_BASKET, payload: id });
  };

  const handleOrder = () => {
    setModal(true);
    setTimeout(() => dispatch({ type: ProductTypes.ORDER_NOW }), 1000);
  };

  const sumOrder = basketState.reduce((a, b) => {
    return a + b.price;
  }, 0);

  return (
    <div className={style.content}>
      {modal ? (
        <Modal visible={modal} setVisible={setModal}>
          Your order has been successfully registered
        </Modal>
      ) : null}
      {basketState.length ? (
        <>
          <div className={style.content__basket}>
            {basketState.map((item: IDefaultBasket) => (
              <div className={style.content__basket__item} key={item.id}>
                <img className={style.content__basket__item_img} src={item.image} alt="product_img" />
                <p className={style.content__basket__item_title}>{item.title}</p>
                <div className={style.content__basket__item_price}>{item.price}$</div>
                <div className={style.content__basket__item_del} onClick={() => handleDelete(item.id)}>
                  Delete
                </div>
                <div className={style.content__basket__item_del_hidden} onClick={() => handleDelete(item.id)}>
                  X
                </div>
              </div>
            ))}
          </div>
          <div className={style.content__order}>
            <p className={style.content__order_txt}>
              Items total` <span>{basketState.length}</span> items
            </p>
            <p className={style.content__order_txt}>
              Total`<span> {sumOrder}$</span>
            </p>
            <button className={style.content__order_btn} onClick={handleOrder}>
              Order Now
            </button>
          </div>
        </>
      ) : (
        <p className={style.content__empty}>Basket is empty</p>
      )}
    </div>
  );
};

export default BasketPage;
