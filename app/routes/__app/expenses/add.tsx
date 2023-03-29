import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { useNavigate } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validate.server";
import { getUserFromSession } from "~/data/auth.server";
const AddExpense = () => {
  const navigate = useNavigate();
  return (
    <Modal
      onClose={() => {
        navigate("..");
      }}
    >
      <ExpenseForm />
    </Modal>
  );
};

export default AddExpense;

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const data = {
    title: formData.get("title")!.toString(),
    amount: formData.get("amount")!.toString(),
    date: formData.get("date")!.toString(),
  };
  try {
    validateExpenseInput(data);
  } catch (error) {
    return error;
  }

  const userId = await getUserFromSession(request);
  try {
    await addExpense(data, userId);
    return redirect("/expenses");
  } catch (error) {
    throw json(
      { message: "Error when adding expense" },
      { status: 401, statusText: "Error when adding expense" }
    );
  }
};
