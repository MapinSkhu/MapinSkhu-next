export interface Building {
  id: number;
  name: string;
  slug: string;
  icon: string;
  image: string;
  link: string;
  position: {
    pc: { top: string; left?: string; right?: string };
    tablet: { top: string; left?: string; right?: string };
    mobile: { top: string; left?: string; right?: string };
  };
  /** PC/태블릿 모달에서 건물을 감싸는 하이라이트 박스 (% 단위) */
  highlight?: { top: string; left: string; width: string; height: string };
}

