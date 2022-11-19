import { Route, Routes } from "react-router-dom";
import CreatePostComponent from "../components/organism/CreatePostComponent";
import { useAppSelector } from "../hooks/stateHooks";

import Home from "../screen/Home";
import Profile from "../screen/Profile";
import { RootState } from "../store/store";

const Router = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<CreatePostComponent />} />
      <Route path="profile" element={isAuthenticated ? <Profile /> : <Home />}>
        <Route
          path=":username"
          element={isAuthenticated ? <Profile /> : <Home />}
        ></Route>
      </Route>
      <Route path="*" element={<p>Not Found 404</p>} />
    </Routes>
  );
};

export default Router;
