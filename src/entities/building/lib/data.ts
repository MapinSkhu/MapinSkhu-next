import { Building } from "@/entities/building/model/types";

export const buildings: Building[] = [
  {
    id: 1,
    name: "승연관",
    slug: "sy_gwan",
    icon: "/images/icons/1.png",
    image: "/images/main/sy_gwan_alone.png",
    link: "/sy_gwan",
    position: {
      pc: { top: "43%", right: "36%" },
      tablet: { top: "46%", right: "35%" },
      mobile: { top: "30%", right: "41%" },
    },
    highlight: { top: "18%", left: "52%", width: "18%", height: "55%" },
  },
  {
    id: 2,
    name: "일만관",
    slug: "im_gwan",
    icon: "/images/icons/2.png",
    image: "/images/main/im_gwan_alone.png",
    link: "/im_gwan",
    position: {
      pc: { top: "30%", right: "36%" },
      tablet: { top: "33%", right: "36%" },
      mobile: { top: "27%", left: "32%" },
    },
    highlight: { top: "15%", left: "55%", width: "14%", height: "50%" },
  },
  {
    id: 3,
    name: "월당관",
    slug: "wd_gwan",
    icon: "/images/icons/3.png",
    image: "/images/main/wd_gwan_alone.png",
    link: "/wd_gwan",
    position: {
      pc: { top: "39%", right: "22%" },
      tablet: { top: "41%", right: "20%" },
      mobile: { top: "20%", right: "43%" },
    },
    highlight: { top: "15%", left: "70%", width: "16%", height: "55%" },
  },
  {
    id: 5,
    name: "나눔관",
    slug: "nn_gwan",
    icon: "/images/icons/5.png",
    image: "/images/main/nn_gwan_alone.png",
    link: "/nn_gwan",
    position: {
      pc: { top: "67%", left: "25%" },
      tablet: { top: "70%", left: "25%" },
      mobile: { top: "55%", left: "80%" },
    },
    highlight: { top: "40%", left: "15%", width: "18%", height: "55%" },
  },
  {
    id: 6,
    name: "정보과학관",
    slug: "jg_gwan",
    icon: "/images/icons/6.png",
    image: "/images/main/jg_gwan_alone.png",
    link: "/jg_gwan",
    position: {
      pc: { top: "33%", right: "6%" },
      tablet: { top: "37%", right: "6%" },
      mobile: { top: "12%", left: "38%" },
    },
    highlight: { top: "10%", left: "86%", width: "14%", height: "55%" },
  },
  {
    id: 7,
    name: "새천년관",
    slug: "scn_gwan",
    icon: "/images/icons/7.png",
    image: "/images/main/scn_gwan_alone.png",
    link: "/scn_gwan",
    position: {
      pc: { top: "25%", left: "10%" },
      tablet: { top: "28%", left: "10%" },
      mobile: { top: "70%", left: "12%" },
    },
    highlight: { top: "8%", left: "2%", width: "18%", height: "65%" },
  },
  {
    id: 8,
    name: "중앙도서관",
    slug: "library",
    icon: "/images/icons/8.png",
    image: "/images/main/library_alone.png",
    link: "https://library.skhu.ac.kr/",
    position: {
      pc: { top: "33%", left: "25%" },
      tablet: { top: "37%", left: "26%" },
      mobile: { top: "60%", left: "14%" },
    },
    highlight: { top: "18%", left: "20%", width: "15%", height: "48%" },
  },
  {
    id: 9,
    name: "성미가엘성당&피츠버그홀",
    slug: "pb_hall",
    icon: "/images/icons/9.png",
    image: "/images/main/pb_hall_alone.png",
    link: "/pb_hall",
    position: {
      pc: { top: "36%", left: "37%" },
      tablet: { top: "39%", left: "37%" },
      mobile: { top: "48%", left: "23%" },
    },
    highlight: { top: "15%", left: "34%", width: "18%", height: "55%" },
  },
  {
    id: 11,
    name: "미가엘관",
    slug: "mgell_gwan",
    icon: "/images/icons/11.png",
    image: "/images/main/mgell_gwan_alone.png",
    link: "/mgell_gwan",
    position: {
      pc: { top: "27%", right: "18%" },
      tablet: { top: "30%", right: "20%" },
      mobile: { top: "20%", left: "18%" },
    },
    highlight: { top: "10%", left: "73%", width: "16%", height: "55%" },
  },
];

export function getBuildingBySlug(slug: string) {
  return buildings.find((b) => b.slug === slug);
}
