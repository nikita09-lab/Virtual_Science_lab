import ExperimentCard from "./ExperimentCard";

const BiologyHome = () => {
  return (
    <div>
      <h1>Biology Virtual Lab</h1>
      <p>Explore interactive 3D biology experiments</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <ExperimentCard
          title="Human Body Anatomy"
          description="Explore full human body systems in 3D"
          link="/biology/human-body"
        />

        <ExperimentCard
          title="Mitochondria"
          description="Study the powerhouse of the cell"
          link="/biology/mitochondria"
        />

        <ExperimentCard
          title="Eye Anatomy"
          description="Understand structure and function of the eye"
          link="/biology/eye"
        />

        <ExperimentCard
          title="Kidney Anatomy"
          description="Learn how kidneys filter blood"
          link="/biology/kidney"
        />
      </div>
    </div>
  );
};

export default BiologyHome;
