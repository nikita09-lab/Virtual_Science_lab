import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BiologyHome = () => {
  const [experiments, setExperiments] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/biology/experiments")
      .then((res) => res.json())
      .then((data) => setExperiments(data.experiments))
      .catch(() => console.error("Backend not connected"));
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h2>Biology Experiments</h2>

      {experiments.map((exp) => (
        <div key={exp.id} style={{ marginTop: "16px" }}>
          <h4>{exp.title}</h4>
          <p>{exp.description}</p>

          {/* 👇 Backend data → Frontend route */}
          <Link to={exp.slug}>Open Experiment</Link>
        </div>
      ))}
    </div>
  );
};

export default BiologyHome;
