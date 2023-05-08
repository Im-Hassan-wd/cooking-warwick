import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Trash from "../assets/trash.svg";
import { projectFirestore } from "../hooks/firebase/config";
// hooks
import { useTheme } from "../hooks/useTheme";

// styles
import "./RecipeList.css";

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();

  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>;
  }

  const handleClick = (id) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime}</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img
            className="delete"
            src={Trash}
            alt="trash can"
            onClick={() => handleClick(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
}
