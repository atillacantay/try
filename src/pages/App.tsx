import RequireAuth from "components/RequireAuth";
import { AuthProvider } from "composables/useAuth";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/App";
import MainLayout from "../layouts/Main";
import Recommendations from "./App/Recommendations";
import Landing from "./Landing";
import Login from "./Login";
import Register from "./Register";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/app" element={<AppLayout />}>
          <Route
            path="/app/recs"
            element={
              <RequireAuth>
                <Recommendations />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
