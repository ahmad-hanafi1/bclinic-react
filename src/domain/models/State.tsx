export interface IModel extends Record<string, unknown> {
  id?: number;
}

export interface State<T extends IModel> {
  data: T[] | null;
  error: string | null;
  loading: boolean;
  dirtyIndexes: Set<number>;
}

export interface DumbModel extends IModel {
  name: string;
  email: string;
  phone: string;
}
