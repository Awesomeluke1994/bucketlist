import express from "express";
import bodyParser from 'body-parser'
import {userRouter} from "./routes/user-route";
import {authRouter} from "./routes/auth-route";

const app = express()

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', userRouter);
app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

