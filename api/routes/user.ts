import { APIResponse } from "../objects/APIResponse";
import { eventHandler, createRouter, getHeader } from "h3";
import fetch from "node-fetch";
import * as dotenv from "dotenv";
import type { User } from "../type/user";
dotenv.config();

const router = createRouter();

router.get(
  "/api/user",
  eventHandler(async (event) => {
    const token = getHeader(event, "authorization") || "";
    const response = await fetch(`https://api.github.com/user`, {
      headers: {
        accept: "application/vnd.github+json",
        authorization: token,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    const data = (await response.json()) as User;
    return new APIResponse(response.status === 200, {
      login: data.login,
      id: data.id,
      node_id: data.node_id,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      name: data.name,
    }).json();
  })
);

export default router;
