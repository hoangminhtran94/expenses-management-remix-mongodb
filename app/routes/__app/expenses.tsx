import { Link, Outlet } from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";
import expensesStyles from "~/styles/expenses.css";
import { FaPlus, FaDownload } from "react-icons/fa";
import { getExpenses } from "~/data/expenses.server";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserFromSession, requireUserSession } from "~/data/auth.server";

const ExpensesLayout = () => {
  const expenseData = useLoaderData();
  const hasExpenses = expenseData && expenseData.length > 0;
  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add new expense</span>
          </Link>
          <a href="/expenses/raw">
            {" "}
            <FaDownload /> <span>Load Raw Data</span>{" "}
          </a>
        </section>
        {hasExpenses && <ExpensesList expenses={expenseData ?? []} />}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
};

export default ExpensesLayout;

export const links = () => {
  return [{ rel: "stylesheet", href: expensesStyles }];
};

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserSession(request);

  try {
    return await getExpenses(userId);
  } catch (error) {
    throw json(
      { message: "Could not fetch data" },
      { status: 401, statusText: "Could not fetch data" }
    );
  }
};
