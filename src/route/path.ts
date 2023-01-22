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
  Memo = "Memo",
  Contents = "Contents",
  Contents_Position = "Contents_Position",
}

export const paths: PathType[] = [
  {
    key: "/",
    title: PathTitles.Landing,
    url: "/",
    Component: lazy(() => import("../pages/Landing/Landing")),
    isNew: false,
    isBack: false,
  },
  {
    key: "/main/:id",
    title: PathTitles.Main,
    url: "/main/:id",
    Component: lazy(() => import("../pages/Main/Main")),
    isBack: false,
  },
  {
    key: "/main/memo/:id",
    title: PathTitles.Memo,
    url: "/main/memo/:id",
    Component: lazy(() => import("../pages/SelectMemo/SelectMemo")),
    isBack: false,
  },
  {
    key: "/main/contents/:id",
    title: PathTitles.Contents,
    url: "/main/contents/:id",
    Component: lazy(() => import("../pages/Contents/Contents")),
    isBack: false,
  },
  {
    key: "/main/contents/position/:id",
    title: PathTitles.Contents_Position,
    url: "/main/contents/position/:id",
    Component: lazy(() => import("../pages/ContentsPosition/ContentsPosition")),
    isBack: false,
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
  url: string,
  params: any
): { isBackIcon: boolean; isNewBtn: boolean } => {
  const result = {
    isBackIcon: false,
    isNewBtn: false,
  };

  if (url && params) {
    const keys = Object.keys(params);
    let originUrl = url;

    keys.forEach(
      (key) => (originUrl = originUrl.replace(params[key], `:${key}`))
    );

    const currentPath = paths.filter((path) => path.url === originUrl);

    if (currentPath.length > 0) {
      const currentPathItem = currentPath[0];
      result.isBackIcon = currentPathItem.isBack ?? true;
      result.isNewBtn = currentPathItem.isNew ?? true;
    }
  }

  return result;
};
