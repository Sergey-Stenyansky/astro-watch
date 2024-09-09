export type PageConfig = {
  name: string;
  path: string;
  isActive: boolean;
};

export const pages: PageConfig[] = [
  {
    name: "Feed",
    path: "/",
    isActive: true,
  },
  {
    name: "Test",
    path: "/test",
    isActive: false,
  },
];
