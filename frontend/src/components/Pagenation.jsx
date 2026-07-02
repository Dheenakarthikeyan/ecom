// src/components/Pagination.jsx
import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const getPages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <div className="flex items-center bg-white rounded-full shadow-md px-2 py-2 gap-2">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="w-10 h-10 rounded-full hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronsLeft size={18} />
        </button>

        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 rounded-full hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        {getPages().map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 rounded-full font-medium transition ${
              currentPage === page
                ? "bg-blue-600 text-white shadow"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 rounded-full hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>

        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 rounded-full hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronsRight size={18} />
        </button>
      </div>

      <p className="text-xs text-gray-500 uppercase tracking-wider">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default Pagination;