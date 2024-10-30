// Order life cycle

// Validated state
type ValidatedOrderLine = {};
type ValidatedOrder = {
  orderId: OrderID;
  customerInfo: CustomerInfo;
  shippingAddress: Address;
  billingAddress: Address;
  orderLines: ValidatedOrderLine[];
};

type OrderID = any;
type CustomerInfo = {};
type Address = {};

// Priced state
type PricedOrderLine = {};
type PricedOrder = {};

type ProductCode = string;

// All states combined
type Order = UnvalidatedOrder | ValidatedOrder | PricedOrder;

// Definitions of internal steps

// Validate Order

// services used by ValidateOrder

type CheckProductExists = (productCode: ProductCode) => boolean;

type AddressValidationError = {};

type CheckedAddress = {};

type CheckAddressExists = (address: UnvalidatedAddress) => CheckedAddress;

type ValidateOrder = (
  checkProductExists: CheckProductExists
) => (
  checkAddressExists: CheckAddressExists
) => (unvalidatedOrder: UnvalidatedOrder) => ValidatedOrder;

type ValidationError = {};

type GetProductPrice = (productCode: ProductCode) => Price;

type PricingError = {};

type PriceOrder = (
  getProductPrice: GetProductPrice
) => (validatedOrder: ValidatedOrder) => Result<PricedOrder, PricingError>;

type Result = Success | Failure;

type Success = any;
type Failure = any;
