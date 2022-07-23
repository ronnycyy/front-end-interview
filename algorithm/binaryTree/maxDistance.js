function maxDistance(root) {
  if (!root) {
      return 0;
  }
  return proc(root).maxDistance;
};

class Info {
  constructor(maxDistance, height) {
      this.maxDistance = maxDistance;
      this.height = height;
  }
}

function proc(head) {
  if (!head) {
      return new Info(0, 0);
  }

  const leftInfo = proc(head.left);
  const rightInfo = proc(head.right);

  const height = Math.max(leftInfo.height, rightInfo.height) + 1;

  const p1 = leftInfo.maxDistance;
  const p2 = rightInfo.maxDistance;
  const p3 = leftInfo.height + rightInfo.height + 1;
  const maxDistance = Math.max(Math.max(p1, p2), p3);

  return new Info(maxDistance, height);
}