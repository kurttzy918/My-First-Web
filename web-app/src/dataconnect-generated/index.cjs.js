const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'myweb',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const addNewCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewCategory', inputVars);
}
addNewCategoryRef.operationName = 'AddNewCategory';
exports.addNewCategoryRef = addNewCategoryRef;

exports.addNewCategory = function addNewCategory(dcOrVars, vars) {
  return executeMutation(addNewCategoryRef(dcOrVars, vars));
};

const listAllItemsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllItems');
}
listAllItemsRef.operationName = 'ListAllItems';
exports.listAllItemsRef = listAllItemsRef;

exports.listAllItems = function listAllItems(dc) {
  return executeQuery(listAllItemsRef(dc));
};

const adjustStockQuantityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdjustStockQuantity', inputVars);
}
adjustStockQuantityRef.operationName = 'AdjustStockQuantity';
exports.adjustStockQuantityRef = adjustStockQuantityRef;

exports.adjustStockQuantity = function adjustStockQuantity(dcOrVars, vars) {
  return executeMutation(adjustStockQuantityRef(dcOrVars, vars));
};

const listMyItemsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyItems');
}
listMyItemsRef.operationName = 'ListMyItems';
exports.listMyItemsRef = listMyItemsRef;

exports.listMyItems = function listMyItems(dc) {
  return executeQuery(listMyItemsRef(dc));
};
