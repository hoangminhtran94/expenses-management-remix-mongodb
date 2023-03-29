import { Outlet } from "@remix-run/react";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import expensesStyles from "../styles/expenses.css";
import { useCatch } from "@remix-run/react";
import Error from "~/components/util/Error";
const ExpensesAppLayout = () => {
  return (
    <>
      <ExpensesHeader />
      <Outlet />;
    </>
  );
};

export default ExpensesAppLayout;
export const links = () => {
  return [{ rel: "stylesheet", href: expensesStyles }];
};

export const CatchBoundary = () => {
  const catchedError = useCatch();
  return (
    <>
      <ExpensesHeader />
      <Error title={catchedError.statusText}>
        <p>{catchedError.data?.message}</p>
      </Error>
    </>
  );
};
