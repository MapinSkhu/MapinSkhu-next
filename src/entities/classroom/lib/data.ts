import type {
  RawClassroom,
  Classroom,
  Lecture,
  Equipment,
  ClassroomDetail,
  DayOfWeek,
  DayIndex,
} from "../model/types";

// --- JSON imports: 건물별 파일 ---
import syGwan5 from "@/data/sy_gwan_5.json";
import imGwan1 from "@/data/im_gwan_1.json";
import wdGwan3 from "@/data/wd_gwan_3.json";
import wdGwan4 from "@/data/wd_gwan_4.json";
import wdGwan5 from "@/data/wd_gwan_5.json";
import nnGwan3 from "@/data/nn_gwan_3.json";
import jgGwan1 from "@/data/jg_gwan_1.json";
import jgGwan2 from "@/data/jg_gwan_2.json";
import jgGwan4 from "@/data/jg_gwan_4.json";
import scnGwan1 from "@/data/scn_gwan_1.json";
import scnGwan2 from "@/data/scn_gwan_2.json";
import scnGwan3 from "@/data/scn_gwan_3.json";
import scnGwan4 from "@/data/scn_gwan_4.json";
import scnGwan6 from "@/data/scn_gwan_6.json";
import pbHall1 from "@/data/pb_hall_1.json";
import pbHall3 from "@/data/pb_hall_3.json";
import pbHall9 from "@/data/pb_hall_9.json";
import mgellGwan2 from "@/data/mgell_gwan_2.json";
import mgellGwan3 from "@/data/mgell_gwan_3.json";
import mgellGwan4 from "@/data/mgell_gwan_4.json";

// --- JSON imports: 강의실 상세 ---
import detail1 from "@/data/details/1.json";
import detail2 from "@/data/details/2.json";
import detail3 from "@/data/details/3.json";
import detail4 from "@/data/details/4.json";
import detail5 from "@/data/details/5.json";
import detail6 from "@/data/details/6.json";
import detail7 from "@/data/details/7.json";
import detail8 from "@/data/details/8.json";
import detail9 from "@/data/details/9.json";
import detail10 from "@/data/details/10.json";
import detail11 from "@/data/details/11.json";
import detail12 from "@/data/details/12.json";
import detail13 from "@/data/details/13.json";
import detail14 from "@/data/details/14.json";
import detail15 from "@/data/details/15.json";
import detail16 from "@/data/details/16.json";
import detail17 from "@/data/details/17.json";
import detail18 from "@/data/details/18.json";
import detail19 from "@/data/details/19.json";
import detail20 from "@/data/details/20.json";
import detail21 from "@/data/details/21.json";
import detail22 from "@/data/details/22.json";
import detail23 from "@/data/details/23.json";
import detail24 from "@/data/details/24.json";
import detail25 from "@/data/details/25.json";
import detail26 from "@/data/details/26.json";
import detail27 from "@/data/details/27.json";
import detail28 from "@/data/details/28.json";
import detail29 from "@/data/details/29.json";
import detail30 from "@/data/details/30.json";
import detail31 from "@/data/details/31.json";
import detail32 from "@/data/details/32.json";
import detail33 from "@/data/details/33.json";
import detail34 from "@/data/details/34.json";
import detail35 from "@/data/details/35.json";
import detail36 from "@/data/details/36.json";
import detail37 from "@/data/details/37.json";
import detail38 from "@/data/details/38.json";
import detail39 from "@/data/details/39.json";
import detail40 from "@/data/details/40.json";
import detail41 from "@/data/details/41.json";
import detail42 from "@/data/details/42.json";
import detail43 from "@/data/details/43.json";
import detail44 from "@/data/details/44.json";
import detail45 from "@/data/details/45.json";
import detail46 from "@/data/details/46.json";
import detail47 from "@/data/details/47.json";
import detail48 from "@/data/details/48.json";
import detail49 from "@/data/details/49.json";
import detail50 from "@/data/details/50.json";
import detail51 from "@/data/details/51.json";
import detail52 from "@/data/details/52.json";
import detail53 from "@/data/details/53.json";
import detail54 from "@/data/details/54.json";
import detail55 from "@/data/details/55.json";
import detail56 from "@/data/details/56.json";

// --- 변환 헬퍼 ---

const DAY_MAP: Record<DayOfWeek, DayIndex> = {
  MON: 0,
  TUE: 1,
  WED: 2,
  THU: 3,
  FRI: 4,
};

