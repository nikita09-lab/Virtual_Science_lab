import { Link } from "react-router-dom";

const ExperimentCard = ({ title, description, link }) => {
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <div className="experiment-card card fade-in">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default ExperimentCard;
