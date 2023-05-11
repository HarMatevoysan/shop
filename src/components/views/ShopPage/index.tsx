import { useEffect, useState, FC, useContext } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { star } from "../../../asests";
import { ShopContext } from "../../../context";
import { INFO_ROUTE } from "../../../constants";
import { useTypedSelector } from "../../../hooks";
import { Loader, Modal, Pagination } from "../../../components";
import { IDefaultState } from "../../../types/products";
import { ProductTypes } from "../../../store/actionTypes";

import style from "./ShopPage.module.scss";

const ShopPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth } = useContext(ShopContext);

  const state = useTypedSelector((state) => state.shop);

  const [categories, setCategories] = useState("");
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [maxPageLimit, setMaxPageLimit] = useState(5);

  const lastPageIndex = currentPage * 15;
  const firstPageIndex = lastPageIndex - 15;
  const paginate = (pageNum: number) => setCurrentPage(pageNum);
  const curr = state.products.slice(firstPageIndex, lastPageIndex);

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

  const handleSellectCategory = (category: any) => {
    setCurrentPage(1);
    handleClick(category);
  };

  return (
    <>
      {loading ? (
        <>
          <div className={style.row}>
            {modal ? (
              <Modal visible={modal} setVisible={setModal}>
                Please login for order
              </Modal>
            ) : null}
            <>
              <aside className={style.products}>
                <ul className={style.products__list}>
                  {state.category.map((product) => (
                    <li
                      className={categories === product ? style.products__list_item_active : style.products__list_item}
                      key={product}
                      onClick={() => handleSellectCategory(product)}
                    >
                      {product}
                    </li>
                  ))}
                </ul>
              </aside>
              <section className={style.body}>
                {curr.map((product: IDefaultState) => (
                  <div className={style.card} key={product.id}>
                    <div className={style.card__body} onClick={() => navigate(INFO_ROUTE + "/" + product.id)}>
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
              </section>
            </>
          </div>

          <Pagination
            array={state.products.length}
            paginate={paginate}
            currentPage={currentPage}
            setPage={setCurrentPage}
            minPageLimit={minPageLimit}
            setMinPageLimit={setMinPageLimit}
            maxPageLimit={maxPageLimit}
            setMaxPageLimit={setMaxPageLimit}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ShopPage;
