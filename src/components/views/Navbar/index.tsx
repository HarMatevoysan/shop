import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { useTypedSelector } from "../../../hooks";

import { basket } from "../../../asests";
import { ShopContext } from "../../../context";
import { BASKET_ROUTE, LOGIN_ROUTE, REGISTR_ROUTE, SHOP_ROUTE, ADMIN_ROUTE } from "../../../constants";

import style from "./Navbar.module.scss";

const Navbar = () => {
  const { isAuth, setIsAuth, isAdmin, setIsAdmin } = useContext(ShopContext);
  const basketState = useTypedSelector((state) => state.basket.basket);

  const logOut = () => {
    setIsAuth(false);
    setIsAdmin(false);
    localStorage.removeItem("auth");
    localStorage.removeItem("admin");
  };

  return (
    <div className={style.content}>
      <NavLink to={SHOP_ROUTE} className={style.content__title}>
        Shop
      </NavLink>
      <div className={style.content__btns}>
        {isAuth ? (
          <>
            {isAdmin ? (
              <>
                <button className={style.content__btns_admin}>
                  <NavLink to={ADMIN_ROUTE}>Admin Panel</NavLink>
                </button>
              </>
            ) : null}
            <button className={style.content__btns_logut} onClick={logOut}>
              Logout
            </button>
            <NavLink className={style.content__btns_basket} to={BASKET_ROUTE}>
              <img src={basket} />
              <span>{basketState.length ? basketState.length : ""}</span>
            </NavLink>
          </>
        ) : (
          <>
            <button className={style.content__btns_login}>
              <NavLink to={LOGIN_ROUTE}>Login</NavLink>
            </button>
            <button className={style.content__btns_reg}>
              <NavLink to={REGISTR_ROUTE}>Rigistration</NavLink>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
