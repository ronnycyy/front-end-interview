function quickSort(nums) {
  if (!nums || nums.length < 2) {
    return nums;
  }
  return proc(nums, 0, nums.length - 1);
}

// 递归含义: 将 nums 的 [L,R] 排好序。
function proc(nums, L, R) {
  if (L >= R) {
    return;
  }
  // 在[L,R]上，随机选一个位置，和 R 位置交换
  swap(nums, L + Math.floor(Math.random() * (R - L + 1)), R);
  // 荷兰国旗排好`等于区域`，分出`小于`和`大于`区域
  const equals = nerthLand(nums, L, R);
  // 小于区域递归
  proc(nums, L, equals[0] - 1);
  // 大于区域递归
  proc(nums, equals[1] + 1, R);
  // 返回排好序的数组
  return nums;
}

// 在arr的[L,R]上，以arr[R]为划分值，将 <arr[R] 的放在左边，===arr[R]的放中间，>arr[R]的放右边
function nerthLand(nums, L, R) {

  // 处理一些特殊情况，加速返回，没什么坏处。
  if (L > R) {
    return [-1, -1];
  }
  if (L === R) {
    return [L, R];
  }

  // 以 arr[R]作划分值
  const target = nums[R];
  let less = L - 1;   // 小于区域一开始啥也没有
  let more = R;   // 大于区域一开始啥也没有
  let cur = L;  // 从第一个位置开始遍历, O(N)

  while (cur < more) {
    if (nums[cur] < target) {
      // 当前值小于目标，当前值和小于区域下一个值交换，小于区域往右动，当前指针往右动
      swap(nums, cur++, ++less);
    }
    else if (nums[cur] > target) {
      // 当前值大于目标，当前值和大于区域前一个值交换，大于区域往左动，当前指针不动(换过来的数还没检查)
      swap(nums, cur, --more);
    }
    else {
      // 当前值等于目标，当前指针往右动
      cur++;
    }
  }
  // 划分值在arr[R]，它和大于区域的第一个值交换，这样`等于区域`在就找到了自己在`整个数组排序中`的位置。
  swap(nums, R, more);
  // 返回等于区域的区间
  return [less + 1, more];
}

function swap(nums, i, j) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}