const path = require('path');
const { PactV3, MatchersV3 } = require('@pact-foundation/pact');
const { getOrderForCheckout } = require('../src/ordersClient');

const { like, eachLike } = MatchersV3;

const CONSUMER = 'checkout-service';
const PROVIDER = 'orders-api';

describe('Checkout Service ↔ Orders API', () => {
  const provider = new PactV3({
    consumer: CONSUMER,
    provider: PROVIDER,
    port: 1234,
    dir: path.resolve(__dirname, '../pacts'),
    logLevel: 'warn',
  });

  it('gets order details for checkout', () =>
    provider
      .given('an order with id 1 exists')
      .uponReceiving('a request for order details for checkout')
      .withRequest({
        method: 'GET',
        path: '/orders/1',
        headers: { Accept: 'application/json' },
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: {
          id: like(1),
          status: like('pending'),
          total: like(99.99),
          currency: like('EUR'),
          items: eachLike({
            sku: like('BOOK-001'),
            name: like('Contract Testing Guide'),
            quantity: like(1),
            price: like(99.99),
          }),
          propForCheckoutService: like('Property only for checkout service'),
        },
      })
      .executeTest(async (mockServer) => {
        const order = await getOrderForCheckout(1, mockServer.url);

        expect(order.id).toBe(1);
        expect(order.status).toBe('pending');
        expect(order.total).toBe(99.99);
        expect(order.currency).toBe('EUR');
        expect(order.items).toHaveLength(1);
        expect(order.items[0].sku).toBe('BOOK-001');
        expect(order.propForCheckoutService).toBe('Property only for checkout service');
      }));
});
