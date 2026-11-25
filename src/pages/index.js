import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function Hero() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">TechShare Docs</h1>
        <p className="hero__subtitle">
          Order &amp; Subscription Management — API reference, integration guides, and step-by-step tutorials.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/api-reference/overview">
            API Reference →
          </Link>
          <Link className="button button--outline button--secondary button--lg" to="/tutorials/getting-started">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Hero />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            <Card
              title="API Reference"
              description="Full REST API documentation — endpoints, request/response schemas, status codes, and domain rules."
              to="/api-reference/overview"
              emoji="⚡"
            />
            <Card
              title="Guides"
              description="Architecture decisions, domain model walkthrough, error handling conventions, and deployment."
              to="/guides/architecture"
              emoji="🗺️"
            />
            <Card
              title="Tutorials"
              description="Hands-on walkthroughs: local setup, creating your first order, using mock mode, and more."
              to="/tutorials/getting-started"
              emoji="🚀"
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}

function Card({ title, description, to, emoji }) {
  return (
    <Link to={to} className={styles.card}>
      <div className={styles.cardEmoji}>{emoji}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}
