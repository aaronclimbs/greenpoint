export default function arrToSentence(arr) {
  if (arr.length === 1) return arr;
  let last = arr.pop();
  last = arr.length > 2 ? ", and " + last : " and " + last;
  return arr.join(", ").concat(last);
}
