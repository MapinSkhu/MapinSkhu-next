export type DayOfWeek = "MON" | "TUE" | "WED" | "THU" | "FRI";
export type DayIndex = 0 | 1 | 2 | 3 | 4;

// JSON 원본 형태
export interface RawClassroom {
  id: string;
  floor: number;
  classroom_number: string;
  isAvaliable: boolean; // JSON 원본의 오탈자(Available) 그대로 유지
  imageUrl: string;
}

export interface RawCourse {
  id: string;
  professor: string;
  course_name: string;
  start_time: string;
  end_time: string;
  dayOfWeek: DayOfWeek[];
  degreeLevel: "UNDERGRATE" | "GRADUATE";
}

export interface RawEquipment {
  pc: number;
  chair: number;
  projector: number;
}

// 앱 내부 정규화 형태
export interface Classroom {
  id: string;
  floor: number;
  classroomNumber: string;
  isAvailable: boolean;
  imageUrl: string;
}

export interface Lecture {
  id: string;
  name: string;
  professor: string;
  startTime: string;
  endTime: string;
  day: DayIndex;
  isGraduate: boolean;
}

export interface Equipment {
  pc: number;
  chairs: number;
  projector: number;
}

export interface ClassroomDetail {
  lectures: Lecture[];
  equipment: Equipment;
}
