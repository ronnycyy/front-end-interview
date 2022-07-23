// 是否是平衡二叉树
function isBalanceTree(head) {
  return proc(head).isBalance;
}

/**
 * 子树的信息
 * @param {boolean} isBalance 是否是平衡二叉树
 * @param {number} height 高度
 */
class Info {
  constructor(isBalance, height) {
    this.isBalance = isBalance;
    this.height = height;
  }
}

/**
 * 返回每棵子树的信息
 * @param {Node} head 子树头
 * @return {Info} 子树的信息
 */
function proc(head) {
  if (!head) {
    // 空树是平衡二叉树 (这么定义代码好写)
    // 空树的高度是0
    return new Info(true, 0);
  }
  // 向左右子树要信息
  const leftInfo = proc(head.left);
  const rightInfo = proc(head.right);

  // 我也得返回 Info，整个递归才能连起来，所以求:
  // 1. 我是不是平衡二叉树
  // 2. 我的高度

  // 1. 左右子树都平衡，并且高度差不超过1，我就是平衡二叉树
  let isBalance = false;
  if (leftInfo.isBalance && rightInfo.isBalance && Math.abs(leftInfo.height - rightInfo.height) < 2) {
    isBalance = true;
  }
  // 2. 两棵子树中较高的高度+1，就是我的高度。
  const height = Math.max(leftInfo.height, rightInfo.height) + 1;

  // 返回我的信息给父级，整个递归连起来了
  return new Info(isBalance, height);
}




