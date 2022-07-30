import express from "express";
import bodyParser from 'body-parser'
import userRouter from "./routes/user-route";
import authRouter from "./routes/auth-route";
import * as swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';


const app = express()

const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', userRouter);
app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

