"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import qs from "query-string";

type Props = {
  search: string;
};

export default function SearchInput({}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const [value, setValue] = useState(search || "");
  const debouncedValue = useDebounce<string>(value, 100);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    console.log("value", value);

    const query = {
      search: debouncedValue,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [debouncedValue, router, value]);

  return (
    <div className="relative">
      <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
      <Input
        onChange={handleChange}
        placeholder="Search ..."
        className="pl-10 bg-primary/10"
        value={value}
      />
    </div>
  );
}
