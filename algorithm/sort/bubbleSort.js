// 冒泡排序
function bubbleSort(nums) {
  if (!nums || nums.length < 2) {
    return;
  }
  for (let i = nums.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (nums[j] > nums[j + 1]) {
        swap(nums, j, j + 1);
      }
    }
  }
  return nums;
}

function swap(nums, i, j) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}


const arr = [9, 3, 2, 1, 3, 4, 55, 23, 12, 444, 2, 21, 666, -1, -872, 0.342, 23, 4]
console.log(bubbleSort(arr));
console.log(arr.sort((a, b) => a - b));
