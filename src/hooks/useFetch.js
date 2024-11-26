import { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const useFetch = (url, method = "GET", body = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    let options = {};

    if (method === "POST") {
        options.method = "POST";
        options.body = body;
    } else {
        options.method = method;
    }

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(API_URL + url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    fetchData();
  }, [url]);

  return data;
};

export default useFetch;