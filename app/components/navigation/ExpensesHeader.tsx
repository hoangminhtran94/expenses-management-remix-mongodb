import { NavLink } from "@remix-run/react";
import Logo from "~/components/util/Logo";
import { useActionData } from "@remix-run/react";
import { useFetcher } from "@remix-run/react";
function ExpensesHeader() {
  const fetcher = useFetcher();
  const signOutHandler = () => {
    fetcher.submit(null, { method: "post", action: "/logout" });
  };

  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/expenses" end>
              Manage Expenses
            </NavLink>
          </li>
          <li>
            <NavLink to="/expenses/analysis">Analyze Expenses</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <button className="cta" onClick={signOutHandler}>
          Logout
        </button>
      </nav>
    </header>
  );
}

export default ExpensesHeader;
