import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, ShieldCheck } from 'lucide-react';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import ProtectedRoute from './routes/ProtectedRoute';
import GuestRoute from './routes/GuestRoute';
import { clearCredentials } from './features/auth/authSlice';
import { authApi, useLogoutMutation } from './features/auth/authApi';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [logout] = useLogoutMutation();

  async function handleLogout() {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error('Déconnexion serveur :', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      dispatch(clearCredentials());
      dispatch(authApi.util.resetApiState());
      navigate('/login', { replace: true });
    }
  }

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon"><ShieldCheck size={21} /></span>
        <span>Auth<span className="brand-accent">Flow</span></span>
      </Link>

      <nav>
        <NavLink to="/" end>Accueil</NavLink>

        {token ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <span className="nav-user">{user?.name}</span>
            <button className="nav-logout" onClick={handleLogout}>
              <LogOut size={16} /> Déconnexion
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Connexion</NavLink>
            <Link to="/register" className="nav-cta">Créer un compte</Link>
          </>
        )}
      </nav>
    </header>
  );
}

function NotFoundPage() {
  return (
    <main className="not-found">
      <h1>404</h1>
      <p>Cette page n'existe pas.</p>
      <Link to="/">Retour à l'accueil</Link>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <footer className="footer">
        <p>AuthFlow · React + Redux Toolkit + Laravel JWT</p>
      </footer>
    </>
  );
}