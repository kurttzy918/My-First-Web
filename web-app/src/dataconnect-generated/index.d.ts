import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddNewCategoryData {
  category_insert: Category_Key;
}

export interface AddNewCategoryVariables {
  name: string;
  description?: string | null;
}

export interface AdjustStockQuantityData {
  stockMovement_insert: StockMovement_Key;
}

export interface AdjustStockQuantityVariables {
  id: UUIDString;
  quantityChange: number;
  movementType: string;
  notes?: string | null;
}

export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface Item_Key {
  id: UUIDString;
  __typename?: 'Item_Key';
}

export interface ListAllItemsData {
  items: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    price?: number | null;
    stockQuantity: number;
    category?: {
      id: UUIDString;
      name: string;
    } & Category_Key;
      owner?: {
        id: UUIDString;
        displayName: string;
      } & User_Key;
  } & Item_Key)[];
}

export interface ListMyItemsData {
  items: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    price?: number | null;
    stockQuantity: number;
  } & Item_Key)[];
}

export interface StockMovement_Key {
  id: UUIDString;
  __typename?: 'StockMovement_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface AddNewCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddNewCategoryVariables): MutationRef<AddNewCategoryData, AddNewCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddNewCategoryVariables): MutationRef<AddNewCategoryData, AddNewCategoryVariables>;
  operationName: string;
}
export const addNewCategoryRef: AddNewCategoryRef;

export function addNewCategory(vars: AddNewCategoryVariables): MutationPromise<AddNewCategoryData, AddNewCategoryVariables>;
export function addNewCategory(dc: DataConnect, vars: AddNewCategoryVariables): MutationPromise<AddNewCategoryData, AddNewCategoryVariables>;

interface ListAllItemsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllItemsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllItemsData, undefined>;
  operationName: string;
}
export const listAllItemsRef: ListAllItemsRef;

export function listAllItems(): QueryPromise<ListAllItemsData, undefined>;
export function listAllItems(dc: DataConnect): QueryPromise<ListAllItemsData, undefined>;

interface AdjustStockQuantityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdjustStockQuantityVariables): MutationRef<AdjustStockQuantityData, AdjustStockQuantityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdjustStockQuantityVariables): MutationRef<AdjustStockQuantityData, AdjustStockQuantityVariables>;
  operationName: string;
}
export const adjustStockQuantityRef: AdjustStockQuantityRef;

export function adjustStockQuantity(vars: AdjustStockQuantityVariables): MutationPromise<AdjustStockQuantityData, AdjustStockQuantityVariables>;
export function adjustStockQuantity(dc: DataConnect, vars: AdjustStockQuantityVariables): MutationPromise<AdjustStockQuantityData, AdjustStockQuantityVariables>;

interface ListMyItemsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyItemsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyItemsData, undefined>;
  operationName: string;
}
export const listMyItemsRef: ListMyItemsRef;

export function listMyItems(): QueryPromise<ListMyItemsData, undefined>;
export function listMyItems(dc: DataConnect): QueryPromise<ListMyItemsData, undefined>;

