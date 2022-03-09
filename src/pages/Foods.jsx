import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import getFoodsAPI from '../services/getFoodsAPI';
import getFoodsCategoriesAPI from '../services/getFoodsCategoriesAPI';
import getFoodsByCategoryAPI from '../services/getFoodsByCategoryAPI';

function Foods() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchFoods = async () => {
    const res = await getFoodsAPI();
    setFoods(res);
  };

  useEffect(() => {
    fetchFoods();

    const fetchCategories = async () => {
      const res = await getFoodsCategoriesAPI();
      setCategories(res);
    };
    fetchCategories();
  }, []);

  const handleClickCategories = ({ target }) => {
    if (selectedCategory === target.value) {
      fetchFoods();
      setSelectedCategory('');
    } else {
      const fetchFoodsByCategory = async () => {
        const res = await getFoodsByCategoryAPI(target.value);
        setFoods(res);
      };
      fetchFoodsByCategory();
      setSelectedCategory(target.value);
    }
  };

  if (foods.length === 0) return <h3>Carrengando...</h3>;

  return (
    <>
      <h1>Foods</h1>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ fetchFoods }
      >
        All
      </button>
      {
        categories.map((categorie) => (
          <button
            type="button"
            key={ categorie.strCategory }
            data-testid={ `${categorie.strCategory}-category-filter` }
            value={ categorie.strCategory }
            onClick={ handleClickCategories }
          >
            { categorie.strCategory }
          </button>
        ))
      }
      {
        foods.map((food, index) => (
          <div
            key={ food.idMeal }
            data-testid={ `${index}-recipe-card` }
          >
            <Link to={ `/foods/${food.idMeal}` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ food.strMealThumb }
                alt={ food.strMeal }
              />
              <h5 data-testid={ `${index}-card-name` }>{ food.strMeal }</h5>
            </Link>
          </div>
        ))
      }
    </>
  );
}

export default Foods;