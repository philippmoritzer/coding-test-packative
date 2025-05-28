function PaginationNav({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {  
  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      end = Math.min(5, totalPages);
    }
    if (currentPage >= totalPages - 2) {
      start = Math.max(1, totalPages - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav className="flex justify-center my-6 gap-2 items-center">
      <button
        className="px-3 py-1 rounded bg-blue-100 text-blue-700 disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </button>
      {getPageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`px-3 py-1 rounded ${
            pageNum === currentPage
              ? "bg-blue-600 text-white font-bold"
              : "bg-blue-50 text-blue-700 hover:bg-blue-200"
          }`}
          disabled={pageNum === currentPage}
        >
          {pageNum}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded bg-blue-100 text-blue-700 disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </nav>
  );
}
export default PaginationNav;