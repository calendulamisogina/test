import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="container">
      <h1 className="section-title">Privacy Policy</h1>
      <p>
        La tua privacy è importante. Raccogliamo solo i dati necessari per
        elaborare ordini e migliorare l&apos;esperienza di acquisto.
      </p>

      <section style={{ marginTop: '32px' }}>
        <h2>Dati che raccogliamo</h2>
        <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
          <li>Informazioni di contatto (nome, email, telefono).</li>
          <li>Dati di spedizione per consegnare gli ordini.</li>
          <li>Preferenze di navigazione per migliorare il sito.</li>
        </ul>
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2>Come utilizziamo i dati</h2>
        <p>
          Utilizziamo i dati esclusivamente per gestire gli ordini, fornire
          assistenza e comunicazioni relative agli acquisti.
        </p>
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2>I tuoi diritti</h2>
        <p>
          Puoi richiedere l&apos;accesso, la modifica o la cancellazione dei dati
          personali scrivendo a <strong>privacy@vinipregiati.it</strong>.
        </p>
      </section>

      <div style={{ marginTop: '40px' }}>
        <Link href="/" className="cta-button">
          Torna allo Shop
        </Link>
      </div>
    </main>
  )
}
