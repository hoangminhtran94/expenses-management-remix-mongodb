import { Link } from "@remix-run/react";
import { useFetcher } from "@remix-run/react";
function ExpenseListItem({
  title,
  amount,
  id,
}: {
  id: string;
  title: string;
  amount: number;
}) {
  const fetcher = useFetcher();
  const deleteExpenseItemHandler = () => {
    const proceed = confirm("Are you sure? do you want to delete this item?");
    if (!proceed) {
      return;
    }
    fetcher.submit(null, { method: "delete", action: `/expenses/${id}` });
  };

  if (fetcher.state !== "idle") {
    return (
      <article className="expense-item locked">
        <p>Deleting...</p>
      </article>
    );
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
