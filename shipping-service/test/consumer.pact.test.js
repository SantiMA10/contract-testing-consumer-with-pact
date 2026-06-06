const path = require('path');
const { PactV3, MatchersV3 } = require('@pact-foundation/pact');
const { getOrderForShipping } = require('../src/ordersClient');

const { like } = MatchersV3;

const CONSUMER = 'shipping-service';
const PROVIDER = 'orders-api';

describe('Shipping Service ↔ Orders API', () => {
  const provider = new PactV3({
    consumer: CONSUMER,
    provider: PROVIDER,
    port: 1235,
    dir: path.resolve(__dirname, '../pacts'),
    logLevel: 'warn',
  });

  it('gets minimal order details for shipping', () =>
    provider
      .given('an order with id 1 exists')
      .uponReceiving('a request for order shipping details')
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
          shippingAddress: like({
            street: 'Calle Mayor 1',
            city: 'Madrid',
            postalCode: '28001',
            country: 'ES',
          }),
          propForShippingService: like('Property only for shipping service'),
        },
      })
      .executeTest(async (mockServer) => {
        const order = await getOrderForShipping(1, mockServer.url);

        expect(order.id).toBe(1);
        expect(order.status).toBe('pending');
        expect(order.shippingAddress.city).toBe('Madrid');
        expect(order.shippingAddress.country).toBe('ES');
        expect(order.propForShippingService).toBe('Property only for shipping service');
      }));
});
