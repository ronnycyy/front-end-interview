// 先序方式序列化
function preSerialize(root) {
  const queue = [];  // 队列顺序: first <-- last
  serialize(root, queue);
  return queue;
}

function serialize(node, queue) {
  if (!node) {
    // 规定空结点用 null 来占位
    queue.push(null);
    return;
  }
  // 先序遍历, 对于任意一棵子树:
  // 先序列化头结点
  queue.push(node.val);
  // 再序列化左子树
  serialize(node.left, queue);
  // 最后序列化右子树
  serialize(node.right, queue);
}
