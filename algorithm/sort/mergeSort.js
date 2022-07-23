// 归并排序
function mergeSort(arr) {
  if (!arr || arr.length < 2) {
    return arr;
  }
  proc(arr, 0, arr.length-1);
  return arr;
}
/**
 * 使 arr 在 [L,R] 上排好序
 */
function proc(arr, L, R) {
  if (L === R) {
    // 只有一个数已经有序了，返回。
    return;
  }
  // 找[L,R]的中点，如果没有中点就找"上中位"
  const M = L + Math.floor((R - L) / 2);
  // 使[L,M]有序
  proc(arr, L, M);
  // 使[M+1,R]有序
  proc(arr, M + 1, R);
  // [L,M]和[M+1,R]都是有序的，合并到[L,R]上，使[L,R]有序
  merge(arr, L, M, R);
}
/**
 * arr的[L,M]有序，[M+1,R]有序，合并这两块，使得arr的[L,R]上有序
 */
function merge(arr, L, M, R) {
  // 准备一个数组，存放最终 [L,R] 的有序排列，所以开的长度为 R-L+1。
  // 根据数据状况，可以换成 new Uint32Array(R-L+1) 等
  const help = [];

  // 两个指针怼在两个有序数组头，依次往前取值、比较，哪个小就拷贝哪个到 help 数组里
  let c1 = L;
  let c2 = M + 1;
  let i = 0;
  while (c1 <= M && c2 <= R) {
    if (arr[c1] <= arr[c2]) {
      help[i] = arr[c1++];
    } else {
      help[i] = arr[c2++];
    }
    i++;
  }

  // 两个只会中一个
  while (c1 <= M) {
    help[i++] = arr[c1++];
  }
  while (c2 <= R) {
    help[i++] = arr[c2++];
  }

  // [L,R]有序了，拷贝回原数组
  for (let j = 0, len = help.length; j < len; j++) {
    arr[L + j] = help[j];
  }
}
