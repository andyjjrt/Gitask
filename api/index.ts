import { createServer } from "node:http";
import { createApp, eventHandler, toNodeListener } from "h3";
import * as dotenv from "dotenv";
dotenv.config();

import oauthRoute from "./routes/oauth";
import taskRoute from "./routes/task";
import userRoute from "./routes/user";

const app = createApp();
app.use(oauthRoute);
app.use(taskRoute);
app.use(userRoute);
app.use(
  "/",
  eventHandler(() => "Hello world!")
);

createServer(toNodeListener(app)).listen(process.env.PORT || 3001);
