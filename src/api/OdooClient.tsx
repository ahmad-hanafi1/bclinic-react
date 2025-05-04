/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";
import { requestHandler } from "./requestHandler";
import { arrayToQueryString } from "../utils/Helpers";
import qs from "qs";
interface AuthenticateParams {
  username: string;
  password: string;
}
interface SignUpParams {
  name: string;
  password: string;
  login: string;
}

export interface GetParams {
  domain?: unknown;
  fields?: string[];
}

export interface ProfileParams {
  fields?: string[];
}

export interface ReadParams {
  ids?: number[];
  fields?: string[];
}

interface CreateParams {
  data: Record<string, any>;
}

interface UpdateParams {
  id: number; // record id
  model: string;
  data: Record<string, any>;
}

interface DeleteParams {
  ids: number[];
}

class OdooClient {
  gatewayUrl: string;
  axiosInstance: AxiosInstance;

  constructor(gatewayUrl: string) {
    this.gatewayUrl = gatewayUrl;
    this.axiosInstance = axios.create();
  }

  // SIGN UP METHOD
  signUp = requestHandler<
    SignUpParams,
    { access_token?: string; token_type?: string }
  >((body) => this.axiosInstance.post(`${this.gatewayUrl}/signup`, body));

  // AUTHENTICATE METHOD
  authenticate = requestHandler<
    AuthenticateParams,
    { access_token?: string; token_type?: string }
  >((body) => this.axiosInstance.post(`${this.gatewayUrl}/authenticate`, body));

  // PROFILING METHOD
  async profile<T>(params: ProfileParams, headers: Record<string, string>) {
    return requestHandler<GetParams, T>((params) =>
      this.axiosInstance.get(`${this.gatewayUrl}/get_profile`, {
        headers: headers,
        params: params,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      })
    )(params);
  }

  // SEARCH-READ METHOD
  async get<T>(
    model: string,
    params: GetParams,
    headers: Record<string, string>
  ) {
    return requestHandler<GetParams, T>((params) =>
      this.axiosInstance.get(`${this.gatewayUrl}/search_read/${model}`, {
        headers: headers,
        params: params,
      })
    )(params);
  }

  // ONLY READ METHOD
  async read<T>(
    model: string,
    params: ReadParams,
    headers: Record<string, string>
  ) {
    const queryString = arrayToQueryString("ids", params.ids ?? []);
    return requestHandler<ReadParams, T>((params) =>
      this.axiosInstance.get(
        `${this.gatewayUrl}/read/${model}?${queryString}`,
        {
          headers: headers,
          params: params,
        }
      )
    )(params);
  }

  // UPDATE METHOD
  async update<T>(headers: Record<string, string>, params: UpdateParams) {
    return requestHandler<UpdateParams, T>(() =>
      this.axiosInstance.put(
        `${this.gatewayUrl}/update/${params.model}`,
        {
          id: params.id,
          data: params.data,
        },
        {
          headers,
        }
      )
    )(params);
  }

  // DELETE METHOD

  async delete<T>(
    model: string,
    params: DeleteParams,
    headers: Record<string, string>
  ) {
    // To prevent the axios from sending the ids like ?ids[]=ID
    const queryString = arrayToQueryString("ids", params.ids);

    return requestHandler<DeleteParams, T>(() =>
      this.axiosInstance.delete(
        `${this.gatewayUrl}/delete/${model}?${queryString}`,
        {
          headers: headers,
          // params: params,
        }
      )
    )(params);
  }

  // CREATE METHOD
  // create = requestHandler<CreateParams, T>((body) =>
  //   axios.post(`${this.gatewayUrl}/create`, body)
  // );

  async create<T>(
    model: string,
    headers: Record<string, string>,
    params: CreateParams
  ) {
    return requestHandler<CreateParams, T>(() =>
      this.axiosInstance.post(
        `${this.gatewayUrl}/create/${model}`,
        {
          data: params.data,
        },
        {
          headers,
        }
      )
    )(params);
  }
}

export default OdooClient;
