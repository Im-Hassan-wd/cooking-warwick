import { useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/config";
import { useTheme } from "../../hooks/useTheme";

// styles
import "./Home.css";

// components
import RecipeList from "../../components/RecipeList";

export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const { mode } = useTheme();

  useEffect(() => {
    setIsPending(true);

    projectFirestore.collection("recipes").onSnapshot((snapshot) => {
      if (snapshot.empty) {
        setError("No recipes to load");
        setIsPending(false);
      } else {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setData(results);
        setIsPending(false);
      }
    });
  }, []);

  return (
    <div className="home">
      {error && <p className={`error ${mode}`}>{error}</p>}
      {isPending && <p className={`loading ${mode}`}>loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
