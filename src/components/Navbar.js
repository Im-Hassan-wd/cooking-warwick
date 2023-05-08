import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

// styles
import "./Navbar.css";

//components
import Searchbar from "./Seachbar";

export default function Navbar() {
  const { color } = useTheme();

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link className="brand" to="/">
          <h1>Coooking Warwick</h1>
        </Link>
        <Searchbar />
        <Link to="create">Create Recipe</Link>
      </nav>
    </div>
  );
}
