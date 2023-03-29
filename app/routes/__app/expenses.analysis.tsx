import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import { getExpenses } from "~/data/expenses.server";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserFromSession, requireUserSession } from "~/data/auth.server";

const ExpensesAnalysis = () => {
  const expensesData = useLoaderData();
  return (
    <main>
      <Chart expenses={expensesData} />
      <ExpenseStatistics expenses={expensesData} />
    </main>
  );
};

export default ExpensesAnalysis;

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserSession(request);
  let expenses;

  try {
    expenses = await getExpenses(userId);
  } catch (error) {
    throw json(
      { message: "Unknown error happened!" },
      { status: 500, statusText: "Unknown error happened!" }
    );
  }
  if (!expenses || expenses.length === 0) {
    throw json(
      { message: "Could not find any expenses" },
      { status: 403, statusText: "Please try again" }
    );
  }
  return expenses;
};
