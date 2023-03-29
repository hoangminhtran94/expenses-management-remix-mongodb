function isValidTitle(value: string) {
  return value && value.trim().length > 0 && value.trim().length <= 30;
}

function isValidAmount(value: string) {
  const amount = parseFloat(value);
  return !isNaN(amount) && amount > 0;
}

function isValidDate(value: string) {
  return value && new Date(value).getTime() < new Date().getTime();
}

export function validateExpenseInput(input: {
  title: string;
  amount: string;
  date: string;
}) {
  let validationErrors = { title: "", amount: "", date: "" };

  if (!isValidTitle(input.title)) {
    validationErrors.title =
      "Invalid expense title. Must be at most 30 characters long.";
  }

  if (!isValidAmount(input.amount)) {
    validationErrors.amount =
      "Invalid amount. Must be a number greater than zero.";
  }

  if (!isValidDate(input.date)) {
    validationErrors.date = "Invalid date. Must be a date before today.";
  }

  if (
    Object.values(validationErrors).filter((error) => error !== "").length > 0
  ) {
    throw validationErrors;
  }
}
function isValidEmail(value: string) {
  return value && value.includes("@");
}

function isValidPassword(value: string) {
  return value && value.trim().length >= 7;
}

export function validateCredentials(
  input:
    | {
        email: string;
        password: string;
      }
    | { [key: string]: FormDataEntryValue }
) {
  let validationErrors = { email: "", password: "" };

  if (!isValidEmail(input.email.toString())) {
    validationErrors.email = "Invalid email address.";
  }

  if (!isValidPassword(input.password.toString())) {
    validationErrors.password =
      "Invalid password. Must be at least 7 characters long.";
  }

  if (
    Object.values(validationErrors).filter((error) => error !== "").length > 0
  ) {
    throw validationErrors;
  }
}
