export const routes = {
  home: "/",
  cart: "/cart",
  menuItem: (itemId: string) => `/menu/${itemId}`,
  orders: (orderId: string) => `/orders/${orderId}`,
} as const;