function transformClassroom(raw: RawClassroom): Classroom {
  return {
    id: raw.id,
    floor: raw.floor,
    classroomNumber: raw.classroom_number,
    isAvailable: raw.isAvaliable,
    imageUrl: raw.imageUrl,
  };
}

function transformCourses(
  rawCourses: DetailJson["course_list"],
): Lecture[] {
  return rawCourses.flatMap((course, courseIdx) =>
    course.dayOfWeek
      .filter((d): d is DayOfWeek => d in DAY_MAP)
      .map((day) => ({
        id: `${course.id}-${day}-${courseIdx}`,
        name: course.course_name,
        professor: course.professor,
        startTime: course.start_time,
        endTime: course.end_time,
        day: DAY_MAP[day],
        isGraduate: course.degreeLevel === "GRADUATE",
      })),
  );
}

function transformEquipment(
  rawEquipment: DetailJson["equipment"],
): Equipment {
  const eq = rawEquipment[0] ?? { pc: 0, chair: 0, projector: 0 };
  return {
    pc: eq.pc,
    chairs: eq.chair,
    projector: eq.projector,
  };
}

// --- 건물별 강의실 데이터 ---

type BuildingJson = { classroom_list: RawClassroom[] };

const buildingFloorMap: Record<string, BuildingJson[]> = {
  sy_gwan: [syGwan5],
  im_gwan: [imGwan1],
  wd_gwan: [wdGwan3, wdGwan4, wdGwan5],
  nn_gwan: [nnGwan3],
  jg_gwan: [jgGwan1, jgGwan2, jgGwan4],
  scn_gwan: [scnGwan1, scnGwan2, scnGwan3, scnGwan4, scnGwan6],
  pb_hall: [pbHall1, pbHall3, pbHall9],
  mgell_gwan: [mgellGwan2, mgellGwan3, mgellGwan4],
};

// --- 상세 데이터 ---

// JSON import는 string[]로 추론되므로 넓은 타입 사용, 변환 함수에서 캐스팅
interface DetailJson {
  course_list: {
    id: string;
    professor: string;
    course_name: string;
    start_time: string;
    end_time: string;
    dayOfWeek: string[];
    degreeLevel: string;
  }[];
  equipment: { pc: number; chair: number; projector: number }[];
  reservation_list: unknown[];
}

const detailMap: Record<string, DetailJson> = {
  "1": detail1,
  "2": detail2,
  "3": detail3,
  "4": detail4,
  "5": detail5,
  "6": detail6,
  "7": detail7,
  "8": detail8,
  "9": detail9,
  "10": detail10,
  "11": detail11,
  "12": detail12,
  "13": detail13,
  "14": detail14,
  "15": detail15,
  "16": detail16,
  "17": detail17,
  "18": detail18,
  "19": detail19,
  "20": detail20,
  "21": detail21,
  "22": detail22,
  "23": detail23,
  "24": detail24,
  "25": detail25,
  "26": detail26,
  "27": detail27,
  "28": detail28,
  "29": detail29,
  "30": detail30,
  "31": detail31,
  "32": detail32,
  "33": detail33,
  "34": detail34,
  "35": detail35,
  "36": detail36,
  "37": detail37,
  "38": detail38,
  "39": detail39,
  "40": detail40,
  "41": detail41,
  "42": detail42,
  "43": detail43,
  "44": detail44,
  "45": detail45,
  "46": detail46,
  "47": detail47,
  "48": detail48,
  "49": detail49,
  "50": detail50,
  "51": detail51,
  "52": detail52,
  "53": detail53,
  "54": detail54,
  "55": detail55,
  "56": detail56,
};

// --- 강의실 이미지 매핑 ---

