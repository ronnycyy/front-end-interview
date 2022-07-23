// 堆排
function heapSort(nums) {
  if (!nums || nums.length < 2) {
    return nums;
  }

  // generate MaxHeap
  for (let i = nums.length - 1; i >= 0; i--) {
    heapify(nums, i, nums.length);
  }

  let heapSize = nums.length;
  while (heapSize) {
    // 交换堆顶和堆最后一个数，使数组[堆最后一位, N-1]有序。
    swap(nums, 0, --heapSize);
    // 交换过来的数，往下 heapify，重新建立大根堆
    heapify(nums, 0, heapSize);
    // 堆尺寸减少为0时，全部数已经有序，退出。
  }

  return nums;
}

// 从 i 位置往下，调整成大根堆
function heapify(nums, i, heapSize) {
  if (2 * i + 1 > heapSize - 1) {
    // 没有左孩子，返回。
    return;
  }

  // 初始化较大的为左孩子
  let more = 2 * i + 1;

  if (2 * i + 2 <= heapSize - 1) {
    // 如果有右孩子，取左右中较大的那个
    more = nums[2 * i + 1] >= nums[2 * i + 2] ? (2 * i + 1) : (2 * i + 2);
  }

  // 往下沉
  if (nums[more] > nums[i]) {
    swap(nums, i, more);
    heapify(nums, more, heapSize);
  }
}

function swap(nums, i, j) {
  const tmp = nums[i];
  nums[i] = nums[j];
  nums[j] = tmp;
}