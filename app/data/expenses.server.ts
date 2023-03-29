import { prisma } from "./database.server";
export const addExpense = async (
  expenseData: {
    title: string;
    amount: string;
    date: string;
  },
  userId: string
) => {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
        User: { connect: { id: userId } },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getExpenses = async (userId: string) => {
  try {
    return await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getExpense = async (id: string) => {
  try {
    return await prisma.expense.findFirst({ where: { id } });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateExpense = async (
  id: string,
  expenseData: {
    title: string;
    amount: string;
    date: string;
  }
) => {
  await prisma.expense.update({
    where: { id },
    data: {
      title: expenseData.title,
      amount: +expenseData.amount,
      date: new Date(expenseData.date),
    },
  });
};

export const deleteExpense = async (id: string) => {
  try {
    await prisma.expense.delete({ where: { id } });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
