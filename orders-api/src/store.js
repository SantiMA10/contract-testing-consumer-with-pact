const SAMPLE_ORDER = {
  id: 1,
  status: 'pending',
  total: 99.99,
  currency: 'EUR',
  items: [
    { sku: 'BOOK-001', name: 'Contract Testing Guide', quantity: 1, price: 99.99 },
  ],
  shippingAddress: {
    street: 'Calle Mayor 1',
    city: 'Madrid',
    postalCode: '28001',
    country: 'ES',
  },
  propNotUsed: 'Property not used by any service',
  propForCheckoutService: 'Property only for checkout service',
  propForShippingService: 'Property only for shipping service',
};

let orders = new Map();

function reset() {
  orders = new Map();
}

function seedOrder(order = SAMPLE_ORDER) {
  orders.set(order.id, { ...order });
}

function removeOrder(id) {
  orders.delete(id);
}

function getOrder(id) {
  return orders.get(id) ?? null;
}

function getAllOrders() {
  return Array.from(orders.values());
}

module.exports = {
  SAMPLE_ORDER,
  reset,
  seedOrder,
  removeOrder,
  getOrder,
  getAllOrders,
};
/*
propForShippingService: 'Property only for shipping service',
propForCheckoutService: 'Property only for checkout service',
propNotUsed: 'Property not used by any service',
*/