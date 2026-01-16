import SubjectCard from "../components/SubjectCard";

const Home = () => {
  return (
    <div style={{ padding: "24px" }}>
      <h1>Virtual Science Lab</h1>
      <p>Explore interactive Biology, Chemistry, and Physics experiments</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          marginTop: "32px",
        }}
      >
        <SubjectCard
          title="Biology"
          description="Human anatomy and cell structures in 3D"
          link="/biology"
        />

        <SubjectCard
          title="Chemistry"
          description="Chemical reactions and laboratory apparatus"
          link="/chemistry"
        />

        <SubjectCard
          title="Physics"
          description="Motion, magnetism, and physical laws"
          link="/physics"
        />
      </div>
    </div>
  );
};

export default Home;
