import { ROUTE_NAMES } from "../constants";

export interface IUserContent {
  [ROUTE_NAMES.ACCOUNT]: string;
  [ROUTE_NAMES.PAYMENTS]: string;
  [ROUTE_NAMES.GETTING_STARTED]: string;
  [ROUTE_NAMES.PROMOTIONS]: string;
  [ROUTE_NAMES.ORDERS_INFO]: string;
}
