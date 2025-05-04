import { AxiosResponse } from "axios";
export type BaseRequest<T, V> = (params?: T) => Promise<AxiosResponse<V>>;
