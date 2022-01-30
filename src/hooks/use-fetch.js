import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../services/fetchData";

export function useFetch(url) {
  const [State, setState] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState({});
  useEffect(() => {
    if (url) {
      fetchDataFromApi(url)
        .then((res) => {
          setloading(true);
          setState(res);
          setloading(false);
        })
        .catch((err) => setError(err));
    }
  }, []);

  return [State, loading, error];
}
