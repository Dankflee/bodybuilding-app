import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>🏋️ Bodybuilding Simulator</h1>
        <p>Get AI-powered advice & optimize your protein factory!</p>
      </header>

      <section className={styles.features}>
        <div className={styles.feature}>
          <h2>AI Coaching</h2>
          <p>Get personalized workout and diet plans from GPT-4</p>
        </div>
        <div className={styles.feature}>
          <h2>Factory Simulator</h2>
          <p>Optimize protein powder production with smart logic</p>
        </div>
      </section>

      <div className={styles.cta}>
        <Link href="/login">
          <button>Get Started →</button>
        </Link>
      </div>
    </div>
  );
}
