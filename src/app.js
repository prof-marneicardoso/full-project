import cors from "cors";
import env from "dotenv";
import express from "express";
import userRoutes from "./routes/user.routes.js";
// import productRoutes from "./routes/product.routes.js";
// import categoryRoutes from "./routes/category.routes.js";

// env.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);

export default app;
