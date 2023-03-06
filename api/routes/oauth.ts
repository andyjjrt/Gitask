import { APIResponse } from '../objects/APIResponse';
import { eventHandler, createRouter, sendRedirect, readBody } from "h3";
import fetch from "node-fetch";
import * as dotenv from "dotenv";
dotenv.config();

const router = createRouter();

router.get(
  "/oauth/login",
  eventHandler((event) =>
    sendRedirect(
      event,
      `https://github.com/login/oauth/authorize?client_id=${process.env.VITE_GITHUB_OAUTH_CLIENT_ID}&redirect_uri=${process.env.VITE_GITHUUB_OAUTH_REDIRECT_URI}&scope=repo&state=123`
    )
  )
);

router.post(
  "/oauth/code",
  eventHandler(async (event) => {
    const body = await readBody(event);
    const { code } = body;
    const response = await fetch(
      `https://github.com/login/oauth/access_token?client_id=${
        process.env.VITE_GITHUB_OAUTH_CLIENT_ID
      }&client_secret=${
        process.env.VITE_GITHUB_OAUTH_CLIENT_SECRET
      }&code=${code}`,
      {
        method: "post",
        headers: {
          accept: "application/json"
        }
      }
    );
    const data: any = await response.json();
    return new APIResponse(data.hasOwnProperty("access_token"), data).json()
  })
);

export default router;
