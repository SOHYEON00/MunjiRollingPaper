import React, { lazy, LazyExoticComponent } from "react";

interface PathType {
  key: string;
  url: string;
  title: string;
  Component?: LazyExoticComponent<React.ComponentType>;
}

export enum PathTitles {
  Landing = "Landing",
  Main = "Main",
}

export const paths: PathType[] = [
  {
    key: PathTitles.Landing,
    title: PathTitles.Landing,
    url: "/",
    Component: lazy(() => import("../pages/Landing/Landing")),
  },
  {
    key: PathTitles.Main,
    title: PathTitles.Main,
    url: "/:id",
    Component: lazy(() => import("../pages/Main/Main")),
  },
];

export const getPath = (title: PathTitles): string => {
  return paths.filter((p) => p.title === title)[0]?.key;
};

export const replaceParam = (
  title: PathTitles,
  keys: string[],
  values: Array<string | number>
): string => {
  let newUrl = getPath(title);

  keys.forEach((key: string, i: number) => {
    newUrl = newUrl.replace(key, `${values[i]}`);
  });

  return newUrl;
};
