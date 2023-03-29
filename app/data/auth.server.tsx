import { prisma } from "./database.server";
import { hash, compare } from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import dotenv from "dotenv";
dotenv.config();
const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET!],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true,
  },
});

const createUserSession = async (userId: string, redirectPath: string) => {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
};

export const getUserFromSession = async (request: Request) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("userId");
  if (!userId) {
    return null;
  }
  return userId;
};

export const destroyUserSession = async (
  request: Request,
  redirectPath: string
) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const response = await sessionStorage.destroySession(session);
  return redirect(redirectPath, { headers: { "Set-Cookie": response } });
};

export const requireUserSession = async (request: Request) => {
  const userId = await getUserFromSession(request);
  if (!userId) {
    throw redirect("/auth?mode=login");
  }
  return userId;
};

export class ServerError extends Error {
  public status = 500;
  public statusText = "Error";
  constructor(message: string, status: number, statusText: string = "") {
    super(message);
    this.status = status;
    this.message = message;
    this.statusText = statusText;
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}
export const signup = async ({
  email,
  password,
}:
  | {
      email: string;
      password: string;
    }
  | { [key: string]: FormDataEntryValue }) => {
  const existingUser = await prisma.user.findFirst({
    where: { email: email.toString() },
  });
  if (existingUser) {
    throw new ServerError(
      "A user with the provided email address already existed.",
      422,
      "Email address taken"
    );
  }
  let passwordHash;
  try {
    passwordHash = await hash(password.toString(), 12);
  } catch (error) {
    throw new ServerError("Unexpected error", 500, "Unexpected error");
  }

  try {
    const createdUser = await prisma.user.create({
      data: { email: email.toString(), password: passwordHash },
    });
    return await createUserSession(createdUser.id, "/expenses");
  } catch (error) {
    throw new ServerError("Unexpected error", 401);
  }
};

export const login = async ({
  email,
  password,
}:
  | {
      email: string;
      password: string;
    }
  | { [key: string]: FormDataEntryValue }) => {
  const existingUser = await prisma.user.findFirst({
    where: { email: email.toString() },
  });
  if (!existingUser) {
    throw new ServerError(
      "Could not find user with this email, please check your email again.",
      401,
      "User not existed"
    );
  }

  const passwordCorrect = compare(password.toString(), existingUser.password);

  if (!passwordCorrect) {
    throw new ServerError(
      "Password is incorrect, please try again",
      401,
      "Incorrect password"
    );
  }
  return await createUserSession(existingUser.id, "/expenses");
};
