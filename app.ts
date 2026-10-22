import express from "express";
import userRouter from "./router/user.js";
import postRouter from "./router/post.js";

const app = express();
const port = 3000;




app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, World!");
});

app.use("/users", userRouter);
app.use("/posts", postRouter);



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

