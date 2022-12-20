import axios from "axios";
import React, { useEffect } from "react";

const Something = () => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/products");

      console.log(response);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <div>Something</div>;
};

export default Something;
