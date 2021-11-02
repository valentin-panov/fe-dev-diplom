export type Data = {
  experience: number;
};

export interface StorageHandlerInterface {
  set(data: Data): Promise<void>;

  get(): Promise<unknown>;
}
