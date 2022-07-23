/**
arr是面值数组，其中的值都是正数且没有重复。再给定一个正数aim。
每个值都认为是一种面值，且认为张数是无限的。
返回组成aim的最少货币数
*/
var coinChange = function (coins, amount) {
  return dpWays2(coins, amount);
  return dpWays1(coins, amount);
  const min = proc(coins, 0, amount);
  return min === Number.MAX_SAFE_INTEGER ? -1 : min;
};

// index: 0~coins.length
// rest: 0~amount
function dpWays1(coins, amount) {
  const N = coins.length + 1;
  const M = amount + 1;
  // 因为要存放 Number.MAX_SAFE_INTEGER, Uint32Array 放不下，所以用普通数组。
  const dp = Array(N).fill(0).map(_ => Array(M).fill(0));

  dp[N - 1][0] = 0;

  // rest<0返回系统最大，说明表格左外侧全是系统最大值。
  // 最后一行, 第一个是0, 其余都是系统最大值
  for (let j = 1; j < M; j++) {
    dp[N - 1][j] = Number.MAX_SAFE_INTEGER;
  }

  // 下->上, 左->右
  for (let i = N - 2; i >= 0; i--) {
    for (let j = 0; j < M; j++) {
      let ans = Number.MAX_SAFE_INTEGER;
      for (let zhang = 0; zhang * coins[i] <= j; zhang++) {
        const next = dp[i + 1][j - zhang * coins[i]];
        if (next !== Number.MAX_SAFE_INTEGER) {
          ans = Math.min(ans, zhang + next);
        }
      }
      dp[i][j] = ans;
    }
  }

  return dp[0][M - 1] === Number.MAX_SAFE_INTEGER ? -1 : dp[0][M - 1];
}

// 省去枚举行为的 dp
function dpWays2(coins, amount) {
  const N = coins.length + 1;
  const M = amount + 1;
  const dp = Array(N).fill(0).map(_ => Array(M).fill(0));

  dp[N - 1][0] = 0;

  for (let j = 1; j < M; j++) {
    dp[N - 1][j] = Number.MAX_SAFE_INTEGER;
  }

  /**
   *           8元    11元    14元        rest
   * ...
   * i(3元)           ⬆️      🌟
   * i+1    .. c      b       a
   * ...
   * 
   * index
   * 
   * 原本的尝试中:  🌟 = Min(0+a, 1+b, 2+c, ...)
   * 但是我们发现:  ⬆️ = Min(0+b, 1+c, ...)
   * 所以，可以优化成: 🌟=Min(⬆️+1, 0+a), 省去枚举行为。
   */

  for (let i = N - 2; i >= 0; i--) {
    for (let j = 0; j < M; j++) {
      dp[i][j] = dp[i + 1][j];  // 让🌟等于`a`

      // 让⬆️和`a`PK, 谁小取谁
      if (j - coins[i] >= 0 && dp[i][j - coins[i]] !== Number.MAX_SAFE_INTEGER) {
        // 保证⬆️ `不越界`并且`有效`
        // ⬆️+1和`a`比较，谁小，留谁
        dp[i][j] = Math.min(dp[i][j - coins[i]] + 1, dp[i + 1][j]);
      }
    }
  }

  return dp[0][M - 1] === Number.MAX_SAFE_INTEGER ? -1 : dp[0][M - 1];
}


// arr[index....] 每种面值张数自由选择，搞出刚好rest的钱，返回最少张数。
function proc(arr, index, rest) {

  // // 下面的尝试过程，不会让 rest 小于 0，所以这个 base case 废弃。
  // if (rest < 0) {
  //   // 剩余钱数小于0，返回无效解给上游处理。
  //   return Number.MAX_SAFE_INTEGER;
  // }

  // 剩余钱数 >= 0

  if (index === arr.length) {
    // 没钱了
    // 搞出 0 元钱，需要 0 张货币
    // 搞出 >0 元钱，不能搞出，无效解
    return rest === 0 ? 0 : Number.MAX_SAFE_INTEGER;
  }

  let ans = Number.MAX_SAFE_INTEGER;
  // 从 0 张 index面值开始尝试，[index...]的面值自由选择, 花费的张数记录下来。
  // 然后尝试 (index面值) 1张, 2张, ..., 一直尝试到`不超过 rest 元的张数`，最后，完成 rest 的最少的张数保留下来。
  for (let zhang = 0; zhang * arr[index] <= rest; zhang++) {
    const next = proc(arr, index + 1, rest - zhang * arr[index]);
    // 如果 next 是系统最大值，代表尝试失败(钱超了或到末尾钱不够)，不予理会。
    if (next !== Number.MAX_SAFE_INTEGER) {
      // 记录本次尝试花费的张数: zhang + next;
      // 和之前对 index 的尝试比较，保留最小张数。
      ans = Math.min(ans, zhang + next);
    }
  }

  return ans;
}