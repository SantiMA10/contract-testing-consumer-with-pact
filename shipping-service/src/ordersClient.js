async function getOrderForShipping(orderId, baseUrl) {
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
    shippingAddress: order.shippingAddress,
    propForShippingService: order.propForShippingService,
  };
}

module.exports = { getOrderForShipping };
