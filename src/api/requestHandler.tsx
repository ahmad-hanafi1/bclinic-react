import { AxiosError } from "axios";
import { BaseRequest } from "../domain/models/BaseRequest";
import { BaseResponse } from "../domain/models/BaseResponse";

export const requestHandler =
  <T, V, E = AxiosError>(request: BaseRequest<T, V>) =>
  async (params?: T): BaseResponse<V, E> => {
    try {
      const response = await request(params);
      return { code: "success", data: response.data };
    } catch (e) {
      return { code: "error", error: e as E };
    }
  };
