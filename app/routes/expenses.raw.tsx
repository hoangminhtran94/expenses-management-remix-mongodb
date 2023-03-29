import type { LoaderArgs } from "@remix-run/node";
import { requireUserSession } from "~/data/auth.server";

export const loader = async ({ request }: LoaderArgs) => {
  await requireUserSession(request);
  return [
    {
      id: "el1",
      title: "First",
      amount: 12.99,
      date: new Date().toISOString(),
    },
    {
      id: "el2",
      title: "Second",
      amount: 14.99,
      date: new Date().toISOString(),
    },
    {
      id: "el3",
      title: "Third",
      amount: 15.99,
      date: new Date().toISOString(),
    },
  ];
};
