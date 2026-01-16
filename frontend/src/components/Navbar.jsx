import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      {/* Logo */}
      <h2 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Virtual Science Lab
        </Link>
      </h2>

      {/* Links + Theme Toggle */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link style={linkStyle} to="/biology">Biology</Link>
        <Link style={linkStyle} to="/chemistry">Chemistry</Link>
        <Link style={linkStyle} to="/physics">Physics</Link>

        <button
          onClick={toggleTheme}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "18px",
          }}
          title="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  fontWeight: "500",
};

export default Navbar;
