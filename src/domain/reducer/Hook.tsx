import { useReducer } from "react";
import { modelReducer } from "./Reducer";
import { IModel, State } from "../models/State";

export const useModelReducer = <T extends IModel>(initialState: State<T>) => {
  const [state, dispatch] = useReducer(modelReducer<T>, initialState);
  return { state, dispatch };
};
