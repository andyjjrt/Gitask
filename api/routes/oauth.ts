import { APIResponse } from "../objects/APIResponse";
import { eventHandler, createRouter, sendRedirect, readBody } from "h3";
import fetch from "node-fetch";
import * as dotenv from "dotenv";
dotenv.config();

import type { Label } from "../type/label";
import { OPEN_LABEL, IN_PROGRESS_LABEL, DONE_LABEL } from "../utils/constants";

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
      `https://github.com/login/oauth/access_token?client_id=${process.env.VITE_GITHUB_OAUTH_CLIENT_ID}&client_secret=${process.env.VITE_GITHUB_OAUTH_CLIENT_SECRET}&code=${code}`,
      {
        method: "post",
        headers: {
          accept: "application/json",
        },
      }
    );
    const data: any = await response.json();
    if (!data.hasOwnProperty("access_token") || response.status !== 200)
      return new APIResponse(false, data).json();

    const getLabelResponse = await fetch(
      `https://api.github.com/repos/${process.env.TARGET_REPO_OWNER}/${process.env.TARGET_REPO_NAME}/labels`,
      {
        headers: {
          accept: "application/vnd.github+json",
          authorization: data["token_type"] + " " + data["access_token"],
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    const getLabelData = (await getLabelResponse.json()) as Label[];
    [OPEN_LABEL, IN_PROGRESS_LABEL, DONE_LABEL].forEach(async (label) => {
      if (getLabelData.findIndex((_label) => _label.name === label) < 0) {
        const createLabelResponse = await fetch(
          `https://api.github.com/repos/${process.env.TARGET_REPO_OWNER}/${process.env.TARGET_REPO_NAME}/labels`,
          {
            method: "post",
            headers: {
              accept: "application/vnd.github+json",
              authorization: data["token_type"] + " " + data["access_token"],
              "X-GitHub-Api-Version": "2022-11-28",
            },
            body: JSON.stringify({
              name: label,
            }),
          }
        );
        const createLabelData = await createLabelResponse.json();
        if (createLabelResponse.status !== 200)
          return new APIResponse(false, createLabelData).json();
      }
    });
    return new APIResponse(true, data).json();
  })
);

export default router;
