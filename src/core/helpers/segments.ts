export const segments = (path: string): any => {
    return path.split("/").filter((segment) => segment.length > 0);
};
