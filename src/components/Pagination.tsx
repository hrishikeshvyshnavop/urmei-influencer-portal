import type { MouseEvent } from "react";
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  className?: string;
};

export default function Pagination({ page, pageCount, onChange, className = "" }: PaginationProps) {
  const selectPage = (event: MouseEvent<HTMLAnchorElement>, nextPage: number) => {
    event.preventDefault();
    if (nextPage < 1 || nextPage > pageCount || nextPage === page) return;
    onChange(nextPage);
  };

  return (
    <PaginationRoot className={`overflow-clip pt-md ${className}`}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" aria-disabled={page === 1} tabIndex={page === 1 ? -1 : undefined} className={page === 1 ? "pointer-events-none opacity-40" : undefined} onClick={(event) => selectPage(event, page - 1)} />
        </PaginationItem>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink href="#" isActive={pageNumber === page} aria-label={`Page ${pageNumber}`} onClick={(event) => selectPage(event, pageNumber)}>
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="#" aria-disabled={page === pageCount} tabIndex={page === pageCount ? -1 : undefined} className={page === pageCount ? "pointer-events-none opacity-40" : undefined} onClick={(event) => selectPage(event, page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}
