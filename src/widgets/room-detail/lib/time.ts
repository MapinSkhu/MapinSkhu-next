export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function getDayIndex(date: Date): number {
  // 0=일, 1=월 ... 6=토 → 월=0, 화=1, ... 금=4
  const jsDay = date.getDay();
  // 일(0) → 0(기본값), 월(1) → 0, ..., 금(5) → 4, 토(6) → 0(기본값)
  return jsDay >= 1 && jsDay <= 5 ? jsDay - 1 : 0;
}
