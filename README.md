# E-Commerce Site

This is a full-featured e-commerce web application built using the MERN stack (MongoDB, Express, React, Node.js). The application allows users to browse products, add items to their cart, and manage their shopping cart. It also includes user authentication and authorization features.

## Features

- User Authentication (Login/Register)
- Browse Products
- Add Products to Cart
- View and Manage Shopping Cart
- Responsive Design for Mobile, Tablet, and Desktop
- Integration with Backend APIs
- Secure Routes with Session Storage

## Technologies Used

- Frontend:
  - React
  - Bootstrap
  - CSS
- Backend:
  - Node.js
  - Express
  - MongoDB
  - Axios
- Tools:
  - Git
  - Visual Studio Code

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/e-commerce-site.git
   cd e-commerce-site
2. **Install dependencies for both frontend and backend:**


    For the Backend:

    ```sh
      cd backend
      npm install 
    ```
    For the Frontend:

    ```sh
      cd frontend
      npm install
    ```

3. **Set up environment variables:**


    Create a .env file in the backend directory and add your MongoDB URI and other necessary environment variables:

    ```sh
      MONGO_URI=your-mongodb-uri
      JWT_SECRET=your-jwt-secret
    ```

4. **Run the application:**

    For the backend

      ```sh
        cd backend
        npm start
      ```

    For the frontend
      ```sh
        cd backend
        npm start
      ```

## API Documentation:


### User Authentication:

  1. **Register a New User:**


     - URL: /signup
     - Method: POST
     - Request Body:

  ```sh
    {
        "firstname": "John",
        "lastname" : "Doe"
        "email": "john.doe@example.com",
        "password": "password123"
      }
  ```

  -Success Response:
  ```sh
    {
        message : "Registered Successfully"
      }
  ```
2. **User Login:**


     - URL: /login
     - Method: POST
     - Request Body:
```sh
  {
  "email": "john.doe@example.com",
  "password": "password123"
  }
```
  -Success Response:
```sh
  {
    message : "Login Successfully",
    data : {
            token : "Token String generated from JWT",
            userID : "User ID String"
          }
  }
```


### Products:
1. **Get All Products:**


     - URL: /api/products
     - Method: GET
     - Request Body:
```sh
  {
  headers : {
              authorization : "Token String Value"
                }
  }
```
  -Success Response:
```sh
  {
    message: "Successfully retrieved all products", 
    
  "data": [
    {
      "id": "product_id",
      "name": "Product Name",
      "description": "Product Description",
      "price": 100,
      "image": "product_image_url"
    },
    ...
  ]
}
  
```


2. **Get Product Details by ID**


     - URL: /api/product/:id
     - Method: GET
     - Request Body:
```sh
  {
  headers : {
              authorization : "Token String Value"
                }
  }
```
  -Success Response:
```sh
  {
    message: "Product Retrived", 
    data: {
        "id": "product_id",
        "name": "Product Name",
        "description": "Product Description",
        "price": 100,
        "image": "product_image_url"
}

  }
```
    

### Cart:
1. **Get Cart Count**


     - URL: /api/cartCount/:userId
     - Method: GET
     - Request Body:
```sh
  {
  headers : {
              authorization : "Token String Value"
                }
  }
```
  -Success Response:
```sh
  {
  "data": {
    "count": 5
  }
}

```

2. **Add Product to Cartt**


     - URL: /api/cart
     - Method: POST
     - Request Body:
```sh
  {
  headers : {
              authorization : "Token String Value"
                }
  },
  {
    "userId": "user_id",
    "productId": "product_id",
    "quantity": 1
}

```
  -Success Response:
```sh
 {
  "message": "Product added to cart"
}

```

3. **Update Cart**


     - URL: /api/updateCart/:productID
     - Method: PUT
     - URL Params:productID=[string]
     - Request Body:
```sh
  {
  headers : {
              authorization : "Token String Value"
                }
  },
  {
    "userId": "user_id",
    "quantity": 2
}

```
  -Success Response:
```sh
 {
  "message": "Cart updated"
}

```

