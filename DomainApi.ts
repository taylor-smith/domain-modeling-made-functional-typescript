// Input data

export type OrderId = string;

export type UnvalidatedOrder = {
  orderId: OrderId;
  customerInfo: UnvalidatedCustomer;
  shippingAddress: UnvalidatedAddress;
};

export type UnvalidatedCustomer = {
  firstName: string;
  lastName: string;
  emailAddress: string;
};

export type Customer = {};

export type PersonalName = {
  firstName: string;
  lastName: string;
};

export type UnvalidatedAddress = {
  street1: string;
  street2: string;
  city: string;
  state: string;
  zipcode: string;
};

// Input command
type Command<T> = {
  data: T;
  timestamp: Date;
  userId: string;
};

type PlaceOrderCommand = Command<UnvalidatedOrder>;

// Public API

type OrderPlaced = {};

type BillableOrderPlaced = {};

type OrderAcknowledgmentSent = {};

type PlaceOrderEvent = // maybe use discriminated unions, kind and value
  OrderPlaced | BillableOrderPlaced | OrderAcknowledgmentSent;

type PlaceOrderError = {};

type PlaceOrderWorkflow = (
  PlaceOrderCommand
) => Promise<PlaceOrderEvent[] | PlaceOrderError>;
