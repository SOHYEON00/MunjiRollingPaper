import DefaultLayout from "common/Layout/DefaultLayout";
import * as React from "react";
import { Suspense } from "react";
import { PopupProvider } from "react-popup-manager";
import { Route, Routes } from "react-router-dom";
import { paths } from "./path";

const Router = () => {
  return (
    <PopupProvider>
      <DefaultLayout>
        <Suspense fallback={<div></div>}>
          <Routes>
            {paths.map((path) => {
              const { Component, url, key } = path;
              const element = (<Component />) as React.ReactElement;
              return <Route key={key} path={url} element={element} />;
            })}
          </Routes>
        </Suspense>
      </DefaultLayout>
    </PopupProvider>
  );
};

export default Router;
