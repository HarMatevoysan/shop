import { useState, useEffect, FC } from "react";
import { BrowserRouter } from "react-router-dom";

import { useAction } from "./hooks";
import AppRouter from "./AppRouter";
import { ShopContext } from "./context";

const App: FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { fetchProducts } = useAction();

  useEffect(() => {
    fetchProducts();

    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
  }, []);

  return (
    <ShopContext.Provider value={{ isAuth, setIsAuth, isAdmin, setIsAdmin }}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ShopContext.Provider>
  );
};

export default App;
