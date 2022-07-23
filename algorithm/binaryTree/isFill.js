// 是否是满二叉树
function isFill(root) {
  const { height, nums } = proc(root);
  // 满足 结点数量 = 2^高度 - 1 的，就是满二叉树，否则不是。
  return (1 << height) - 1 === nums;
}
class Info {
  constructor(h, n) {
    this.height = h;  // 高度
    this.num = n;  // 结点数量
  }
}
function proc(head) {
  if (!head) {
    return new Info(0, 0);
  }
  // 向左右子树要信息
  const leftInfo = proc(head.left);
  const rightInfo = proc(head.right);
  // 组合自己的信息
  const nums = leftInfo.nums + rightInfo.nums + 1;
  const height = Math.max(leftInfo.height, rightInfo.height) + 1;
  // 返回给上游
  return new Info(height, nums);
}