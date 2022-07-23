// 非递归先序遍历
function preorderTraversal(head) {
  if (!head) {
    return;
  }
  const stack = [head];
  let cur = null;

  while (stack.length > 0) {
    cur = stack.pop();
    console.log(cur);  // 弹出就打印

    // 先压右，再压左
    if (cur.right) {
      stack.push(cur.right)
    }
    if (cur.left) {
      stack.push(cur.left)
    }
  }
}
