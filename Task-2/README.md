# Task 2 - FashionHub E-Commerce Store

## Purpose
The purpose of this task is to create a dynamic e-commerce frontend interface for a fashion store called "FashionHub". It emphasizes product showcasing, shopping cart functionality, and responsive UI design across different device sizes.

## Flow
1. **Hero Section**: Introduces the summer collection with featured floating cards that animate.
2. **Category Selection**: Allows users to filter products based on their target demographic.
3. **Product Grid**: A dynamic product catalog generated from Javascript where users can filter between all, men, women, and accessories.
4. **Cart Modal**: Clicking the shopping cart on the navbar opens a modal where users can increase, decrease, or remove products and see the real-time total price.
5. **Theme Switching**: Includes a dark/light mode toggle in the navbar that actively alters the CSS and saves to LocalStorage.

## Fixes Implemented
- The **Shopping Cart button** in the navbar was completely missing its Bootstrap attributes to open the Modal, meaning you couldn't view your cart! I added the `data-bs-toggle` and `data-bs-target` so you can now view items you add to the cart. 
- The items inside the cart incorrectly displayed a generic shirt icon instead of their actual product images. This was fixed in `script.js`.

## How to Run
1. Open the `Task-2` folder.
2. Double-click the `index.html` file to open it in your web browser. 
3. Try adding items to your cart, and then click the Shopping Cart icon in the top right to see your changes!
