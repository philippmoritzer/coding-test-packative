import { useRouter, useSearchParams } from "next/navigation";

export function usePaginationParams(defaultPage = 1) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || `${defaultPage}`, 10);

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return { page, setPage, searchParams };
}
