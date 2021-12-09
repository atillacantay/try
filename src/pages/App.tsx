import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/Main";
import Landing from "./Landing";
import Register from "./Register";

const App = () => {

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
