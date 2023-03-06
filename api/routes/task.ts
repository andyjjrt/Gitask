import { APIResponse } from "../objects/APIResponse";
import { eventHandler, createRouter, getQuery, getHeader } from "h3";
import fetch from "node-fetch";
import * as dotenv from "dotenv";
import type { Task } from "../type/task";
dotenv.config();

const router = createRouter();

router.get(
  "/api/task",
  eventHandler(async (event) => {
    const { state = "open", page = 1 } = getQuery(event);
    const token = getHeader(event, "authorization") || "";
    const response = await fetch(
      `https://api.github.com/repos/${process.env.TARGET_REPO_OWNER}/${process.env.TARGET_REPO_NAME}/issues?state=${state}&per_page=10&page=${page}`,
      {
        headers: {
          accept: "application/vnd.github+json",
          authorization: token,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    const data = await response.json() as Task[];
    return new APIResponse(
      response.status === 200,
      data.map((task) => ({
        id: task.id,
        node_id: task.node_id,
        number: task.number,
        state: task.state,
        title: task.title,
        body: task.body,
        reactions: task.reactions,
      }))
    ).json();
  })
);

router.post(
  "/api/task/add",
  eventHandler(async (event) => {
    const token = getHeader(event, "authorization") || "";
    const response = await fetch(
      `https://api.github.com/repos/${process.env.TARGET_REPO_OWNER}/${process.env.TARGET_REPO_NAME}/issues`,
      {
        method: "post",
        headers: {
          accept: "application/vnd.github+json",
          authorization: token,
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({
          title: "Testing api",
          body: "Testing api",
        }),
      }
    );
    const data = await response.json();
    return new APIResponse(response.status === 200, data).json();
  })
);

export default router;
