// 插入排序
function insertSort(nums) {
  if (!nums || nums.length < 2) {
    return;
  }
  for (let i = 1, len = nums.length; i < len; i++) {
    for (let j = i; j > 0; j--) {
      if (nums[j] < nums[j-1]) {
        swap(nums, j, j-1);
      }
    }
  }
}