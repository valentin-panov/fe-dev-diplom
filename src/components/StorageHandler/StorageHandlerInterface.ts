export type Data = {
  limit: number;
};

export interface StorageHandlerInterface {
  set(data: Data): Promise<void>;

  get(): Promise<unknown>;
}
