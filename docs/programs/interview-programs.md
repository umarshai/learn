
<details>
  <summary><strong>1. remove duplicates without using set</strong></summary>
    1.using foreach and includes() method.
    2.using filter to get index of each element to match with current index 
    3.Remove duplicates in without using predefine methods

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

// Create an Array
const points = [40, 100, 1, 5, 25, 10];

// Sort the Array
points.sort(function(a, b){return a-b});
```

</details>

 
 <details><summary>stirng: convert each word first letter to capital form a sentence</summary>

  ```typescript
   
string1 = 'tets hdsfhjsgfhgds'
let stringe = string1.split(' ').map(v => v[0].toUpperCase()+v.slice(0)).join(' ');
console.log(stringe)
  ```
 </details>
 <details><summary>flat an array</summary>

    ```typescript
    const arr =[1,3,4,[3,4,5,[4,6,3]]];
    const arr2 = [];

    // using flat
      //  arr2 = arr.flat(3);

    // not using pre-defined
      function flatArray(data){
        for(var i=0;i<data.length;i++){
          if(Array.isArray(data[i])){
            flatArray(data[i])
          } else {
            arr2.push(data[i]);
          }
        }
      }
      flatArray(arr);
      console.log(arr2);
    ```
 <details>


      