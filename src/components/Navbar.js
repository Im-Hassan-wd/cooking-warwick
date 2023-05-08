import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

// styles
import "./Navbar.css";
import Searchbar from "./Seachbar";

//components

export default function Navbar() {
  const { color } = useContext(ThemeContext);
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
