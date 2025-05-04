export enum Actions {
  /** Gets all items or records from the server*/
  GetAll,

  /** Reads all items or records from the server*/
  ReadAll,

  /** Deletes a single item or record in the server*/
  DeleteOne,

  /** Changes or updates a single item or record locally*/
  MutateOne,

  /** Writes or saves a single item or record in the server*/
  WriteOne,

  /** Creates a new item or record in the server*/
  CreateOne,

  /** Adds a new item or record locally to the list */
  AddOne,

  /** Data is loading */
  Loading,

  /** Error happened */
  Error,
}
