// 最大 BST 子树
function largestBSTSubtree(root) {
  if (!root) {
    return 0;
  }
  return proc(root).maxBSTSize;
};

// 每棵子树都应该有的信息
class Info {
  constructor(mbs, max, min, size) {
    this.maxBSTSize = mbs;   // 最大BST结点数
    this.max = max;  // 最大值
    this.min = min;  // 最小值
    this.size = size;  // 结点数量
    // 隐含属性isBST(是否为搜索二叉树): 当 maxBSTSize === size 时是，否则不是。
  }
}

function proc(x) {
  if (!x) {
    // 不知道怎么设置空树的Info时，就设置为null，交给上游去处理。
    return null;
  }
  // 跟左右子树要信息
  const leftInfo = proc(x.left);
  const rightInfo = proc(x.right);

  // 组合出 max, min, size
  let max = x.val;
  let min = x.val;
  let size = 1;
  if (leftInfo) {
    max = Math.max(max, leftInfo.max);
    min = Math.min(min, leftInfo.min);
    size += leftInfo.size;
  }
  if (rightInfo) {
    max = Math.max(max, rightInfo.max);
    min = Math.min(min, rightInfo.min);
    size += rightInfo.size;
  }

  // 可能性1: x不参与 maxBSTSize 计算
  // 结果要么是左子树的 maxBSTSize, 要么是右子树的 maxBSTSize。
  const p1 = leftInfo ? leftInfo.maxBSTSize : -1;
  const p2 = rightInfo ? rightInfo.maxBSTSize : -1;

  // 可能性2: x参与 maxBSTSize 计算，那么 x 就得先是搜索二叉树。
  // 这需要满足以下条件:
  // 1. 左子树是搜索二叉树
  // 2. 右子树是搜索二叉树
  // 3. 左max < x.val < 右max

  // 初始值设置为 -1, 如果以x为头的子树不是搜索二叉树，p3就会维持-1，这样在后面的max比较中就会落败，结果一定是 p1 或 p2。
  let p3 = -1;
  // 左子树是否搜索二叉树  (注意空树认为是搜索二叉树，这是为了上游好处理  比如[5,null,6]是搜索二叉树 )
  const isLeftBST = leftInfo ? (leftInfo.maxBSTSize === leftInfo.size) : true;
  // 右子树是否搜索二叉树  (注意空树认为是搜索二叉树，这是为了上游好处理  比如[5,3,null]是搜索二叉树 )
  const isRightBST = rightInfo ? (rightInfo.maxBSTSize === rightInfo.size) : true;
  // 左max < x.val < 右max   注意空树不违规，这是为了上游好处理，同上面👆
  const leftMaxLessX = leftInfo ? (leftInfo.max < x.val) : true;
  const rightMinMoreX = rightInfo ? (rightInfo.min > x.val) : true;

  if (isLeftBST && isRightBST && leftMaxLessX && rightMinMoreX) {
    // 以x为头的子树是搜索二叉树，计算可能性2的 maxBSTSize = 左子树的结点数量 + 右子树的结点数量 + 1
    const leftSize = leftInfo ? leftInfo.size : 0;
    const rightSize = rightInfo ? rightInfo.size : 0;
    p3 = leftSize + rightSize + 1;
  }
  // PK 所有可能性，选出最大值，就是 `以x为头的子树的最大 BST 结点数量`
  const maxBSTSize = Math.max(Math.max(p1, p2), p3);
  // 返回信息给上游使用
  return new Info(maxBSTSize, max, min, size);
}