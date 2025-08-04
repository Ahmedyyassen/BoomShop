import express from 'express';
import { createServer } from "http";
import cors from'cors';
import { CLIENT_API, NODE_ENV, PORT } from './constant/env';
import connectDB from './config/db';
import errorHandler from './middleware/errorHandler';
import routes from './routes';
import cookieParser from "cookie-parser";
import notFoundHandler from './middleware/notFoundHandler';


const app = express();
const server = createServer(app);

app.use(cors({
  origin: CLIENT_API,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api", routes());

app.get('/', (req, res) => {
  res.send('Hello World, from server');
});

app.use(errorHandler);
app.use(notFoundHandler);

connectDB().then(()=>{
  if (NODE_ENV !== "production") {
    server.listen(PORT, () => {
      console.log(`Server is running at ${NODE_ENV} mode, on http://localhost:${PORT}`);
    });
  }
});
export default app;