import { TypedUseSelectorHook, useSelector } from "react-redux";

import { RootReducerType } from "../../store/reducer";

export const useTypedSelector: TypedUseSelectorHook<RootReducerType> = useSelector;
