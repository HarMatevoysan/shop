import React, { FC, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import type { IUserData } from "./type";

import { ShopContext } from "../../../context";
import { useTypedSelector } from "../../../hooks";
import { ProductTypes } from "../../../store/actionTypes";
import { LOGIN_ROUTE, REGISTR_ROUTE } from "../../../constants";

import style from "./AuthPage.module.scss";

const AuthPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loacation = useLocation();

  const loginState = useTypedSelector((state) => state.shop.login);

  const { setIsAuth, setIsAdmin } = useContext(ShopContext);

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordRepeat, setPasswordRepeat] = useState<string>();
  const [errorMessages, setErrorMessages] = useState<any>({});

  useEffect(() => {
    setPassword("");
    setUsername("");
    setPasswordRepeat("");
  }, [loacation.pathname]);

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangePasswordRepeat = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordRepeat(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const logIn = () => {
    if (isLogin) {
      if (userData) {
        if (userData.password !== password) {
          setErrorMessages({ message: "Invalid password" });
        } else {
          setIsAuth(true);
          localStorage.setItem("auth", "true");
          if (username === "admin") {
            localStorage.setItem("admin", "true");
            setIsAdmin(true);
          }
          //  username === "admin" ? localStorage.setItem("admin", "true") : localStorage.setItem("admin", "false");
          navigate("/");
        }
      } else {
        setErrorMessages({ message: "Invalid username" });
      }
    } else {
      dispatch({ type: ProductTypes.ADD_USER, payload: [username, password] });

      navigate("/login");
    }
  };

  const renderErrorMessage = (name: string) =>
    name === errorMessages.message && <div className={style.error}>{errorMessages.message}</div>;

  const userData: IUserData = loginState.find((user) => user.username === username);

  const isLogin = loacation.pathname === LOGIN_ROUTE;

  const pageTitle = isLogin ? "Login" : "Registration";

  const btnText = isLogin ? "Login" : "Create Account";

  const btnDisabled = username && (isLogin ? password : password === passwordRepeat) ? false : true;

  return (
    <div className={style.container}>
      <div className={style.body}>
        <form className={style.body__form} onSubmit={handleSubmit}>
          <p className={style.body__form_title}>{pageTitle}</p>
          <input value={username} type="text" placeholder="Username" onChange={handleChangeUsername} />
          {renderErrorMessage("Invalid username")}
          <input value={password} type="password" placeholder="Password" onChange={handleChangePassword} />
          {renderErrorMessage("Invalid password")}
          {isLogin ? null : (
            <>
              <input
                value={passwordRepeat}
                type="password"
                placeholder="Repeat password"
                onChange={handleChangePasswordRepeat}
              />
            </>
          )}
          <div className={style.body__form_footer}>
            {isLogin ? (
              <p className={style.body__form_footer_text}>
                Don't have a account? <NavLink to={REGISTR_ROUTE}>Sign Up </NavLink>
              </p>
            ) : (
              <p className={style.body__form_footer_text}>
                Already have an accont? <NavLink to={LOGIN_ROUTE}>Sign In </NavLink>
              </p>
            )}
            <button disabled={btnDisabled} onClick={logIn}>
              {btnText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
