// 选择排序
function selectionSort(arr) {
  if (!nums || nums.length < 2) {
    return;
  }
  for (let i = 0, len = arr.length; i < len; i++) {
    let min = arr[i];  // 每次初始最小值都是第一个位置
    for (let j = i + 1; j < len; j++) {   // i位置是默认最小值不用比较，从i+1开始比。
      if (arr[j] < min) {
        min = arr[j];   // 更新本次选择最小值，供内层循环判断
        swap(arr, j, i);
      }
    }
  }
  return arr;
}
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const arr = [9, 3, 2, 1, 3, 4, 55, 23, 12, 444, 2, 21, 666, -1, -872, 0.342, 23, 4]
console.log(selectionSort(arr));
console.log(arr.sort((a, b) => a - b));