const roomImageMap: Record<string, string> = {
  "1502": "/images/rooms/1502.jpg",
  "1503": "/images/rooms/1503.jpg",
  "1504": "/images/rooms/1504.jpg",
  "1505": "/images/rooms/1505.jpg",
  "1506": "/images/rooms/1506.jpg",
  "3301": "/images/rooms/3301.jpg",
  "3302": "/images/rooms/3302.jpg",
  "3401": "/images/rooms/3401.jpg",
  "3402": "/images/rooms/3402.jpg",
  "3501": "/images/rooms/3501.jpg",
  "3502": "/images/rooms/3502.jpg",
  "5C301": "/images/rooms/5C301.jpg",
  "6109": "/images/rooms/6109.jpg",
  "6110": "/images/rooms/6110.png",
  "6201": "/images/rooms/6201.png",
  "6202": "/images/rooms/6202.png",
  "6206": "/images/rooms/6206.png",
  "6402": "/images/rooms/6402.png",
  "6403": "/images/rooms/6403.png",
  "6404": "/images/rooms/6404.png",
  "6405": "/images/rooms/6405.png",
  "6406": "/images/rooms/6406.png",
  "7104": "/images/rooms/7104.jpg",
  "7202": "/images/rooms/7202.jpg",
  "7204": "/images/rooms/7204.jpg",
  "7205": "/images/rooms/7205.jpg",
  "7206": "/images/rooms/7206.jpg",
  "7207": "/images/rooms/7207.jpg",
  "7208": "/images/rooms/7208.jpg",
  "7301": "/images/rooms/7301.jpg",
  "7302": "/images/rooms/7302.jpg",
  "7303": "/images/rooms/7303.jpg",
  "7304": "/images/rooms/7304.jpg",
  "7305": "/images/rooms/7305.jpg",
  "7306": "/images/rooms/7306.jpg",
  "7307": "/images/rooms/7307.jpg",
  "7308": "/images/rooms/7308.jpg",
  "7309": "/images/rooms/7309.jpg",
  "7417": "/images/rooms/7417.jpg",
  "B105": "/images/rooms/B105.jpg",
  "M201": "/images/rooms/M201.jpg",
  "M202": "/images/rooms/M202.jpg",
  "M203": "/images/rooms/M203.jpg",
  "M205": "/images/rooms/M205.jpg",
  "M301": "/images/rooms/M301.jpg",
  "M401": "/images/rooms/M401.jpg",
  "M402": "/images/rooms/M402.jpg",
  "M403": "/images/rooms/M403.jpg",
  "M404": "/images/rooms/M404.jpg",
  "M406": "/images/rooms/M406.jpg",
  "M407": "/images/rooms/M407.jpg",
};

// --- 공개 API ---

/** 강의실 번호로 이미지 경로 조회. 없으면 undefined 반환 */
export function getRoomImage(roomNumber: string): string | undefined {
  return roomImageMap[roomNumber];
}

/** 건물별 전체 강의실 목록 (층 오름차순 → 호수 오름차순) */
export function getClassroomsByBuilding(slug: string): Classroom[] {
  const floors = buildingFloorMap[slug];
  if (!floors) return [];

  return floors
    .flatMap((f) => f.classroom_list.map(transformClassroom))
    .sort(
      (a, b) =>
        a.floor - b.floor ||
        a.classroomNumber.localeCompare(b.classroomNumber),
    );
}

/** 건물의 층 목록 (오름차순) */
export function getFloorsByBuilding(slug: string): number[] {
  const classrooms = getClassroomsByBuilding(slug);
  return [...new Set(classrooms.map((c) => c.floor))].sort((a, b) => a - b);
}

/** 강의실 상세 (강의 + 기자재) */
export function getClassroomDetail(
  classroomId: string,
): ClassroomDetail | undefined {
  const raw = detailMap[classroomId];
  if (!raw) return undefined;

  return {
    lectures: transformCourses(raw.course_list),
    equipment: transformEquipment(raw.equipment),
  };
}

/** 건물 + 호수로 강의실 조회 */
export function getClassroomByNumber(
  slug: string,
  roomNumber: string,
): Classroom | undefined {
  return getClassroomsByBuilding(slug).find(
    (c) => c.classroomNumber === roomNumber,
  );
}

/** 강의실번호 / 강의명 / 교수명으로 전체 검색 */
export function searchAll(
  query: string,
): { classroom: Classroom; slug: string }[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();

  const results: { classroom: Classroom; slug: string }[] = [];

  for (const slug of Object.keys(buildingFloorMap)) {
    const classrooms = getClassroomsByBuilding(slug);

    for (const classroom of classrooms) {
      // 강의실 번호 매칭
      if (classroom.classroomNumber.toLowerCase().includes(q)) {
        results.push({ classroom, slug });
        continue;
      }

      // 상세 데이터에서 강의명/교수명 매칭
      const detail = detailMap[classroom.id];
      if (detail) {
        const hasMatch = detail.course_list.some(
          (course) =>
            course.course_name.toLowerCase().includes(q) ||
            course.professor.toLowerCase().includes(q),
        );
        if (hasMatch) {
          results.push({ classroom, slug });
        }
      }
    }
  }

  return results;
}
