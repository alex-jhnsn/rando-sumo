import { cars } from "./data/cars.js";

export const randomCategory = () => {
  return cars[Math.floor(Math.random()*cars.length)].name;
};

export const randomCar = ( category ) => {
  const selectedCategory = cars.find(c => c.name === category).cars;
  return selectedCategory[Math.floor(Math.random()*selectedCategory.length)].name;
};