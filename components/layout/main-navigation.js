import Link from "next/link";
import { useSession } from "next-auth/client";
import classes from "./main-navigation.module.css";

function MainNavigation() {
  const [session, isLoading] = useSession();
  console.log(session);
  console.log(isLoading);
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && !isLoading ? (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          ) : null}
          {session ? (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button>Logout</button>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
