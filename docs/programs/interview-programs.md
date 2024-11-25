
<details>
  <summary><strong>1. remove duplicates without using set</strong></summary>
    1.using foreach and includes() method.
    2.using filter to get index of each element to match with current index 


```typescript
let data = [3, 5, , 1, 1, 1, 1, 2, 3];
const filteredData = data.filter((v, i) => {
  return data.indexOf(v) === i;
});
console.log(filteredData);
const removeZero = data.filter((v) => {
  return v !== 1;
});
console.log(removeZero);
const nData = [1, 2, 2, 1, 2, 3, 1];
const z = [...new Set(nData)];
console.log(z);
```
</details>
<details>
  <summary><strong>Map to add how many ele</strong>></summary>
  
  
```typescript
  const a = new Map();
data.forEach((r) => {
  if (a.has(r)) {
    let d = a.get(r);
    a.set(r, ++d);
  } else a.set(r, 1);
});
for (let [k, o] of a) {
  console.log(k, o);
}
```

</details>
<details>
  <summary><strong>sort</strong></summary>

```typescript
const g = ['a', 'b', 'g', 'a']
g.sort();
console.log(g)

const e = [5,5,5,6,61,1,1]
e.sort();
console.log(e);
```

</details>

 
      