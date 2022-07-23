/**
  请同学们自行搜索或者想象一个象棋的棋盘，
  然后把整个棋盘放入第一象限，棋盘的最左下角是(0,0)位置
  那么整个棋盘就是横坐标上9条线、纵坐标上10条线的区域
  给你三个 参数 x，y，k
  返回“马”从(0,0)位置出发，必须走k步
  最后落在(x,y)上的方法数有多少种? 
*/
function jump1(k, x, y) {
  return proc(0, 0, k, x, y);
}

function jump2(k, x, y) {
  return dpWays(x, y, k);
}

// 从 (i,j) 出发刚好跳 k 步，到达 (x,y) 的方法数。
function proc(i, j, k, x, y) {
  // 越界方法数是0
  if (i < 0 || i > 8 || j < 0 || j > 9) {
    return 0;
  }

  // 没越界，步数刚好用完
  if (k === 0) {
    // 到达目标点，算一种方法
    // 没到达目标点，由于没有步数了，所以没有方法
    return i === x && j === y ? 1 : 0;
  }

  // 还有步数
  // 普遍位置，每一个点都可以往 8 个方向跳，取 8 个方向的方法数累加，就是自己的方法数
  const p1 = proc(i + 2, j + 1, k - 1, x, y);
  const p2 = proc(i + 2, j - 1, k - 1, x, y);
  const p3 = proc(i + 1, j - 2, k - 1, x, y);
  const p4 = proc(i - 1, j - 2, k - 1, x, y);
  const p5 = proc(i - 2, j - 1, k - 1, x, y);
  const p6 = proc(i - 2, j + 1, k - 1, x, y);
  const p7 = proc(i - 1, j + 2, k - 1, x, y);
  const p8 = proc(i + 1, j + 2, k - 1, x, y);

  // 当前点(i,j) 是父级 8 个点中的一个，现在返回给父级。
  return p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;
}

function dpWays(x, y, k) {
  // 高维度的在前面，低维度在后面:   层 -> 行 -> 列   (k, i, j)    高k+1, 行9, 列10
  const dp = Array(k + 1).fill(0).map(_ => new Array(9).fill(0).map(_ => new Uint32Array(10)));

  // 先填 base case: 高为0的平面
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 10; j++) {
      dp[0][i][j] = i === x && j === y ? 1 : 0;
    }
  }

  // 从下往上，每一个平面填好
  for (let h = 1; h < k + 1; h++) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 10; j++) {
        const p1 = getValue(dp, h - 1, i + 2, j + 1);
        const p2 = getValue(dp, h - 1, i + 2, j - 1);
        const p3 = getValue(dp, h - 1, i + 1, j - 2);
        const p4 = getValue(dp, h - 1, i - 1, j - 2);
        const p5 = getValue(dp, h - 1, i - 2, j - 1);
        const p6 = getValue(dp, h - 1, i - 2, j + 1);
        const p7 = getValue(dp, h - 1, i - 1, j + 2);
        const p8 = getValue(dp, h - 1, i + 1, j + 2);

        dp[h][i][j] = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;
      }
    }
  }

  return dp[k][0][0];
}

// 处理越界的情况
function getValue(dp, k, i, j) {
  if (i < 0 || i > 8 || j < 0 || j > 9) {
    return 0;
  }
  return dp[k][i][j];
}

test('暴力递归', jump1.bind(null, 10, 7, 7));
test('动态规划', jump2.bind(null, 10, 7, 7));

function test(name, cb) {
  console.time(name);
  console.log(cb());  // 515813
  console.timeEnd(name);
}

