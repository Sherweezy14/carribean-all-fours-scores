// Utility function to calculate the floored average of numbers
export function averageFloor(...nums: number[]): number {
  if (nums.length === 0) return 0;
  const sum = nums.reduce((acc, n) => acc + n, 0);
  return Math.floor(sum / nums.length);
}
