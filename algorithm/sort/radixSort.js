// 基数排序
function radixSort(nums) {
  if (!nums || nums.length < 2) {
    return nums;
  }
  // 只适用于非负数。
  // 要适用于负数，只要数组全部减个最小值，排完序再全部加上最小值即可。
  const min = getMin(nums);
  if (min < 0) {
    for (let i = nums.length - 1; i >= 0; i--) {
      nums[i] = nums[i] - min;
    }
  }
  const sortedNums =  doRadixSort(nums, 0, nums.length - 1, maxBits(nums));
  if (min < 0) {
    for (let i = sortedNums.length - 1; i >= 0; i--) {
      sortedNums[i] = sortedNums[i] + min;
    }
  }
  return sortedNums;
}

function getMin(nums) {
    let min = Number.MAX_SAFE_INTEGER;
    for (let i = nums.length - 1; i >= 0; i--) {
        min = Math.min(min, nums[i]);
    }
    return min;
}

// 在 nums 的 [L,R] 上，最大的位数是 digit，请把 nums 的 [L,R] 排好序。
function doRadixSort(nums, L, R, digit) {
  const radix = 10;
  let i = 0;
  let j = 0;
  const help = new Uint32Array(R - L + 1);

  // O(N * digit) ~= O(N)
  for (let d = 1; d <= digit; d++) {
    // 每个数 进出队列 digit 次   
    // 比如 digit 是3，那就代表每个数 "按个位进出1次，按十位进出1次，按百位进出1次"，一共3次。
    // 每次出队列，都将 nums 按当前位排序，同时低位的顺序保留了下来。

    // count 记录当前位下，每个数出现的数量
    // 比如当前位是个位，样本是 [101,001,022,031,040], 那么count是 [1(040), 3(101,001,031), 1(022), 0,0,0,0,0,0,0]。
    const count = new Uint32Array(radix);
    for (i = L; i <= R; i++) {
      // 提取每个数在当前位的数字，比如`031`在`个位`的数字是 1。
      j = getDigit(nums[i], d);
      count[j]++;
    }

    // count -> count' 求前缀和数组: [1(040),4(040,101,001,031),5(all),5,5,5,5,5,5,5]，代表样本中，个位的数小于等于 index 的个数
    for (i = 1; i < radix; i++) {
      count[i] = count[i] + count[i - 1];
    }

    // 从右往左遍历样本:
    // 1. 040个位是0，count'[0]为1, 代表[0,0], 所以放到0位置 [040(0), ..]; count'[0]--;
    // 2. 031个位是1，count'[1]为4, 代表[0,3], 所以放到3位置 [040(0), ..., 031(3)]; count'[1]--;
    // 3. 022个位是2，count'[2]为5, 代表[0,4], 所以放到4位置 [040(0), ..., 031(3), 022(4)]; count'[2]--; 
    // 4. 001个位是1，count'[1]为3, 代表[0,2], 所以放到2位置 [040(0), ..., 001(2), 031(3), 022(4)]; count'[1]--; (count'[2]只关心`个位为2`的最右位置，所以count'[1]--的时候，与count'[2]无关)
    // 5. 101个位是1，count'[1]为2, 代表[0,1], 所以放到2位置 [040(0), 101(1), 001(2), 031(3), 022(4)]; count'[1]--;
    // 遍历完成，数组已经按个位排好序: [040,101,001,031,022]
    for (i = R; i >= L; i--) {
      // 022个位是2
      j = getDigit(nums[i], d);
      // count'[2]为5, 代表[0,4], 所以 022 放到4位置 (count'[2]-1)
      help[count[j] - 1] = nums[i];
      // 词频--
      count[j]--;
    }

    // 辅助数组同步到原数组
    for (i = L, j = 0; i <= R; i++, j++) {
      nums[i] = help[j];
    }
  }

  return nums;
}

// 返回数组的最大位数
// 比如 [56,3,12,100], 最大位到百位是3个位，所以返回 3。
function maxBits(nums) {
  let max = Number.MIN_SAFE_INTEGER;
  for (let i = nums.length - 1; i >= 0; i--) {
    max = Math.max(max, nums[i]);
  }
  // max 每次除以 10，除成 0 需要的次数，就是 max 的位数。
  let res = 0;
  while (max !== 0) {
    res++;  // 除了几次
    max = Math.floor(max / 10);
  }
  return res;
}

// 返回 x 从右往左数 d 位的数字
// 比如:
// d 为 1，x 为 022，返回`个位`的 2。
// d 为 3，x 为 987654321，返回`百位`的 3。
function getDigit(x, d) {
  return Math.floor(x / (d === 1 ? 1 : Math.pow(10, d - 1))) % 10;
}
