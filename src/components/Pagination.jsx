"use client";

export default function Pagination({
  page,
  setPage,
  totalPages,
}) {
  if (totalPages <= 1) return null;

  const maxVisible = 3;

  const getVisiblePages = () => {
    let start = Math.max(1, page - 1);
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center gap-2 sm:gap-3 mt-10 sm:mt-16 flex-wrap px-2">

      {/* PREV */}
      <button
        onClick={() => {
          setPage(page - 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={page === 1}
        className="px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl 
        text-sm sm:text-base
        border border-[#9E1C60]/30 text-[#9E1C60] 
        disabled:opacity-40
        hover:bg-[#fff1f6] active:scale-95
        transition"
      >
        Prev
      </button>

      {/* FIRST PAGE */}
      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => setPage(1)}
            className="px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl 
            text-sm sm:text-base
            border border-[#9E1C60]/30 text-[#9E1C60] 
            hover:bg-[#fff1f6] transition"
          >
            1
          </button>

          {visiblePages[0] > 2 && (
            <span className="px-1 text-gray-400 text-sm">...</span>
          )}
        </>
      )}

      {/* VISIBLE PAGES */}
      {visiblePages.map((p) => (
        <button
          key={p}
          onClick={() => {
            setPage(p);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl 
          text-sm sm:text-base font-medium transition
          ${
            page === p
              ? "bg-gradient-to-r from-[#9E1C60] to-[#ff4da6] text-white shadow-md"
              : "border border-[#9E1C60]/30 text-[#9E1C60] hover:bg-[#fff1f6]"
          }`}
        >
          {p}
        </button>
      ))}

      {/* LAST PAGE */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-1 text-gray-400 text-sm">...</span>
          )}

          <button
            onClick={() => setPage(totalPages)}
            className="px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl 
            text-sm sm:text-base
            border border-[#9E1C60]/30 text-[#9E1C60] 
            hover:bg-[#fff1f6] transition"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* NEXT */}
      <button
        onClick={() => {
          setPage(page + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={page === totalPages}
        className="px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl 
        text-sm sm:text-base
        border border-[#9E1C60]/30 text-[#9E1C60] 
        disabled:opacity-40
        hover:bg-[#fff1f6] active:scale-95
        transition"
      >
        Next
      </button>
    </div>
  );
}