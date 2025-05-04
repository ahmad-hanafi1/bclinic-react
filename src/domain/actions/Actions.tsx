import { IModel } from "../models/State";
import { Actions } from "./Actions.d";

export interface GetAllAction<T> {
  type: Actions.GetAll;
  payload: T[];
}

export interface ReadAllAction<T> {
  type: Actions.ReadAll;
  payload: T[];
}

export interface DeleteOneAction {
  type: Actions.DeleteOne;
  payload: { id?: number };
}

export interface MutateOneAction {
  type: Actions.MutateOne;
  payload: { id: number };
}

export interface WriteOneAction<T extends IModel> {
  type: Actions.WriteOne;
  payload: WriteOneActionPayload<T>;
}

export interface CreateOneAction<T> {
  type: Actions.CreateOne;
  payload: CreateOneActionPayload<T>;
}

export interface AddOneAction<T> {
  type: Actions.AddOne;
  payload: T;
}

export interface LoadingAction {
  type: Actions.Loading;
  payload: LoadingPayload;
}

export interface ErrorAction {
  type: Actions.Error;
  payload: ErrorPayload;
}

export type StateAction<T extends IModel> =
  | GetAllAction<T>
  | ReadAllAction<T>
  | DeleteOneAction
  | MutateOneAction
  | WriteOneAction<T>
  | CreateOneAction<T>
  | AddOneAction<T>
  | LoadingAction
  | ErrorAction;

export interface WriteOneActionPayload<T extends IModel> {
  id: number;
  record: T;
}

export interface CreateOneActionPayload<T> {
  /**
   * The recordId should always be a positive number returned from the server after the create.
   */
  record: T;
}

export interface LoadingPayload {
  isLoading: boolean;
}

export interface ErrorPayload {
  code?: number | string;
  message?: string;
}
