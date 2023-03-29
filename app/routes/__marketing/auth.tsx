import authStyles from "~/styles/auth.css";
import AuthForm from "~/components/auth/AuthForm";
import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { validateCredentials } from "~/data/validate.server";
import { login, signup } from "~/data/auth.server";
const Auth = () => {
  return <AuthForm />;
};

export default Auth;

export const links = () => {
  return [{ rel: "stylesheet", href: authStyles }];
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";
  const credentials = Object.fromEntries(formData);
  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  if (authMode === "login") {
    try {
      return await login(credentials);
    } catch (error: any) {
      return { error: error.message };
    }
  } else {
    try {
      return await signup(credentials);
    } catch (error: any) {
      return { error: error.message };
    }
  }
};
