import { Routes, Route } from "react-router-dom";
import ChemistryLayout from "../components/ChemistryLayout";
import ChemistryHome from "../components/ChemistryHome";

import ChemistryEquipment from "../experiments/chemistry/ChemistryEquipment";
import Condenser from "../experiments/chemistry/Condenser";
import VolcanoExperiment from "../experiments/chemistry/VolcanoExperiment";

const Chemistry = () => {
  return (
    <Routes>
      <Route element={<ChemistryLayout />}>
        <Route index element={<ChemistryHome />} />
        <Route
          path="chemistry-equipment"
          element={<ChemistryEquipment />}
        />
        <Route path="condenser" element={<Condenser />} />
        <Route
          path="volcano-experiment"
          element={<VolcanoExperiment />}
        />
      </Route>
    </Routes>
  );
};

export default Chemistry;
