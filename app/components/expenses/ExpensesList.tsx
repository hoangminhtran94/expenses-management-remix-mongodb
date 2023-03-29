import ExpenseListItem from "./ExpenseListItem";
import type { Expense } from "~/model/Expense.model";
function ExpensesList({ expenses }: { expenses: Expense[] }) {
  return (
    <ol id="expenses-list">
      {expenses.map((expense) => (
        <li key={expense.id}>
          <ExpenseListItem
            id={expense.id}
            title={expense.title}
            amount={expense.amount}
          />
        </li>
      ))}
    </ol>
  );
}

export default ExpensesList;
