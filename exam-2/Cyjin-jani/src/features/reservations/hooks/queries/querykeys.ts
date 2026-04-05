export const reservationsQueryKeys = {
  byDate: (date: string) => ['reservations', date] as const,
};
