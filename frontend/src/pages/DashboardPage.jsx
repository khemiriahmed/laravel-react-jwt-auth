import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, UserRound } from 'lucide-react';

import { clearCredentials } from '../features/auth/authSlice';
import {
  authApi,
  useGetMeQuery,
  useLogoutMutation,
} from '../features/auth/authApi';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedUser = useSelector((state) => state.auth.user);

  const { data, isLoading, isError } = useGetMeQuery();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  async function handleLogout() {
    try {
      await logout().unwrap();
    } catch (error) {
      // Le token peut être expiré ou déjà invalide.
      console.error('Déconnexion côté serveur :', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');

      dispatch(clearCredentials());
      dispatch(authApi.util.resetApiState());
      navigate('/login', { replace: true });
    }
  }

  const user = data?.user || storedUser;

  return (
    <main className="dashboard">
      <section className="dashboard-card">
        <div className="dashboard-heading">
          <div className="auth-icon">
            <UserRound size={26} />
          </div>

          <div>
            <h1>Mon tableau de bord</h1>
            <p className="muted">Ton espace personnel</p>
          </div>
        </div>

        {isLoading && <p>Chargement du profil...</p>}

        {isError && (
          <p className="error-message">
            Impossible de récupérer ton profil depuis l'API.
            Vérifie ton token JWT et la connexion à Laravel.
          </p>
        )}

        {user && (
          <div className="profile-details">
            <p><strong>Nom :</strong> {user.name}</p>
            <p><strong>E-mail :</strong> {user.email}</p>
            <p><strong>Rôle :</strong> {user.role}</p>
          </div>
        )}

        <button
          className="logout-button"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOut size={18} />
          {isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}
        </button>
      </section>
    </main>
  );
}