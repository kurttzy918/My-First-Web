# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListAllItems*](#listallitems)
  - [*ListMyItems*](#listmyitems)
- [**Mutations**](#mutations)
  - [*AddNewCategory*](#addnewcategory)
  - [*AdjustStockQuantity*](#adjuststockquantity)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListAllItems
You can execute the `ListAllItems` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllItems(): QueryPromise<ListAllItemsData, undefined>;

interface ListAllItemsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllItemsData, undefined>;
}
export const listAllItemsRef: ListAllItemsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllItems(dc: DataConnect): QueryPromise<ListAllItemsData, undefined>;

interface ListAllItemsRef {
  ...
  (dc: DataConnect): QueryRef<ListAllItemsData, undefined>;
}
export const listAllItemsRef: ListAllItemsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllItemsRef:
```typescript
const name = listAllItemsRef.operationName;
console.log(name);
```

### Variables
The `ListAllItems` query has no variables.
### Return Type
Recall that executing the `ListAllItems` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllItemsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAllItems`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllItems } from '@dataconnect/generated';


// Call the `listAllItems()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllItems();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllItems(dataConnect);

console.log(data.items);

// Or, you can use the `Promise` API.
listAllItems().then((response) => {
  const data = response.data;
  console.log(data.items);
});
```

### Using `ListAllItems`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllItemsRef } from '@dataconnect/generated';


// Call the `listAllItemsRef()` function to get a reference to the query.
const ref = listAllItemsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllItemsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.items);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.items);
});
```

## ListMyItems
You can execute the `ListMyItems` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyItems(): QueryPromise<ListMyItemsData, undefined>;

interface ListMyItemsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyItemsData, undefined>;
}
export const listMyItemsRef: ListMyItemsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyItems(dc: DataConnect): QueryPromise<ListMyItemsData, undefined>;

interface ListMyItemsRef {
  ...
  (dc: DataConnect): QueryRef<ListMyItemsData, undefined>;
}
export const listMyItemsRef: ListMyItemsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyItemsRef:
```typescript
const name = listMyItemsRef.operationName;
console.log(name);
```

### Variables
The `ListMyItems` query has no variables.
### Return Type
Recall that executing the `ListMyItems` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyItemsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyItemsData {
  items: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    price?: number | null;
    stockQuantity: number;
  } & Item_Key)[];
}
```
### Using `ListMyItems`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyItems } from '@dataconnect/generated';


// Call the `listMyItems()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyItems();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyItems(dataConnect);

console.log(data.items);

// Or, you can use the `Promise` API.
listMyItems().then((response) => {
  const data = response.data;
  console.log(data.items);
});
```

### Using `ListMyItems`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyItemsRef } from '@dataconnect/generated';


// Call the `listMyItemsRef()` function to get a reference to the query.
const ref = listMyItemsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyItemsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.items);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.items);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## AddNewCategory
You can execute the `AddNewCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addNewCategory(vars: AddNewCategoryVariables): MutationPromise<AddNewCategoryData, AddNewCategoryVariables>;

interface AddNewCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddNewCategoryVariables): MutationRef<AddNewCategoryData, AddNewCategoryVariables>;
}
export const addNewCategoryRef: AddNewCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addNewCategory(dc: DataConnect, vars: AddNewCategoryVariables): MutationPromise<AddNewCategoryData, AddNewCategoryVariables>;

interface AddNewCategoryRef {
  ...
  (dc: DataConnect, vars: AddNewCategoryVariables): MutationRef<AddNewCategoryData, AddNewCategoryVariables>;
}
export const addNewCategoryRef: AddNewCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addNewCategoryRef:
```typescript
const name = addNewCategoryRef.operationName;
console.log(name);
```

### Variables
The `AddNewCategory` mutation requires an argument of type `AddNewCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddNewCategoryVariables {
  name: string;
  description?: string | null;
}
```
### Return Type
Recall that executing the `AddNewCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddNewCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddNewCategoryData {
  category_insert: Category_Key;
}
```
### Using `AddNewCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addNewCategory, AddNewCategoryVariables } from '@dataconnect/generated';

// The `AddNewCategory` mutation requires an argument of type `AddNewCategoryVariables`:
const addNewCategoryVars: AddNewCategoryVariables = {
  name: ..., 
  description: ..., // optional
};

