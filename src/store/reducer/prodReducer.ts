import { ILogin, IProductState, ProductAction } from "../../types/products";
import { ProductTypes } from "../actionTypes";

const loginDefaultState: ILogin = {
  id: 1,
  username: "admin",
  password: "1234",
};

const defaultState: IProductState = {
  products: [],
  productS: [],
  category: [],
  login: [loginDefaultState],
  error: null,
  loading: false,
};

const shopReducer = (state = defaultState, action: ProductAction): IProductState => {
  switch (action.type) {
    case ProductTypes.FETCH_PRODUCTS:
      return { ...state, loading: true };

    case ProductTypes.FETCH_PRODUCTS_SUCCESSFUL:
      return { ...state, loading: false, products: action.payload, productS: action.payload };

    case ProductTypes.FETCH_CATEGORY_SUCCESSFUL:
      return { ...state, loading: false, category: action.payload };

    case ProductTypes.FETCH_PRODUCTS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ProductTypes.ADD_USER:
      const newUser = {
        id: Date.now(),
        username: action.payload[0],
        password: action.payload[1],
      };
      return { ...state, login: [...state.login, newUser] };

    case ProductTypes.ADD_PRODUCT:
      const newProduct = {
        id: Date.now(),
        title: action.payload[0],
        price: action.payload[1],
        description: action.payload[2],
        image: action.payload[3],
        category: action.payload[4],
        rating: { rate: 0, count: 0 },
      };
      return { ...state, products: [...state.products, newProduct], productS: [...state.productS, newProduct] };

    case ProductTypes.ADD_CATEGORY:
      return { ...state, category: [...state.category, action.payload] };

    case ProductTypes.SET_CATEGORY:
      return {
        ...state,
        products: [
          ...state.productS.filter((prod) => (action.payload !== "" ? prod.category === action.payload : prod)),
        ],
      };

    case ProductTypes.REMOVE_USER:
      return { ...state, login: state.login.filter((user) => user.id !== action.payload) };

    default:
      return state;
  }
};

export default shopReducer;
