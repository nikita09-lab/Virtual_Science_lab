import { Routes, Route } from "react-router-dom";
import BiologyLayout from "../components/BiologyLayout";
import BiologyHome from "../components/BiologyHome";

import HumanBody from "../experiments/biology/HumanBody";
import Mitochondria from "../experiments/biology/Mitochondria";
import Eye from "../experiments/biology/Eye";
import Kidney from "../experiments/biology/Kidney";

const Biology = () => {
  return (
    <Routes>
      <Route element={<BiologyLayout />}>
        <Route index element={<BiologyHome />} />
        <Route path="human-body" element={<HumanBody />} />
        <Route path="mitochondria" element={<Mitochondria />} />
        <Route path="eye" element={<Eye />} />
        <Route path="kidney" element={<Kidney />} />
      </Route>
    </Routes>
  );
};

export default Biology;
