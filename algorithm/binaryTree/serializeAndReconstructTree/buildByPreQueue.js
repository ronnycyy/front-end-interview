// 先序方式反序列化
// 队列顺序  first <-- last
function buildByPreQueue(queue) {
  if (!queue || queue.length === 0) {
    // 收到捣乱的数据，返回空树
    return null;
  }
  return proc(queue);
}
function proc(queue) {
  // 弹出队列的第一个元素
  const value = queue.shift();
  // value 不知道它的父结点是谁，只知道父结点在等待`建一棵子树`，而 value 会是子树的头结点。
  if (value === null) {
    // 如果是null，说明父结点等的是空树，所以建一个空结点，返回
    return null;
  }
  // value 不是null, 说明父结点等待一棵非空的子树，建出这棵子树的头结点
  const head = new Node(value);
  // 因为队列是用`头左右`的方式入队建出来的，所以用队列接下来的数据，先建出子树的左子树。
  head.left = proc(queue);
  // 再建出子树的右子树
  head.right = proc(queue);
  // 返回父级等待的子树
  return head;
}