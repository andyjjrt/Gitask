import { APIResponse } from "../objects/APIResponse";
import { eventHandler, createRouter, getQuery, getHeader, readBody } from "h3";
import fetch from "node-fetch";
import * as dotenv from "dotenv";
dotenv.config();

import type { Task } from "../type/task";
import { OPEN_LABEL, IN_PROGRESS_LABEL, DONE_LABEL } from "../utils/constants";

const router = createRouter();

router.get(
  "/api/task",
  eventHandler(async (event) => {
    const { state = "open", page = 1, param = "" } = getQuery(event);
    const token = getHeader(event, "authorization") || "";
    const response = await fetch(
      `https://api.github.com/search/issues?q=${param}%20repo:${process.env.TARGET_REPO_OWNER}/${process.env.TARGET_REPO_NAME}%20state:${state}%20is:issue&per_page=10&page=${page}`,
      {
        headers: {
          accept: "application/vnd.github+json",
          authorization: token,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    const data = (await response.json()) as {
      total_count: number;
      items: Task[];
    };
    return new APIResponse(response.status === 200, {
      total: data.total_count,
      items: data.items.map((task) => ({
        id: task.id,
        node_id: task.node_id,
        number: task.number,
        state: task.state,
        title: task.title,
        body: task.body,
        reactions: task.reactions,
        labels: task.labels.map(label => ({
          id: label.id,
          nodeid: label.nodeid,
          name: label.name
        })),
      })),
    }).json();
  })
);

router.post(
  "/api/task/open",
  eventHandler(async (event) => {
    const body = await readBody(event);
    const {
      title,
      description,
    }: { title: string | undefined; description: string | undefined } = body;
    if (!title || title.length == 0)
      return new APIResponse(false, "title is required").json();
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
          title: title,
          body: description,
          labels: [OPEN_LABEL],
        }),
      }
    );
    const data = (await response.json()) as Task;
    return new APIResponse(response.status === 200, {
      id: data.id,
      node_id: data.node_id,
      number: data.number,
      state: data.state,
      title: data.title,
      body: data.body,
      reactions: data.reactions,
      labels: data.labels.map(label => ({
        id: label.id,
        nodeid: label.nodeid,
        name: label.name
      })),
    }).json();
  })
);

export default router;
