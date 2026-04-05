import { useQuery } from "@tanstack/react-query";
import { getReservations } from "@/domains/reservations/apis";

const QUERY_KEY = (date: string) => ["reservations", date];

export default function useReservations(date: string) {
  return useQuery({
    queryKey: QUERY_KEY(date),
    queryFn: () => getReservations(date),
  });
}

useReservations.getQueryKeys = (date: string) => {
  return QUERY_KEY(date);
};
