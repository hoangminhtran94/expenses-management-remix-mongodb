import { FaLock, FaUserPlus } from "react-icons/fa";
import { Form, Link, useSearchParams } from "@remix-run/react";
import { useNavigation } from "@remix-run/react";
import { useActionData } from "@remix-run/react";
function AuthForm() {
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const authMode = searchParams.get("mode") || "login";
  const submitButtonCaption = authMode === "login" ? "Login" : "Create User";
  const toggleButtonCaption =
    authMode === "login" ? "Create a new user" : "Login with existing user";
  const validationError: { [key: string]: string } | undefined =
    useActionData();
  const isSubmitting = navigation.state !== "idle";

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {authMode === "login" ? <FaLock /> : <FaUserPlus />}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      {validationError && (
        <ul>
          {Object.values(validationError)
            .filter((e) => e !== "")
            .map((error, index) => (
              <li key={index}>{error}</li>
            ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Authenticating..." : submitButtonCaption}
        </button>
        <Link to={`?mode=${authMode === "login" ? "signup" : "login"}`}>
          {toggleButtonCaption}
        </Link>
      </div>
    </Form>
  );
}

export default AuthForm;
