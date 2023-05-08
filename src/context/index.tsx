import { createContext } from "react";
import { IAuthContext } from "./type";

const authState = {
  isAuth: true,
  setIsAuth: () => {},
};

const adminState = {
  isAdmin: false,
  setIsAdmin: () => {},
};

const RootContext = {
  ...adminState,
  ...authState,
};
export const ShopContext = createContext<IAuthContext>(RootContext);
