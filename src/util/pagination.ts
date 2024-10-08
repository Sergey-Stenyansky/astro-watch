export function calculatePagination(page: number, perPage: number, count: number) {
  const lastIndex = page * perPage;
  const firstIndex = lastIndex - perPage + 1;
  return {
    firstIndex,
    lastIndex: Math.min(lastIndex, count),
  };
}

export function calculateTotalPages(total: number, perPage: number) {
  return total === 0 ? 0 : Math.ceil(total / perPage);
}

export function paginate(items: any[], page: number, perPage: number) {
  const pagination = calculatePagination(page, perPage, items.length);
  const totalPages = calculateTotalPages(items.length, perPage);
  const paginatedItems = items.slice(pagination.firstIndex - 1, pagination.lastIndex);
  return { items: paginatedItems, totalPages };
}
