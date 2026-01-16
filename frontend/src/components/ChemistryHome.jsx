import ExperimentCard from "./ExperimentCard";

const ChemistryHome = () => {
  return (
    <div>
      <h1>Chemistry Virtual Lab</h1>
      <p>Explore interactive chemistry experiments</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <ExperimentCard
          title="Chemistry Equipment"
          description="Learn about laboratory apparatus"
          link="/chemistry/chemistry-equipment"
        />

        <ExperimentCard
          title="Volcano Experiment"
          description="Visualize a chemical reaction"
          link="/chemistry/volcano-experiment"
        />

        <ExperimentCard
          title="Condenser"
          description="Understand distillation apparatus"
          link="/chemistry/condenser"
        />
      </div>
    </div>
  );
};

export default ChemistryHome;
