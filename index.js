console.log(1);

/**
 * 1.同步
 * 1
 * 7
 * 13
 * 
 * 2.微
 * 5  [6]
 * 8  [9]
 * 
 * 3.第一个宏
 * 2  {14}
 * 3  [4]
 * 11 [12]
 * 
 * 4.第二个宏
 * 14  [16]
 * 15
 */

setTimeout(() => {
  console.log(2);
  setTimeout(() => {
    console.log(14);
    new Promise((resolve, reject) => {
      console.log(15);
      resolve()
    }).then(res => {
      console.log(16);
    })
  })
  new Promise((resolve, reject) => {
    console.log(3);
    resolve()
  }).then(res => {
    console.log(4);
  })
})

new Promise((resolve, reject) => {
  resolve()
}).then(res => {
  console.log(5);
}).then(res => {
  console.log(6);  // 5 -> 放微任务 -> 6
})

new Promise((resolve, reject) => {
  console.log(7);
  resolve()
}).then(res => {
  console.log(8);
}).then(res => {
  console.log(9);  // 放
})

setTimeout(() => {
  console.log(10);
  new Promise((resolve, reject) => {
    console.log(11);
    resolve()
  }).then(res => {
    console.log(12);
  })
})

console.log(13);

