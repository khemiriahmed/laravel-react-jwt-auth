import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogIn } from 'lucide-react';

import { useLoginMutation } from '../authApi';
import { setCredentials } from '../authSlice';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const data = await login({ email, password }).unwrap();

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      dispatch(setCredentials(data));
      navigate('/dashboard');
    } catch (err) {
      console.error('Échec de connexion :', err);
    }
  }

  const errorMessage =
    error?.data?.message ||
    error?.data?.errors?.email?.[0] ||
    'Connexion impossible. Vérifie tes identifiants.';

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-icon">
          <LogIn size={26} />
        </div>

        <h1>Bon retour !</h1>
        <p className="muted">Connecte-toi à ton espace.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Adresse e-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="ahmed@example.com"
            autoComplete="email"
            required
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Ton mot de passe"
            autoComplete="current-password"
            required
          />

          {error && (
            <p className="error-message" role="alert">
              {errorMessage}
            </p>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="auth-footer">
          Pas encore de compte ? <Link to="/register">Créer un compte</Link>
        </p>
      </section>
    </main>
  );
}