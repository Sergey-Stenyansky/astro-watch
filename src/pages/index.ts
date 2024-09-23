export type PageConfig = {
  name: string;
  path: string;
  isActive: boolean;
};

export const pages: PageConfig[] = [
  {
    name: "Feed",
    path: "/feed",
    isActive: true,
  },
  {
    name: "Detail",
    path: "detail/:id",
    isActive: true,
  },
  {
    name: "Test",
    path: "test",
    isActive: false,
  },
];
