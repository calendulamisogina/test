'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface OrderData {
  orderId: string
  date: string
  customer: {
    firstName: string
    lastName: string
    email: string
    address: string
    city: string
    zipCode: string
  }
  items: Array<{
    name: string
    vintage: string
    quantity: number
    price: number
  }>
  subtotal: number
  shipping: number
  total: number
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export default function SuccessPage() {
  const router = useRouter()
  const [orderData, setOrderData] = useState<OrderData | null>(null)

  useEffect(() => {
    const savedOrder = localStorage.getItem('lastOrder')
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder))
    } else {
      router.push('/')
    }
  }, [router])

  if (!orderData) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <p>Caricamento...</p>
      </div>
    )
  }

  const orderDate = new Date(orderData.date)
  const estimatedDelivery = new Date(orderDate)
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3)

  return (
    <div className="success-container">
      <div className="success-content">
        {/* Checkmark animato */}
        <div className="success-icon">
          <div className="checkmark-circle">
            <svg className="checkmark" viewBox="0 0 52 52">
              <circle className="checkmark-circle-bg" cx="26" cy="26" r="25" fill="none"/>
              <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
        </div>

        <h1 className="success-title">Ordine Confermato!</h1>
        <p className="success-subtitle">
          Grazie per il tuo acquisto. Riceverai una email di conferma all&apos;indirizzo:
          <strong> {orderData.customer.email}</strong>
        </p>

        {/* Info Ordine */}
        <div className="order-info-box">
          <div className="order-info-row">
            <span className="order-info-label">Numero Ordine:</span>
            <span className="order-info-value">{orderData.orderId}</span>
          </div>
          <div className="order-info-row">
            <span className="order-info-label">Data:</span>
            <span className="order-info-value">
              {orderDate.toLocaleDateString('it-IT', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </span>
          </div>
          <div className="order-info-row">
            <span className="order-info-label">Consegna Stimata:</span>
            <span className="order-info-value">
              {estimatedDelivery.toLocaleDateString('it-IT', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </span>
          </div>
        </div>

        {/* Dettagli Spedizione */}
        <div className="success-section">
          <h2>📦 Spedizione</h2>
          <div className="shipping-address">
            <p><strong>{orderData.customer.firstName} {orderData.customer.lastName}</strong></p>
            <p>{orderData.customer.address}</p>
            <p>{orderData.customer.zipCode} {orderData.customer.city}</p>
          </div>
        </div>

        {/* Riepilogo Prodotti */}
        <div className="success-section">
          <h2>🍷 I Tuoi Vini</h2>
          <div className="success-items">
            {orderData.items.map((item, index) => (
              <div key={index} className="success-item">
                <div className="success-item-info">
                  <div className="success-item-name">{item.name}</div>
                  <div className="success-item-vintage">{item.vintage}</div>
                  <div className="success-item-qty">Quantità: {item.quantity}</div>
                </div>
                <div className="success-item-price">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="success-totals">
            <div className="success-total-line">
              <span>Subtotale</span>
              <span>{formatPrice(orderData.subtotal)}</span>
            </div>
            <div className="success-total-line">
              <span>Spedizione</span>
              <span>{orderData.shipping === 0 ? 'GRATIS' : formatPrice(orderData.shipping)}</span>
            </div>
            <div className="success-total-line success-total-final">
              <span>Totale Pagato</span>
              <span>{formatPrice(orderData.total)}</span>
            </div>
          </div>
        </div>

        {/* Prossimi Passi */}
        <div className="success-section">
          <h2>📋 Prossimi Passi</h2>
          <div className="next-steps">
            <div className="next-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Conferma Email</h3>
                <p>Riceverai una email di conferma con i dettagli dell&apos;ordine</p>
              </div>
            </div>
            <div className="next-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Preparazione</h3>
                <p>Prepariamo il tuo ordine con la massima cura entro 24 ore</p>
              </div>
            </div>
            <div className="next-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Spedizione</h3>
                <p>Ti invieremo il tracking per seguire la spedizione</p>
              </div>
            </div>
            <div className="next-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Consegna</h3>
                <p>Riceverai i tuoi vini in 2-3 giorni lavorativi</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="success-actions">
          <Link href="/" className="btn-primary">
            🍷 Continua lo Shopping
          </Link>
          <button 
            onClick={() => window.print()} 
            className="btn-secondary"
          >
            🖨️ Stampa Conferma
          </button>
        </div>

        {/* Info Aggiuntive */}
        <div className="success-footer">
          <p>Per qualsiasi domanda, contattaci a: <strong>info@vinipregiati.it</strong></p>
          <p>Oppure chiama il numero: <strong>+39 123 456 7890</strong></p>
        </div>
      </div>
    </div>
  )
}
