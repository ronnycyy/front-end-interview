// 是否是完全二叉树  遍历法
function isCBT1(head) {
  if (head === null) {
    // 看你怎么规定，经典方法认为 空树是完全二叉树
    return true;
  }
  // 准备一个队列，进行按层遍历
  const queue = [];
  // 是否遇到过左右孩子不双全的结点
  let leaf = false;
  let l = null;
  let r = null;
  // 二叉树的层序遍历，先把头结点入队
  queue.unshift(head);
  while (queue.length > 0) {
    // 从队列弹出一个结点
    head = queue.pop();
    // 拿到左右孩子
    l = head.left;
    r = head.right;
    // 每遍历一个结点，都判断是否命中🎯违规情况
    if (
      // 违规情况1: 有右无左，返回 false
      (r !== null && l === null)
      ||
      // 违规2情况: 之前遇到过`左右孩子不双全`的结点，同时本结点不是叶子结点，返回 false
      (leaf && (l !== null || r !== null))
    ) {
      return false;
    }
    // 按层遍历传递: 左孩子不为空左孩子入队，然后右孩子不为空右孩子入队
    if (l !== null) {
      queue.unshift(l);
    }
    if (r !== null) {
      queue.unshift(r);
    }
    // 遇到了左右孩子不双全的结点，打开开关
    // 开关一旦打开，就永远是 true，不会再关上。
    if (l === null || r === null) {
      leaf = true;
    }
  }
  // 顺利遍历完，没有违规，是完全二叉树
  return true;
}