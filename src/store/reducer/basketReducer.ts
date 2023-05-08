import { ProductTypes } from "../actionTypes";

import { BasketAction, IBasket } from "../../types/basket";

const defaultState: IBasket = {
  basket: [],
};

const basketReducer = (state = defaultState, action: BasketAction): IBasket => {
  switch (action.type) {
    case ProductTypes.ADD_BASKET:
      return {
        ...state,
        basket: [...state.basket, { ...action.payload, quntity: 0, id: Date.now() }],
      };

    case ProductTypes.REMOVE_BASKET:
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.payload),
      };

    case ProductTypes.ORDER_NOW:
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};

export default basketReducer;
