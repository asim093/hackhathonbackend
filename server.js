import express from "express";
import dotenv from "dotenv";
import userroutes from "./src/routes/UserRoutes.js";
import categoryRoutes from './src/routes/CategoryRoutes.js'
import connectDb from "./src/db/index.js";
import loanroutes from './src/routes/loan.routes.js'
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000

app.use(cors({
  origin: 'http://localhost:5173' 
}));

app.use(express.json());

app.use("/auth", userroutes);
app.use('/category' , categoryRoutes )
app.use('/loan' , loanroutes )

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });
