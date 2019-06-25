# Order
An api to retrieve and create orders 

## How to test it locally and in production

### Production

Go to the [api](http://order-orkestro.herokuapp.com/api) and test the endpoints.
 - To create an order, try the ```post/order```  endpoint.
 
 ![](https://i.imgur.com/rwtAQ6H.png)
 
 If you send an invalid data, ex. The wrong status or a number insted of a date, you will not be able to create the order in the database.
 
 - To check your new order is in the database, you can just copy the uuid returned from the ```post/order``` endpoint and copy it in the get orders/{id} endpoint
 -  ![](https://i.imgur.com/KjosjGI.png)

- If you want to check all the orders that are currently in the database, just try the get ```/orders``` endpoint

### Locally

Clone the repo:

    ```git clone https://github.com/rebecacalvo```
    
Run
    ```npm install ```

Run
    ``` npm start ```

Test it out exactly in the same way as described it above.
    
    Run tests:
## To run the tests

```npm run test```

## Technology used
   - Nest.js
## Challenges
-Testing Documentation
- Heroku with ts

#To do 
    - Set up CI
    - Fix it for https -> There is no authentication so for now it is fine if it only runs in http.
 
