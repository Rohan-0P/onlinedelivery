import React, { createContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  cartItems: [],
  orders: [], // Array to store the user's orders
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    
    case 'REMOVE_FROM_CART':
      return { ...state, cartItems: state.cartItems.filter(item => item.id !== action.payload.id) };
    
    case 'INCREMENT_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.name === action.payload.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    
    case 'DECREMENT_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.name === action.payload.name && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    
    case 'CLEAR_CART':
      return { ...state, cartItems: [] }; // Clear the cart after placing an order
    
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] }; // Add the order to the orders array
    
    case 'PLACE_ORDER':
      return {
        ...state,
        orders: [
          ...state.orders, 
          { 
            items: state.cartItems, 
            total: action.payload.total, 
            date: action.payload.date 
          }
        ],
        cartItems: [] 
      };

    default:
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);


  const addOrder = (order) => {
    dispatch({ type: 'ADD_ORDER', payload: order });
  };

  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Function to handle order placement
  const placeOrder = (totalAmount) => { 
    console.log(totalAmount)
    const order = {
      items: state.cartItems,
      total: totalAmount,
      date: new Date().toLocaleDateString(), // Store current date
    };
    dispatch({ type: 'PLACE_ORDER', payload: order });
    clearCart(); // Clear the cart after placing the order
  }; 
  const exampleCartItems = [
    {
      id: 1, // Unique identifier for each item
      name: 'Product Name',
      price: 10.99,
      quantity: 2,
      img: 'url_to_image.jpg' // Image URL
    },
    // Add more items as needed
  ];
  

  return (
    <CartContext.Provider value={{ 
      cartItems: state.cartItems, 
      orders: state.orders, 
      dispatch, 
      addOrder, 
      clearCart, 
      placeOrder 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
