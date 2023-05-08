import { ProductTypes } from "../store/actionTypes";

export interface IProductState {
  products: any[];
  productS: any[];
  category: any[];
  login: any[];
  error: null | string;
  loading: boolean;
}

interface IRating {
  rate: number;
  count: number;
}

export interface IDefaultState {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: IRating;
}

export interface ILogin {
  id: number;
  username: string;
  password: string;
}

interface IFetchProducts {
  type: ProductTypes.FETCH_PRODUCTS;
}

interface IFetchInfo {
  type: ProductTypes.FETCH_INFO;
}

interface IFetchProductsSuccessful {
  type: ProductTypes.FETCH_PRODUCTS_SUCCESSFUL;
  payload: [];
}

interface IFetchCategorySuccessful {
  type: ProductTypes.FETCH_CATEGORY_SUCCESSFUL;
  payload: [];
}

interface IFetchProductsError {
  type: ProductTypes.FETCH_PRODUCTS_ERROR;
  payload: string;
}

interface IAddUser {
  type: ProductTypes.ADD_USER;
  payload: [username: string, password: string];
}

interface IAddProduct {
  type: ProductTypes.ADD_PRODUCT;
  payload: [title: string, price: number, description: string, image: string, category: string];
}

interface ISetCategory {
  type: ProductTypes.SET_CATEGORY;
  payload: string;
}

interface IFetchInfoState {
  type: ProductTypes.FETCH_PRODUCTS_INFO_SUCCESSFUL;
  payload: [];
}

interface IRemoveUser {
  type: ProductTypes.REMOVE_USER;
  payload: number;
}

interface IAddCategory {
  type: ProductTypes.ADD_CATEGORY;
  payload: string;
}
export type ProductAction =
  | IFetchProducts
  | IFetchProductsError
  | IFetchProductsSuccessful
  | IAddUser
  | ISetCategory
  | IFetchInfo
  | IFetchInfoState
  | IRemoveUser
  | IFetchCategorySuccessful
  | IAddProduct
  | IAddCategory;
