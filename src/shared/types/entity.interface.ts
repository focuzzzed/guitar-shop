export type EntityIdType = string;
export type DefaultSerializedType = Record<string, unknown>;

export interface Entity<
  T extends EntityIdType,
  SerializedType = DefaultSerializedType
> {
  id?: T;
  serialize(): SerializedType;
}