4. **Remove Product from Cart**


     - URL: /api/removeFromCart/:productID
     - Method: DELETE
     - URL Params:productID=[string]
     - Request Body:
```sh
  {
  headers : {
              authorization : "Token String Value"
                }
  },
  {
    "userId": "user_id",
}

```
  -Success Response:
```sh
 {
  "message": "Cart updated"
}

```

5. **Check Product in Cart**


     - URL: /api/cart/check-product/:productID
     - Method: POST
     - URL Params:productID=[string]
     - Request Body:
```sh
  {
  headers : {
              authorization : "Token String Value"
                }
  },
  {
    "userId": "user_id",
}

```
  -Success Response:
```sh
 {
  { message: "Product found in cart", 
      data: 
          { productID: product.productID, quantity: product.quantity 
        } 
  }
}

```


## Frontend Documentation

### Overview of the Frontend Structure and Components

The frontend of this e-commerce application is built using React, Bootstrap, and CSS. Below is an overview of the main structure and components used:

- `src/components`: Contains reusable React components that are used across various parts of the application.
  - `Cart.js`: Component for displaying the cart icon, cart count, and contains Home and Logout buttons.
  - `HandleCart.js` : Component for displaying the whole cart which includes Total Products in the cart and also contains summary part
  - `Product.js`: Component for displaying individual product details.
  - `ProductList.js`: Component for displaying a list of products.
  - `banner.js` : Component for displaying banner in the main page
- `src/pages`: Contains React components representing different pages/routes in the application.
  - `Home.js`: Home page of the application displaying all products.
  - `Product.js`: Page for displaying detailed information about a single product.
  - `CartPage.js`: Page for viewing and managing the shopping cart.
  - `Login.js`: Page for user login.
  - `Signup.js`: Page for user registration.
- `src/App.js`: The main application component that includes routing and wraps all the pages.

### Explanation of How Data is Fetched and Displayed

Data fetching and display are handled using React hooks and Axios for making HTTP requests to the backend APIs.

1. **Fetching Data:**
   - Data is fetched using the `useEffect` hook combined with Axios for making API requests.
   - Example: Fetching cart count in `Cart.js`
     ```javascript
     useEffect(() => {
       axios.get(`http://shashanks-macbook-air.local:8080/api/cartCount/${userID}`, { headers: { "authorization": window.sessionStorage.getItem("token") } })
         .then((res) => {
           setTotalItems(res.data.data.count);
         });
     }, []);
     ```
   - This ensures that the cart count is fetched when the component mounts and whenever there is a change in the dependencies.

2. **Displaying Data:**
   - Fetched data is stored in the component's state using the `useState` hook.
   - Example: Displaying the cart count in `Cart.js`
     ```javascript
     return (
       <div className='container-fluid '>
         <div className='row '>
           <div className='col-12 d-flex flex-row justify-content-between'>
             <div className='m-3' onClick={handleHome}>
               <i class="bi bi-house h1"></i>
             </div>
             <div className='m-3' onClick={handleClick}>
               <i className="bi bi-cart h1"></i>
               <span class='badge badge-warning' id='lblCartCount'> {totalItems} </span>
             </div>
             <div className='m-3'>
               <i class="bi bi-box-arrow-left h1" onClick={handleLogout}></i>
             </div>
           </div>
         </div>
       </div>
     );
     ```
   - The `totalItems` state variable is dynamically updated with the fetched data and displayed within the cart icon.

This approach ensures that the frontend stays synchronized with the backend data, providing a dynamic and responsive user experience.


## Additional Notes

- **Initial Login:** When starting the web application, it directs to the login page. Make sure to sign up first if you don't have an account.
- **Required Technologies:** Ensure that the device running the web application has all the required technologies installed, including Node.js, MongoDB, and any other dependencies listed in the `package.json` files.
- **Troubleshooting:** If you encounter any issues or if something doesn't work as expected, please feel free to contact me at shashankalampally143@gmail.com.

These notes should help users get started with the project and address any potential issues they might face during setup and usage.

