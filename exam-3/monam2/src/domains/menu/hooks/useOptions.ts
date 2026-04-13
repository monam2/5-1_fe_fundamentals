import { useSuspenseQuery } from "@tanstack/react-query";

import { getOptions } from "@/domains/menu/apis";

const QUERY_KEY = ["catalog", "options"] as const;

export default function useOptions() {
  return useSuspenseQuery({
    queryKey: QUERY_KEY,
    queryFn: getOptions,
    select: (data) => data.options,
  });
}

useOptions.getQueryKeys = () => QUERY_KEY;
