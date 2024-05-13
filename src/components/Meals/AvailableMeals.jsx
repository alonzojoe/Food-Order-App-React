import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const url = `https://react-food-order-71313-default-rtdb.asia-southeast1.firebasedatabase.app/`;
const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(`${url}/meals.json`, {});
      const responseData = await response.json();
      const loadedData = [];

      for (const key in responseData) {
        loadedData.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedData);
    };

    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => {
    return <MealItem key={meal.id} meal={meal} />;
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
