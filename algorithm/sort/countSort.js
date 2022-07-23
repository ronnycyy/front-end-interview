// 计数排序
function countSort(nums) {
  if (nums == null || nums.length < 2) {
    return nums;
  }
  // 仅适用于非负数
  // 要适用于负数，只要数组全部减个最小值，排完序再全部加上最小值即可。

  // 找到最大值，建桶
  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < nums.length; i++) {
    max = Math.max(max, nums[i]);
  }
  // 用桶统计词频
  const bucket = new Uint32Array(max + 1);
  for (let i = nums.length - 1; i >= 0; i--) {
    bucket[nums[i]]++;
  }
  let i = 0;
  // 桶里面有数的话，依次倒出来
  for (let j = 0, len = bucket.length; j < len; j++) {
    while (bucket[j]-- > 0) {
      nums[i++] = j;
    }
  }
  return nums;
}
