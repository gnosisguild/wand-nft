type MapValueProps = {
  n: number;
  start1: number;
  stop1: number;
  start2: number;
  stop2: number;
}

export function mapValue({n, start1, stop1, start2, stop2}: MapValueProps) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};