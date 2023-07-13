export function isUniq(arr: any): boolean {
  return arr.length === new Set(arr).size;
}
