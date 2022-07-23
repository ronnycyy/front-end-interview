// 递归序
function travel(head) {
  if (!head) {
    return;
  }
  // f先序遍历
  travel(head.left);
  // f中序遍历
  travel(head.right);
  // f后序遍历
}
