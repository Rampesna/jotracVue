export interface MenuItem {
    heading?: string;
    sectionTitle?: string;
    route?: string;
    module?: string;
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
                route: "dashboard",
                module: "dashboard",
                svgIcon: "/media/icons/duotune/abstract/abs029.svg",
            },
            {
                heading: "Projeler",
                route: "project",
                module: "project",
                svgIcon: "/media/icons/duotune/abstract/abs027.svg",
            },
        ],
    }
];

export default MainMenuConfig;
