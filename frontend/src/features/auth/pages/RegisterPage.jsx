import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserPlus } from 'lucide-react';

import { useRegisterMutation } from '../authApi';
import { setCredentials } from '../authSlice';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [register, { isLoading, error }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const data = await register(form).unwrap();

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      dispatch(setCredentials(data));
      navigate('/dashboard');
    } catch (err) {
      console.error('Échec de l’inscription :', err);
    }
  }

  const errorMessage =
    error?.data?.message ||
    Object.values(error?.data?.errors || {}).flat()[0] ||
    'Inscription impossible. Vérifie les informations saisies.';

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-icon">
          <UserPlus size={26} />
        </div>

        <h1>Créer un compte</h1>
        <p className="muted">Rejoins ton espace personnel.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nom</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />

          <label htmlFor="email">Adresse e-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            minLength={8}
            required
          />

          <label htmlFor="password_confirmation">
            Confirmer le mot de passe
          </label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            value={form.password_confirmation}
            onChange={handleChange}
            autoComplete="new-password"
            minLength={8}
            required
          />

          {error && (
            <p className="error-message" role="alert">
              {errorMessage}
            </p>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Création...' : 'Créer mon compte'}
          </button>
        </form>

        <p className="auth-footer">
          Déjà inscrit ? <Link to="/login">Se connecter</Link>
        </p>
      </section>
    </main>
  );
}