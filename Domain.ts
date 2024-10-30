import {
  Customer,
  PersonalName,
  UnvalidatedAddress,
  UnvalidatedCustomer,
  UnvalidatedOrder,
} from './DomainApi';

const pipe = <T, R>(value: T, fn: (arg: T) => R): R => fn(value); // move into utils

namespace Domain {
  export class OrderId {
    private constructor(private readonly value: string) {}

    public static create(value: string): OrderId | null {
      if (OrderId.isValid(value)) {
        return new OrderId(value);
      }
      return null;
    }

    private static isValid(value: string): boolean {
      return value.length > 0;
    }

    public getValue(): string {
      return this.value;
    }
  }

  const validateOrder: ValidateOrder =
    (checkProductCodeExists) =>
    (checkAddressExists) =>
    (unvalidatedOrder: UnvalidatedOrder) => {
      let orderId = pipe(unvalidatedOrder.orderId, OrderId.create);

      let customerInfo = pipe(unvalidatedOrder.customerInfo, toCustomerInfo);

      let shippingAddress = pipe(unvalidatedOrder.shippingAddress, toAddress);

      let billingAddress = pipe(unvalidatedOrder, toAddress);

      return {
        orderId,
        customerInfo,
        shippingAddress,
        billingAddress,
        orderLines,
      };
    };

  const toCustomer = (customer: UnvalidatedCustomer): Customer => {
    const firstName = customer.firstName || '';
    const lastName = customer.lastName || '';
    const emailAddress = customer.emailAddress || '';

    // create a PersonalName
    const name: PersonalName = {
      firstName,
      lastName,
    };

    // create a CustomerInfo
    const customerInfo: CustomerInfo = {
      name,
      emailAddress,
    };

    return customerInfo;
  };

  const toAddress =
    (checkAddressExists: CheckAddressExists) =>
    (unvalidatedAddress: UnvalidatedAddress) => {
      // call the "remote service"
      const checkedAddress = checkAddressExists(unvalidatedAddress);

      let street1 = checkedAddress.street1;
    };
}
