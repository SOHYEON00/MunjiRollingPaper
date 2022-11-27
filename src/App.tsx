import React, { Suspense } from "react";
import "./App.css";
import DefaultLayout from "common/Layout/DefaultLayout";

function App() {
  return (
    <Suspense>
      <DefaultLayout></DefaultLayout>
    </Suspense>
  );
}

export default App;
