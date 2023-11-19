import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import Players from "pages/Players";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Players/:id" element={<Players />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