// Call the `addNewCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addNewCategory(addNewCategoryVars);
// Variables can be defined inline as well.
const { data } = await addNewCategory({ name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addNewCategory(dataConnect, addNewCategoryVars);

console.log(data.category_insert);

// Or, you can use the `Promise` API.
addNewCategory(addNewCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.category_insert);
});
```

### Using `AddNewCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addNewCategoryRef, AddNewCategoryVariables } from '@dataconnect/generated';

// The `AddNewCategory` mutation requires an argument of type `AddNewCategoryVariables`:
const addNewCategoryVars: AddNewCategoryVariables = {
  name: ..., 
  description: ..., // optional
};

// Call the `addNewCategoryRef()` function to get a reference to the mutation.
const ref = addNewCategoryRef(addNewCategoryVars);
// Variables can be defined inline as well.
const ref = addNewCategoryRef({ name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addNewCategoryRef(dataConnect, addNewCategoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.category_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.category_insert);
});
```

## AdjustStockQuantity
You can execute the `AdjustStockQuantity` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adjustStockQuantity(vars: AdjustStockQuantityVariables): MutationPromise<AdjustStockQuantityData, AdjustStockQuantityVariables>;

interface AdjustStockQuantityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdjustStockQuantityVariables): MutationRef<AdjustStockQuantityData, AdjustStockQuantityVariables>;
}
export const adjustStockQuantityRef: AdjustStockQuantityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adjustStockQuantity(dc: DataConnect, vars: AdjustStockQuantityVariables): MutationPromise<AdjustStockQuantityData, AdjustStockQuantityVariables>;

interface AdjustStockQuantityRef {
  ...
  (dc: DataConnect, vars: AdjustStockQuantityVariables): MutationRef<AdjustStockQuantityData, AdjustStockQuantityVariables>;
}
export const adjustStockQuantityRef: AdjustStockQuantityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adjustStockQuantityRef:
```typescript
const name = adjustStockQuantityRef.operationName;
console.log(name);
```

### Variables
The `AdjustStockQuantity` mutation requires an argument of type `AdjustStockQuantityVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdjustStockQuantityVariables {
  id: UUIDString;
  quantityChange: number;
  movementType: string;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `AdjustStockQuantity` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdjustStockQuantityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdjustStockQuantityData {
  stockMovement_insert: StockMovement_Key;
}
```
### Using `AdjustStockQuantity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adjustStockQuantity, AdjustStockQuantityVariables } from '@dataconnect/generated';

// The `AdjustStockQuantity` mutation requires an argument of type `AdjustStockQuantityVariables`:
const adjustStockQuantityVars: AdjustStockQuantityVariables = {
  id: ..., 
  quantityChange: ..., 
  movementType: ..., 
  notes: ..., // optional
};

// Call the `adjustStockQuantity()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adjustStockQuantity(adjustStockQuantityVars);
// Variables can be defined inline as well.
const { data } = await adjustStockQuantity({ id: ..., quantityChange: ..., movementType: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adjustStockQuantity(dataConnect, adjustStockQuantityVars);

console.log(data.stockMovement_insert);

// Or, you can use the `Promise` API.
adjustStockQuantity(adjustStockQuantityVars).then((response) => {
  const data = response.data;
  console.log(data.stockMovement_insert);
});
```

### Using `AdjustStockQuantity`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adjustStockQuantityRef, AdjustStockQuantityVariables } from '@dataconnect/generated';

// The `AdjustStockQuantity` mutation requires an argument of type `AdjustStockQuantityVariables`:
const adjustStockQuantityVars: AdjustStockQuantityVariables = {
  id: ..., 
  quantityChange: ..., 
  movementType: ..., 
  notes: ..., // optional
};

// Call the `adjustStockQuantityRef()` function to get a reference to the mutation.
const ref = adjustStockQuantityRef(adjustStockQuantityVars);
// Variables can be defined inline as well.
const ref = adjustStockQuantityRef({ id: ..., quantityChange: ..., movementType: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adjustStockQuantityRef(dataConnect, adjustStockQuantityVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.stockMovement_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.stockMovement_insert);
});
```

