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
          element={<Home />}
        />
        <Route
          path='/login'
          element={<SignIn />}
        />
        <Route
          path='*'
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
};
