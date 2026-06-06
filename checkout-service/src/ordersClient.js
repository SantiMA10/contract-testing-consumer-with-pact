async function getOrderForCheckout(orderId, baseUrl) {
  const response = await fetch(`${baseUrl}/orders/${orderId}`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch order ${orderId}: ${response.status}`);
  }

  const order = await response.json();

  return {
    id: order.id,
    status: order.status,
    total: order.total,
    currency: order.currency,
    items: order.items,
    propForCheckoutService: order.propForCheckoutService,
  };
}

module.exports = { getOrderForCheckout };
