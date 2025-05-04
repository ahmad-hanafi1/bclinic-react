import { AxiosError } from "axios";

type SuccessResponse<V> = {
  code: "success";
  data: V;
};

type ErrorResponse<E = AxiosError> = {
  code: "error";
  error: E;
};

export type BaseResponse<V, E> = Promise<SuccessResponse<V> | ErrorResponse<E>>;
