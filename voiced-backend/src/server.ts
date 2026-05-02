import app from "./app";
import { checkEnv, env } from "./config/env";

checkEnv();

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});