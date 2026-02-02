import { AddNewCategoryData, AddNewCategoryVariables, ListAllItemsData, AdjustStockQuantityData, AdjustStockQuantityVariables, ListMyItemsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useAddNewCategory(options?: useDataConnectMutationOptions<AddNewCategoryData, FirebaseError, AddNewCategoryVariables>): UseDataConnectMutationResult<AddNewCategoryData, AddNewCategoryVariables>;
export function useAddNewCategory(dc: DataConnect, options?: useDataConnectMutationOptions<AddNewCategoryData, FirebaseError, AddNewCategoryVariables>): UseDataConnectMutationResult<AddNewCategoryData, AddNewCategoryVariables>;

export function useListAllItems(options?: useDataConnectQueryOptions<ListAllItemsData>): UseDataConnectQueryResult<ListAllItemsData, undefined>;
export function useListAllItems(dc: DataConnect, options?: useDataConnectQueryOptions<ListAllItemsData>): UseDataConnectQueryResult<ListAllItemsData, undefined>;

export function useAdjustStockQuantity(options?: useDataConnectMutationOptions<AdjustStockQuantityData, FirebaseError, AdjustStockQuantityVariables>): UseDataConnectMutationResult<AdjustStockQuantityData, AdjustStockQuantityVariables>;
export function useAdjustStockQuantity(dc: DataConnect, options?: useDataConnectMutationOptions<AdjustStockQuantityData, FirebaseError, AdjustStockQuantityVariables>): UseDataConnectMutationResult<AdjustStockQuantityData, AdjustStockQuantityVariables>;

export function useListMyItems(options?: useDataConnectQueryOptions<ListMyItemsData>): UseDataConnectQueryResult<ListMyItemsData, undefined>;
export function useListMyItems(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyItemsData>): UseDataConnectQueryResult<ListMyItemsData, undefined>;
