import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const customerId = localStorage.getItem('customerId');
    const cartKey = `cartItems${customerId}`;
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem(cartKey)) || []);

    useEffect(() => {
        localStorage.setItem(cartKey, JSON.stringify(cartItems));
    }, [cartItems, cartKey]);

    const addToCart = (item) => {
        setCartItems(prevCartItems => [...prevCartItems, item]);
    };

    const removeFromCart = (index) => {
        setCartItems(prevCartItems => prevCartItems.filter((_, i) => i !== index));
    };

    const updateCartItem = (index, item) => {
        setCartItems(prevCartItems => {
            const updatedCartItems = [...prevCartItems];
            updatedCartItems[index] = item;
            return updatedCartItems;
        });
    };

    const setCartItemsForUser = (userId) => {
        const userCartKey = `cartItems${userId}`;
        const storedCartItems = JSON.parse(localStorage.getItem(userCartKey)) || [];
        setCartItems(storedCartItems);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItem, setCartItemsForUser, setCartItems }}>
            {children}
        </CartContext.Provider>
    );
};
