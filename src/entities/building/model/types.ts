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
}

