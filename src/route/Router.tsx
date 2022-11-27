import DefaultLayout from "common/Layout/DefaultLayout";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { paths } from "./path";

const Router = () => {
  return (
    <DefaultLayout>
      <BrowserRouter>
        <Routes>
          {paths.map((path) => {
            const { Component, url, key } = path;
            const element = (<Component />) as React.ReactElement;
            return <Route key={key} path={url} element={element} />;
          })}
        </Routes>
      </BrowserRouter>
    </DefaultLayout>
  );
};

export default Router;
