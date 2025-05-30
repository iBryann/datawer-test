import { BrowserRouter, Route, Routes } from 'react-router';

import { Home, SignIn } from '../pages';

export const PageNotFound = () => {
  return <>Página não encontrada</>;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<SignIn />}
        />

        <Route
          path='/home'
          element={<Home />}
        />

        <Route
          path='*'
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
};
