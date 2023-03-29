import Modal from "~/components/util/Modal";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import { useNavigate } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { validateExpenseInput } from "~/data/validate.server";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
const ExpenseDetail = () => {
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

export default ExpenseDetail;

export const action = async ({ params, request }: ActionArgs) => {
  const { id } = params;
  if (request.method === "DELETE") {
    try {
      await deleteExpense(id!);
      return { deletedId: id };
    } catch (error) {
      throw json(
        { message: "Error when deleting expense" },
        { status: 401, statusText: "Error when deleting expense" }
      );
    }
  } else {
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

    try {
      await updateExpense(id!, data);
      return redirect("/expenses");
    } catch (error) {
      throw json(
        { message: "Error when adding expense" },
        { status: 401, statusText: "Error when adding expense" }
      );
    }
  }
};
