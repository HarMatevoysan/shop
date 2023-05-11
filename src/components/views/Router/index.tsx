import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { AuthPage, ShopPage, Navbar, InfoPage, BasketPage, AdminPanel } from "../..";
import { BASKET_ROUTE, INFO_ROUTE, LOGIN_ROUTE, REGISTR_ROUTE, SHOP_ROUTE, ADMIN_ROUTE } from "../../../constants";

const AppRouter: FC = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path={LOGIN_ROUTE} element={<AuthPage />} />
        <Route path={REGISTR_ROUTE} element={<AuthPage />} />
        <Route path={ADMIN_ROUTE} element={<AdminPanel />} />
        <Route path={BASKET_ROUTE} element={<BasketPage />} />
        <Route path={SHOP_ROUTE} index element={<ShopPage />} />
        <Route path={INFO_ROUTE + "/:id"} element={<InfoPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
