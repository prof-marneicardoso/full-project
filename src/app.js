import cors from "cors";
import env from "dotenv";
import express from "express";
import userRoutes from "./routes/user.routes";
// import productRoutes from "./routes/product.routes";
// import categoryRoutes from "./routes/category.routes";

env.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);

export default app;
