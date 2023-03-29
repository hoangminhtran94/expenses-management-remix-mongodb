import Logo from "../util/Logo";
import { NavLink, Link } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { useSubmit } from "@remix-run/react";
function MainHeader() {
  const userId = useLoaderData();
  const submit = useSubmit();

  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            {userId && (
              <nav id="cta-nav">
                <button
                  onClick={(e) => {
                    submit(null, { method: "post", action: "/logout" });
                  }}
                  className="cta"
                >
                  Logout
                </button>
              </nav>
            )}
            {!userId && (
              <Link to="/auth" className="cta">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
