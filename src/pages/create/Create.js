import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";

// hooks
import { useTheme } from "../../hooks/useTheme";

// styles
import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngrdient, setNewIngrdient] = useState("");
  const [ingredients, setIngredients] = useState("");
  const ingredientInput = useRef(null);
  const history = useHistory();
  const { color, mode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    };

    try {
      await projectFirestore.collection("recipes").add(doc);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngrdient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngrdient("");
    ingredientInput.current.focus();
  };

  return (
    <div className="create">
      <h2 className={`page-title ${mode}`}>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngrdient(e.target.value)}
              value={newIngrdient}
              ref={ingredientInput}
            />
            <button
              className="btn"
              onClick={handleAdd}
              style={{ background: color }}
            >
              Add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:{" "}
          {ingredients && ingredients.map((i) => <em key={i}>{i}, </em>)}
        </p>

        <label>
          <span>Recipe Method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn" style={{ background: color }}>
          submit
        </button>
      </form>
    </div>
  );
}
