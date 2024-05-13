import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const baseUrl = `https://react-food-order-71313-default-rtdb.asia-southeast1.firebasedatabase.app/`;
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);

      const response = await fetch(`${baseUrl}/meals`, {});
      const responseData = await response.json();
      const loadedData = [];

      if (!response.ok) {
        throw new Error("Something went wrong, Could not load meals:");
      }

      for (const key in responseData) {
        loadedData.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedData);
      setIsLoading(false);
    };

    fetchMeals().catch((e) => {
      setIsLoading(false);
      setError(e.message);
    });
  }, []);

  const mealsList = meals.map((meal) => {
    return <MealItem key={meal.id} meal={meal} />;
  });

  if (isLoading) {
    return (
      <section className={classes["is-loading"]}>
        <p>Loading Meals, Please Wait...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes["is-error"]}>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
