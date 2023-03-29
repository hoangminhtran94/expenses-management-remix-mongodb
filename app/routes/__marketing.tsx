import { Outlet } from "@remix-run/react";
import MainHeader from "~/components/navigation/MainHeader";
import { getUserFromSession } from "~/data/auth.server";
import marketingStyles from "~/styles/marketing.css";
import type { LoaderArgs } from "@remix-run/node";
const MarketingLayout = () => {
  return (
    <>
      <MainHeader />
      <Outlet />;
    </>
  );
};
export default MarketingLayout;
export const links = () => {
  return [{ rel: "stylesheet", href: marketingStyles }];
};

export const loader = async ({ request }: LoaderArgs) => {
  return await getUserFromSession(request);
};
