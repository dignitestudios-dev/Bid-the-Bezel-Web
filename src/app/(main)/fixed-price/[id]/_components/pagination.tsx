const Pagination = 
({ page, setPage, pagination }: { page: number, setPage: (page: number) => void, pagination: any }) => {
    return (
        <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-[#E3E3E3]">
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 cursor-pointer py-1 rounded-md border border-[#E3E3E3] text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F7F7F7]"
            >
                Prev
            </button>

            <span className="text-sm text-gray-500">
                {page} / {pagination?.totalPages || 1}
            </span>

            <button
                disabled={page === pagination?.totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3  cursor-pointer py-1 rounded-md border border-[#E3E3E3] text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F7F7F7]"
            >
                Next
            </button>
        </div>
    )
}
export default Pagination