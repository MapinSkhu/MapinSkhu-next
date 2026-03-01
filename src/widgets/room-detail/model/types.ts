export type DayIndex = 0 | 1 | 2 | 3 | 4;

export interface Lecture {
  id: string;
  name: string;
  professor: string;
  startTime: string; // "09:00"
  endTime: string; // "11:50"
  day: DayIndex; // 0=월, 1=화, 2=수, 3=목, 4=금
  isGraduate?: boolean;
}

export interface Equipment {
  seats: number;
  seatNote?: string;
  outlets: number;
  outletNote?: string;
}

export interface RoomInfo {
  id: string;
  lectures: Lecture[];
  equipment: Equipment;
}
