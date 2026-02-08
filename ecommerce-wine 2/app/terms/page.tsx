import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className="container">
      <h1 className="section-title">Termini e Condizioni</h1>
      <p>
        Questi termini regolano l&apos;uso del nostro sito e l&apos;acquisto dei
        prodotti Vini Pregiati. Effettuando un ordine, confermi di aver letto e
        accettato quanto segue.
      </p>

      <section style={{ marginTop: '32px' }}>
        <h2>1. Ordini e Pagamenti</h2>
        <p>
          Gli ordini sono soggetti a disponibilità. Il pagamento viene elaborato
          in modo sicuro e i dati non vengono memorizzati sul nostro server.
        </p>
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2>2. Spedizione e Consegna</h2>
        <p>
          Le consegne avvengono in 2-3 giorni lavorativi. I tempi possono
          variare in base alla località e alla disponibilità dei corrieri.
        </p>
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2>3. Resi e Rimborsi</h2>
        <p>
          Puoi richiedere un reso entro 14 giorni dalla consegna. Il prodotto
          deve essere integro e nella confezione originale.
        </p>
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2>4. Contatti</h2>
        <p>
          Per qualsiasi domanda scrivici a{' '}
          <strong>info@vinipregiati.it</strong>.
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
