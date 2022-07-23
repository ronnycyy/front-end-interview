// 非递归后序遍历 
var postorderTraversal = function (root) {
  if (!root) {
    return;
  }
  const s1 = [root];
  const s2 = [];
  let cur = null;
  while (s1.length > 0) {
    cur = s1.pop();
    // 弹出的时候不要打印，压入到s2
    s2.push(cur);

    // 先压左再压右
    // 实现`头左右`
    if (cur.left) {
      s1.push(cur.left);
    }
    if (cur.right) {
      s1.push(cur.right);
    }
  }
  // s2依次弹出
  while (s2.length > 0) {
    console.log(s2.pop());
  }
};