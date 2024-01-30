import { app } from "@/app";
import { LoadEnv } from "./helpers/EnvHelper";

LoadEnv();

const port = process.env.PORT || 3000;

export default () => {
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
    console.log(`Docs on http://localhost:${port}/docs`);
  });
};
