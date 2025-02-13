import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { JSX } from "react";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { PostPage } from "./pages/PostPage/PostPage";
import { CssBaseline } from "@mui/material";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <CssBaseline />
      <Provider store={store}>
        <PersistGate IsLoading={null} persistor={persistor}>
          <HashRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route
                path="/post/:id"
                element={
                  <PrivateRoute>
                    <PostPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </HashRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
