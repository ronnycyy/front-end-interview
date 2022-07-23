/**
 * 删除单链表中的某个结点
 * @param {ListNode} head 原链表头
 * @param {ListNode} node 要删除的结点
 * @return {ListNode} newHead 新的链表头，因为删除的有可能是链表头
 */
function deleteNodeInList(head, node) {
  let pre = new ListNode(-1);
  pre.next = head;
  let cur = pre;

  while (cur.next) {
    if (cur.next === node) {
      cur.next = cur.next.next;
      break;
    } else {
      cur = cur.next;
    }
  }

  cur = pre.next;  // 新的头
  pre = null;   // 释放 pre 指向的内存空间

  return cur;
}