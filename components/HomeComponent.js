// src/components/HomeComponent.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeComponent = ({ imagesList, currentIndex, rotationAngle, rotateClockwise, rotateCounterclockwise }) => {
  const navigate = useNavigate();

  const items = [
    {
      title: "Green Goddess Chicken Salad",
      price: "$32",
      description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet",
      mealType: 'breakfast',
    },
    {
      title: "Mediterranean Quinoa Bowl",
      price: "$28",
      description: "Healthy quinoa mixed with fresh vegetables and a light dressing.",
      mealType: 'lunch',
    },
    {
      title: "Spaghetti Bolognese",
      price: "$25",
      description: "Traditional Italian pasta with a rich meat sauce.",
      mealType: 'dinner',
    },
    {
      title: "Bolose",
      price: "$20",
      description: "Systemioh huiy sta with a rich mint sauce.",
      mealType: 'dinner',
    },
    {
      title: "Leot Chawalkadduhamjar",
      price: "$15",
      description: "Egg white mixed with fresh veges and fruits and a lime water.",
      mealType: 'lunch',
    },
    {
      title: "Grilled Salmon with Asparagus",
      price: "$30",
      description: "Delicious grilled salmon served with fresh asparagus.",
      mealType: 'dinner',
    },
  ];

  // Determine the index for highlighting
  const safeIndex = currentIndex >= 0 && currentIndex < items.length ? currentIndex : 0;
  const currentItem = items[safeIndex];

  const handleAddToCart = () => {
    navigate(`/${currentItem.mealType}`);
  };

  return (
    <>
      <div className="beige-circle"></div>
      <div className="content">
        <h1>{currentItem.price}</h1>
        <h2>{currentItem.title}</h2>
        <p>{currentItem.description}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <div className="image-container">
        <div className="main-image">
          <img src={imagesList[safeIndex]} alt="Main Food" />
        </div>
        <div className="orbit" style={{ transform: `rotate(${rotationAngle}deg)` }}>
          {imagesList.map((image, index) => (
            <div 
              key={index} 
              className={`small-image small-image-${index + 1} ${index === safeIndex ? 'highlight' : ''}`} // Highlight the current dish
              onClick={() => rotateClockwise(index)} 
            >
              <img src={image} alt={`Food ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className="nav-button up-button" onClick={rotateClockwise}>↑</button>
        <button className="nav-button down-button" onClick={rotateCounterclockwise}>↓</button>
      </div>
    </>
  );
};

export default HomeComponent;
