import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'myweb',
  location: 'us-east4'
};

export const addNewCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewCategory', inputVars);
}
addNewCategoryRef.operationName = 'AddNewCategory';

export function addNewCategory(dcOrVars, vars) {
  return executeMutation(addNewCategoryRef(dcOrVars, vars));
}

export const listAllItemsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllItems');
}
listAllItemsRef.operationName = 'ListAllItems';

export function listAllItems(dc) {
  return executeQuery(listAllItemsRef(dc));
}

export const adjustStockQuantityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdjustStockQuantity', inputVars);
}
adjustStockQuantityRef.operationName = 'AdjustStockQuantity';

export function adjustStockQuantity(dcOrVars, vars) {
  return executeMutation(adjustStockQuantityRef(dcOrVars, vars));
}

export const listMyItemsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyItems');
}
listMyItemsRef.operationName = 'ListMyItems';

export function listMyItems(dc) {
  return executeQuery(listMyItemsRef(dc));
}

