import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Code2 } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="hero">
        <span className="eyebrow">
          <ShieldCheck size={16} />
          Laravel API · JWT Authentication
        </span>

        <h1>
          Une authentification web
          <span> moderne et sécurisée.</span>
        </h1>

        <p>
          Une application React connectée à une API Laravel,
          avec Redux Toolkit, RTK Query et des tokens JWT.
        </p>

        <div className="hero-actions">
          <Link to="/register" className="primary-link">
            Commencer <ArrowRight size={18} />
          </Link>
          <Link to="/login" className="secondary-link">
            Se connecter
          </Link>
        </div>
      </section>

      <section className="feature-grid">
        <article className="feature-card">
          <ShieldCheck size={26} />
          <h2>JWT Auth</h2>
          <p>Inscription, connexion et routes protégées.</p>
        </article>

        <article className="feature-card">
          <Zap size={26} />
          <h2>RTK Query</h2>
          <p>Requêtes API, chargement, erreurs et cache.</p>
        </article>

        <article className="feature-card">
          <Code2 size={26} />
          <h2>Architecture claire</h2>
          <p>Une structure modulaire facile à maintenir.</p>
        </article>
      </section>
    </main>
  );
}