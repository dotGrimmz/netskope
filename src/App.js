
import React, { lazy, Suspense } from "react";

const MovieView = lazy(() => import('./MovieView/MovieView.jsx'));



function App() {
  return (
    <Suspense fallback={<div />}>
      <MovieView />

    </Suspense>
  );
}

export default App;
