/**
 * Jason Mark Vellucci
 * SID: 221437402
 *
 * SIT323 - 2.1P
 *
 * Note: I am commenting each line to prove understanding of the control flow of this application.
 * In the real world, I would ensure that the code is as self-documenting as possible.
 */

// Import the `express` framework-function.
const express = require('express');

// Instantiate an express application using the return value of the `express` function.
const app = express();

// Set the port number of the web server to `3000`.
const port = 3000;

// Set up an event listener for incoming requests on port 3000, execute a handler when the listener
// has been successfully configured.
app.listen(port, () => console.log(`App listening to Port: ${port}`));


/**
 * ---------------------------------------------------------------
 *  MAKING / HANDLING THE HTTP REQUESTS WITH THE EXPRESS SERVER
 * ---------------------------------------------------------------
 */

// Define a function-expression to be used in the request-handling on the server.

/**
 * Takes two numbers, multiplies them, then returns the product.
 *
 * @param factor1
 * @param factor2
 *
 * @returns {number}
 */
const multiplyTwoNumbers = (factor1, factor2) => factor1 * factor2;

// First arg is the endpoint the request is hitting, second arg is the handler for the request.
app.get('/multiply', (req, res) => {
    // Cast the numeric strings from the request-body to numbers.
    const factor1 = parseInt(req.query.factor1);
    const factor2 = parseInt(req.query.factor2);

    // Do the multiplication of the passed-in numbers on the server-side.
    const result = multiplyTwoNumbers(factor1, factor2);

    // Simple validation - return an error if bad data is passed in
    if (result) {
        res.json({ statusCode: 200, data: result });
    } else {
        res.json({ statusCode: 500, data: 'An error has occurred' });
    }
});