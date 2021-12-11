import { AuthProvider } from "composables/useAuth";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/Main";
import Recommendations from "./App/Recommendations";
import Landing from "./Landing";
import Login from "./Login";
import Register from "./Register";

const App = () => {
  return (
    <AuthProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app/recs" element={<Recommendations />} />
        </Routes>
      </MainLayout>
    </AuthProvider>
  );
};

export default App;
