import React, { lazy, LazyExoticComponent } from "react";

interface PathType {
  key: string;
  url: string;
  title: string;
  Component?: LazyExoticComponent<React.ComponentType>;
  isBack?: boolean;
  isNew?: boolean;
}

export enum PathTitles {
  Landing = "Landing",
  Main = "Main",
}

export const paths: PathType[] = [
  {
    key: "/",
    title: PathTitles.Landing,
    url: "/",
    Component: lazy(() => import("../pages/Landing/Landing")),
  },
  {
    key: "/main/:id",
    title: PathTitles.Main,
    url: "/main/:id",
    Component: lazy(() => import("../pages/Main/Main")),
    isBack: true,
    isNew: true,
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

export const GetHeaderInfo = (
  url: string
): { isBackIcon: boolean; isNewBtn: boolean } => {
  const result = {
    isBackIcon: false,
    isNewBtn: false,
  };

  const currentPath = paths.filter((path) => path.url === url);

  if (currentPath.length > 0) {
    const currentPathItem = currentPath[0];

    result.isBackIcon = currentPathItem.isBack ?? false;
    result.isNewBtn = currentPathItem.isNew ?? false;
  }

  return result;
};
