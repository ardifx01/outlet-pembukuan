export default function compare(a: any, b: any): boolean {
  if (a === b) return true;
  if (typeof a == 'object' && a != null && typeof b == 'object' && b != null) {
    return Object.keys(a).every(k => !(k in b) || compare(a[k], b[k]));
  }
  return false;
}
