import ExperimentCard from "./ExperimentCard";

const PhysicsHome = () => {
  return (
    <div>
      <h1>Physics Virtual Lab</h1>
      <p>Explore interactive physics experiments</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <ExperimentCard
          title="Velocity & Acceleration"
          description="Understand motion concepts"
          link="/physics/velocity-acceleration"
        />

        <ExperimentCard
          title="Magnetic Field (Two Wires)"
          description="Interaction of magnetic fields"
          link="/physics/magnetic-field-wires"
        />

        <ExperimentCard
          title="Right-Hand Thumb Rule"
          description="Direction of magnetic field"
          link="/physics/thumb-rule"
        />

        <ExperimentCard
          title="Magnetic Field Direction"
          description="Field around straight conductor"
          link="/physics/magnetic-field-direction"
        />
      </div>
    </div>
  );
};

export default PhysicsHome;
