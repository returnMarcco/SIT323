// Imports
const express = require('express');
const res = require('express/lib/response');
const { MongoClient, ServerApiVersion } = require('mongodb');

// End of Imports

/**
 * ----------------------------------------------
 * SIT323: 8.1P
 * ----------------------------------------------
 */

/**
 * ----------------------------------------------
 * MongoDB Driver Config
 * ----------------------------------------------
 */

const uri = 'mongodb://admin:password@localhost:32000/';

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

/**
 * Test connection to the MongoDB database.
 *
 * https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/#std-label-node-connect-to-mongodb
 *
 * @returns {Promise<void>}
 */
async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

const myDb         = client.db('calculator_event_store');
const myCollection = myDb.collection('arithmetic_event_source');

// End of Db config.

/**
 * ----------------------------------------------
 * Helpers
 * ----------------------------------------------
 */

/**
 * Takes two numbers, checks their types, and throws the appropriate error if necessary.
 *
 * @param num1
 * @param num2
 *
 * @returns {Exception|void}
 */
function checkTypeNumberForTwoArgs(num1, num2) {
    if (isNaN(num1)) {
        throw new Error('num1 is not correctly defined');
    } else if (isNaN(num2)) {
        throw new Error('num2 is not correctly defined');
    } else if (isNaN(num1) && isNaN(num2)) {
        throw new Error('Both arguments are not correctly defined');
    }
}

/**
 * Takes one number, checks its type, and throws the appropriate error if necessary.
 *
 * @param num1
 *
 * @returns {Exception|void}
 */
function checkTypeNumberForOneArg(num1) {
    if (isNaN(num1)) {
        throw new Error('num1 is not correctly defined');
    }
}

/**
 * ----------------------------------------------
 * Server-side Calculator Microservice Logic
 * ----------------------------------------------
 */

/**
 * ----------------------------------------------
 * Handler Functions
 * ----------------------------------------------
 */

/**
 * Takes two numbers, adds them to each other, then returns the result.
 *
 * @param num1
 * @param num2
 *
 * @returns {number|null}
 */
const add = (num1, num2) => {
    if (num1 && num2) {
        return (num1 + num2);
    }

    return null;
};

/**
 * Takes two numbers, subtracts them from each other, then returns the result.
 *
 * @param num1
 * @param num2
 *
 * @returns {number|null}
 */
const subtract = (num1, num2) => {
    if (num1 && num2) {
        return (num1 - num2);
    }

    return null;
};

/**
 * Takes two numbers, multiplies them together, then returns the result.
 *
 * @param num1
 * @param num2
 *
 * @returns {number|null}
 */
const multiply = (num1, num2) => {
    if (num1 && num2) {
        return (num1 * num2);
    }

    return null;
};

/**
 * Takes two numbers, divides the first argument by the second, then returns the result.
 *
 * @param num1
 * @param num2
 *
 * @returns {number|null}
 */
const exponential = (num1, num2) => {
    if (num1 && num2) {
        return (num1 ** num2);
    }

    return null;
};

/**
 * Takes a number, squares it, then returns the result.
 *
 * @param num1
 * @param num2
 *
 * @returns {number|null}
 */
const squared = (num1) => {
    if (num1) {
        return (num1 ** 2);
    }

    return null;
};

/**
 * Takes two numbers, finds the square root of the first argument to the power of the second argument,
 * then returns the result.
 *
 * @param num1
 * @param num2
 *
 * @returns {number|null}
 */
const divide = (num1, num2) => {
    if (num1 && num2) {
        return (num1 / num2);
    }

    return null;
};

// Instantiate an express web-server.
const app = express();

/**
 * ----------------------------------------------
 * API Endpoints
 * ----------------------------------------------
 */

/**
 * `GET Add Numbers` endpoint.
 */
app.get('/add', async (req, res) => {
    // err handling
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);

        checkTypeNumberForTwoArgs(num1, num2);

        const result = add(num1, num2);

        const structuredRes = {
            "num_1" : num1,
            "num2"  : num2,
            "sum"   : result,
            "user"  : 'jvellucci@deakin.edu.au'
        };

        const postRes = await myCollection.insertOne(structuredRes);

        res.status(200).json({ httpCode: 200, data: postRes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ httpCode: 500, msg: error.toString() });
    }
});

/**
 * `GET Subtract Numbers` endpoint
 */
app.get('/subtract', (req, res) => {
    // err handling
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);

        checkTypeNumberForTwoArgs(num1, num2);

        const result = subtract(num1, num2);
        res.status(200).json({ httpCode: 200, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ httpCode: 500, msg: error.toString() });
    }
});

/**
 * `Get Multiply Numbers` endpoint
 */
app.get('/multiply', (req, res) => {
    // err handling
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);

        checkTypeNumberForTwoArgs(num1, num2);

        const result = multiply(num1, num2);
        res.status(200).json({ httpCode: 200, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ httpCode: 500, msg: error.toString() });
    }
});

/**
 * `GET divide numbers` endpoint
 */
app.get('/divide', (req, res) => {
    // err handling
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);

        checkTypeNumberForTwoArgs(num1, num2);

        const result = divide(num1, num2);
        res.status(200).json({ httpCode: 200, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ httpCode: 500, msg: error.toString() });
    }
});

/**
 * `GET square root` endpoint
 */
app.get('/squared', (req, res) => {
    // err handling
    try {
        const num1 = parseFloat(req.query.num1);

        checkTypeNumberForOneArg(num1);

        const result = squared(num1);
        res.status(200).json({ httpCode: 200, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ httpCode: 500, msg: error.toString() });
    }
});

/**
 * `GET exponential` endpoint
 */
app.get('/exponential', (req, res) => {
    // err handling
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);

        checkTypeNumberForTwoArgs(num1, num2);

        const result = exponential(num1, num2);
        res.status(200).json({ httpCode: 200, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ httpCode: 500, msg: error.toString() });
    }
});

const port = 3000;

// Set up a listener on port numbered stored in variable `port`.
app.listen(port, () => console.log(`Express Web Server listening on port: ${port}`));