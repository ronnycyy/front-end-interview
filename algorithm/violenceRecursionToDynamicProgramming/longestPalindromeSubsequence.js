/**
 * 最长回文子序列
 * 
给定一个字符串str，返回这个字符串的最长回文子序列长度

比如: str = “a12b3c43def2ghi1kpm”, 最长回文子序列是“1234321”或者“123c321”，返回长度7
 */
function longestPalindromeSubsequence(s) {
  if (!s) {
    return 0;
  }
  return proc(s, 0, s.length - 1);
}

// 返回 str 在 [L,R] 上的最长回文子序列长度
function proc(str, L, R) {
  if (L === R) {
    return 1;
  }
  if (L === R - 1) {
    return str[L] === str[R] ? 2 : 1;
  }

  // 最长回文子序列`以L开头,不以R结尾`, 因为不以R结尾，所以有R没R都一样，等同于在[L,R-1]上尝试。
  const p1 = proc(str, L, R - 1);
  // 最长回文子序列`不以L开头,不以R结尾`  “这里我加了`str[L] === str[R] ? 0 : ...`, 也是对的, 只要能解释得通就对”
  const p2 = proc(str, L + 1, R - 1);  // 下一步有可能 L === R，所以要补这个 base case
  // 最长回文子序列`不以L开头,以R结尾`
  const p3 = proc(str, L + 1, R);
  // 最长回文子序列`以L开头,以R结尾`
  const p4 = str[L] === str[R] ? (2 + proc(str, L + 1, R - 1)) : 0;

  // 只有以上四种可能性，除此之外再无可能，所以返回其中的最大值。
  return Math.max(Math.max(p1, p2), Math.max(p3, p4));
}


/**
 * R列
 * 0 0 0 0 0 0   L行
 * 0 0 0 0 0 0
 * 0 0 0 0 0 0
 * 0 0 0 0 0 0
 * 0 0 0 0 0 0
 */

function dpWays(str) {
  const N = str.length;
  const dp = Array(N).fill(0).map(_ => new Uint32Array(N));

  for (let i = N - 1; i >= 0; i--) {   // 下->上
    for (let j = 0; j < N; j++) {  // 左->右
      if (i > j) {
        continue;
      }

      if (i === j) {
        dp[i][j] = 1;
      } else if (i === j - 1) {
        dp[i][j] = str[i] === str[j] ? 2 : 1;
      } else {
        dp[i][j] = Math.max(Math.max(dp[i][j - 1], dp[i + 1][j - 1]), Math.max(dp[i + 1][j], str[i] === str[j] ? (2 + dp[i + 1][j - 1]) : 0));
      }
    }
  }

  return dp[0][N - 1];
}