import { ProductTypes } from "../store/actionTypes";

export interface IDefaultBasket {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IBasket {
  basket: any[];
}

interface IAddBasket {
  type: ProductTypes.ADD_BASKET;
  payload: [];
}

interface IRemoveBasket {
  type: ProductTypes.REMOVE_BASKET;
  payload: number;
}

interface IOrderNow {
  type: ProductTypes.ORDER_NOW;
}

export type BasketAction = IAddBasket | IRemoveBasket | IOrderNow;
