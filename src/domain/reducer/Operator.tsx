import { useCallback } from "react";
import { Actions } from "../actions/Actions.d";
import { useModelReducer } from "./Hook";
import { IModel, State } from "../models/State";
import { useOdoo } from "../contexts/OdooContext";
import { GetParams, ReadParams } from "../../api/OdooClient";
import { useSnackbar } from "../hooks/SnackbarHook";
import { extractIdFromArray } from "../../utils/OdooFormatHelper";
import { toCamelCase, toSnakeCase } from "../../utils/CaseTransformers";

interface ModelOperatorProp {
  name: string;
  emptyInstance: Record<string, unknown>;
}

interface DeleteProps {
  ids: number[];
}

interface WriteOneProps<T> {
  id: number;
  record: T;
}

interface CreateOneProps {
  data: Record<string, unknown>;
}

export const ModelOperator = <T extends IModel>({
  name,
  emptyInstance,
}: ModelOperatorProp) => {
  const initialState: State<T> = {
    data: [],
    error: null,
    loading: false,
    dirtyIndexes: new Set<number>(),
  };

  const { state, dispatch } = useModelReducer<T>(initialState);
  const odoo = useOdoo();
  const { showMessage } = useSnackbar();

  const getAll = useCallback(
    async (model: string, params: GetParams) => {
      const response = await odoo?.get<T>(model, params, {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      });

      if (response?.code === "success") {
        const userList = response.data;
        dispatch({
          type: Actions.GetAll,
          payload: userList as unknown as T[],
        });
        showMessage("loaded", "success");
      }
    },
    [dispatch, odoo, showMessage]
  );

  const readAll = useCallback(
    async (model: string, params: ReadParams) => {
      const response = await odoo?.read<T>(model, params, {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      });

      if (response?.code === "success") {
        const processedData = extractIdFromArray(response.data);
        dispatch({
          type: Actions.ReadAll,
          payload: toCamelCase(processedData) as unknown as T[],
        });
      } else {
        throw Error(`Could not read the ${name}/s`);
      }
    },
    [dispatch, name, odoo]
  );

  const writeOne = useCallback(
    async (
      model: string,
      headers: Record<string, string>,
      payload: WriteOneProps<T>
    ) => {
      const response = await odoo?.update<T>(headers, {
        model: model,
        id: payload.id,
        data: toSnakeCase(payload.record),
      });
      if (response?.code === "success") {
        dispatch({
          type: Actions.WriteOne,
          payload: payload,
        });
      } else {
        throw Error(`Could not read the ${name}/s`);
      }
    },
    [dispatch, name, odoo]
  );

  const deleteOne = useCallback(
    async (
      model: string,
      headers: Record<string, string>,
      { ids }: DeleteProps
    ) => {
      if (ids.length > 0) {
        const response = await odoo?.delete(model, { ids }, headers);

        if (response?.code === "success") {
          dispatch({
            type: Actions.DeleteOne,
            payload: { id: ids[0] },
          });
        }
      } else {
        throw Error(`Could not delete the ${name}/s`);
      }
    },
    [dispatch, name, odoo]
  );

  const addOne = useCallback(() => {
    dispatch({
      type: Actions.AddOne,
      payload: emptyInstance as unknown as T,
    });
  }, [dispatch, emptyInstance]);

  const createOne = useCallback(
    async (
      model: string,
      headers: Record<string, string>,
      payload: CreateOneProps
    ) => {
      const response = await odoo?.create(model, headers, {
        data: toSnakeCase(payload.data),
      });

      if (response?.code === "success") {
        dispatch({
          type: Actions.CreateOne,
          payload: { record: response.data as T },
        });
      } else {
        throw Error(`Could not create the ${name}/s`);
      }
    },
    [dispatch, name, odoo]
  );

  return {
    addOne,
    getAll,
    readAll,
    deleteOne,
    writeOne,
    createOne,
    state,
    dispatch,
  };
};
