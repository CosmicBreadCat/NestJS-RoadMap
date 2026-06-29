### Pagination Function

Example input:

```js
const items = [1, 2, 3, 4, 5, 6, 7];
const pages = paginate(items, 3);

console.log(pages.next());
console.log(pages.next());

for (const page of paginate(items, 3)) {
  console.log(page);
}
```

Example Output:

```json
{ value: [ 1, 2, 3 ], done: false }
{ value: [ 4, 5, 6 ], done: false }
[ 1, 2, 3 ]
[ 4, 5, 6 ]
[ 7 ]
```

---

#### Notes:

- Did the bonus part, made a filteredPageinate which runs a filter function on the items first before pagination
