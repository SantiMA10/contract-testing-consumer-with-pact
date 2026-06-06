# orders-api

API REST proveedor para la PoC de Consumer Driven Contract Testing.

## Endpoints

- `GET /health` — health check
- `GET /orders/:id` — obtener pedido
- `POST /setup` — provider states para verificación Pact

## Comandos

```bash
npm install
npm start          # levantar API en :3000
npm run test:pact  # usa PACT_USE_BROKER del .env en la raíz del repo
```

Documentación completa: [../docs/consumer-driven-testing.md](../docs/consumer-driven-testing.md)
