function* paginate(items, pageSize) {
  if (!Array.isArray(items)) {
    throw new Error("Items must be an array");
  }
  if (typeof pageSize !== "number" || isNaN(pageSize) || pageSize <= 0) {
    throw new Error("Page Size must be a valid positive non zero number");
  }
  for (let index = 0; index < items.length; index += pageSize) {
    yield items.slice(index, index + pageSize);
  }
}

function* filtredPaginate(items, pageSize, filterFunc) {
  if (!Array.isArray(items)) {
    throw new Error("Items must be an array");
  }
  if (typeof pageSize !== "number" || isNaN(pageSize) || pageSize <= 0) {
    throw new Error("Page Size must be a valid positive non zero number");
  }
  if (typeof filterFunc !== "function") {
    throw new Error("Filter must be a function");
  }

  const filtered = items.filter(filterFunc);
  for (let index = 0; index < filtered.length; index += pageSize) {
    yield filtered.slice(index, index + pageSize);
  }
}

const items = [1, 2, 3, 4, 5, 6, 7];
const pages = paginate(items, 3);

console.log(pages.next());
console.log(pages.next());

for (const page of paginate(items, 3)) {
  console.log(page);
}
