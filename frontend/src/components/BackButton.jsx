import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Back" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        padding: "8px 16px",
        marginBottom: "16px",
        backgroundColor: "#1e293b",
        color: "#ffffff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "14px",
      }}
    >
      ← {label}
    </button>
  );
};

export default BackButton;
