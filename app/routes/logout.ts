import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { destroyUserSession } from "~/data/auth.server";
export const action = async ({ request }: ActionArgs) => {
  if (request.method !== "POST") {
    throw json(
      { message: "Invalid request method" },
      { status: 400, statusText: "Invalid request method" }
    );
  }
  return await destroyUserSession(request, "/");
};
