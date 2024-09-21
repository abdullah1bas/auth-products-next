'use client'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSendLogoutMutation } from "../_RTKQ/authApiSlice";
import Cookies from 'js-cookie';
import 'bootstrap/dist/js/bootstrap'

function Navbar() {
  // const { user, logout } = useAuth(); // جلب المستخدم ودالة تسجيل الخروج من السياق
  const router = useRouter();
  const [sendLogout] = useSendLogoutMutation();
  const cookie = Cookies.get('accessToken');
  const pathname = usePathname();

  const handleLogout = () => {
    sendLogout();
    Cookies.remove('accessToken');
    Cookies.remove('role');
    router.push('auth/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" href="/">
          Logo
        </Link>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/">
                Home
              </Link>
            </li>
            {cookie ? (
              <li className="nav-item">
                <button className="nav-link active btn" aria-current="page" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              pathname == '/auth/register' ?
                (
                  <Link className="nav-link active" aria-current="page" href="/auth/login" >
                    Login
                  </Link>
                ) : (
                  <Link className="nav-link active" aria-current="page" href="/auth/register">
                    Register
                  </Link>
                )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
