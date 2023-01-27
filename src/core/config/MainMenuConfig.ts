export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  svgIcon?: string;
  fontIcon?: string;
  sub?: Array<MenuItem>;
}

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "Anasayfa",
        route: "/dashboard",
        svgIcon: "/media/icons/duotune/abstract/abs029.svg",
        fontIcon: "bi-app-indicator",
      },
      {
        heading: "Projeler",
        route: "/project",
        svgIcon: "/media/icons/duotune/abstract/abs027.svg",
        fontIcon: "bi-app-indicator",
      },
    ],
  }
];

export default MainMenuConfig;
