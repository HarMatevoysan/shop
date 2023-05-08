import { Dispatch } from "react";
import axios from "axios";

import { ProductTypes } from "../actionTypes";

import { ProductAction } from "../../types/products";

export const fetchProducts = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      dispatch({ type: ProductTypes.FETCH_PRODUCTS });

      const response = await axios.get("https://fakestoreapi.com/products");

      dispatch({ type: ProductTypes.FETCH_PRODUCTS_SUCCESSFUL, payload: response.data });

      const responseCategory = await axios.get("https://fakestoreapi.com/products/categories");

      dispatch({ type: ProductTypes.FETCH_CATEGORY_SUCCESSFUL, payload: responseCategory.data });
    } catch (e) {
      dispatch({ type: ProductTypes.FETCH_PRODUCTS_ERROR, payload: "Error" });
    }
  };
};
