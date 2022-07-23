// 是否是搜索二叉树
function isSearchTree(head) {
  return proc(head).isSearch;
}
class Info {
  constructor(isSearch, max, min) {
    this.isSearch = isSearch;
    this.max = max;
    this.min = min;
  }
}
/**
 * 
 * @param {Node} head
 * @return {Info} 
 */
function proc(head) {
  if (!head) {
    // 认为空树是搜索二叉树
    // 认为空树的max是系统最小值，空树的min是系统最大值，这是为了让它们无效。
    return new Info(true, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
  }
  // 向左右子树要信息
  const leftInfo = proc(head.left);
  const rightInfo = proc(head.right);
  // 组合自己的信息
  const max = Math.max(Math.max(leftInfo.max, rightInfo.max), head.val);
  const min = Math.min(Math.min(leftInfo.min, rightInfo.min), head.val);
  let isSearch = false;
  if (leftInfo.isSearch && rightInfo.isSearch && leftInfo.max < head.val && head.val < rightInfo.min) {
    isSearch = true;
  }
  // 返给上游，递归连起来
  return new Info(isSearch, max, min);
}