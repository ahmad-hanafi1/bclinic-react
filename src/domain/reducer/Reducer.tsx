import { updateItemWithChangedKeys } from "../../utils/Helpers";
import { StateAction } from "../actions/Actions";
import { Actions } from "../actions/Actions.d";
import { IModel, State } from "../models/State";

/**
 * Reducer function to manage the state of a generic model.
 * @template T - A type that extends the IModel interface.
 * @param {State<T>} state - The current state of the model.
 * @param {StateAction<T>} action - The action to handle.
 * @returns {State<T>} - The new state after the action is processed.
 */
export function modelReducer<T extends IModel>(
  state: State<T>,
  action: StateAction<T>
): State<T> {
  switch (action.type) {
    case Actions.GetAll:
    case Actions.ReadAll:
      // Set the loading state to false and update the data with the payload
      // Actual data fetching is assumed to be handled by middleware
      return { ...state, loading: false, data: action.payload };

    case Actions.DeleteOne:
      // Filter out the item to be deleted from the data array
      return {
        ...state,
        data: state.data
          ? state.data.filter((item) => item?.id !== action.payload.id)
          : null,
      };

    case Actions.MutateOne: {
      // Add the item's ID to the dirtyIndexes set, marking it as modified
      const newDirtyIndexes = new Set(state.dirtyIndexes);
      newDirtyIndexes.add(action.payload.id);

      return {
        ...state,
        dirtyIndexes: newDirtyIndexes,
      };
    }

    case Actions.WriteOne: {
      // Remove the item's ID from the dirtyIndexes set if it's a valid number
      const updatedDirtyIndexes = new Set(state.dirtyIndexes);
      if (typeof action.payload.id === "number") {
        updatedDirtyIndexes.delete(action.payload?.id);
      }

      // Update the data array with the changed item using the helper function
      const updatedData =
        state.data?.map((item) => {
          if (item.id === action.payload.id) {
            return updateItemWithChangedKeys(item, action.payload.record as T);
          }
          return item;
        }) || null;

      return {
        ...state,
        dirtyIndexes: updatedDirtyIndexes,
        data: updatedData,
      };
    }

    case Actions.CreateOne: {
      // Add the new record to the data array
      // const newData = state.data
      // ? [...state.data, action.payload.record]
      // : [action.payload.record];
      return {
        ...state,
        // data: newData,
      };
    }

    case Actions.AddOne:
      // Directly add the new item to the data array without server interaction
      return {
        ...state,
        data: state.data ? [...state.data, action.payload] : [action.payload],
      };

    case Actions.Loading:
      // Update the loading state
      return {
        ...state,
        loading: action.payload.isLoading,
      };

    case Actions.Error:
      // Update the error state with the provided message
      return {
        ...state,
        error: action.payload.message ?? "Something Went Wrong!",
      };

    default:
      // Return the current state if no matching action type is found
      return state;
  }
}
