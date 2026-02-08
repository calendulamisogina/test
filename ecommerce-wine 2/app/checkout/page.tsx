'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  vintage: string
}

interface CheckoutForm {
  // Dati personali
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Indirizzo di spedizione
  address: string
  city: string
  province: string
  zipCode: string
  country: string
  
  // Note aggiuntive
  notes: string
  
  // Pagamento
  acceptTerms: boolean
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export default function CheckoutPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({})
  
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    zipCode: '',
    country: 'Italia',
    notes: '',
    acceptTerms: false,
  })

  // Carica carrello da localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('wineCart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    } else {
      // Se il carrello è vuoto, torna alla home
      router.push('/')
    }
  }, [router])

  // Calcola totali
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 100 ? 0 : 9.90
  const total = subtotal + shipping

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Rimuovi errore quando l'utente inizia a scrivere
    if (errors[name as keyof CheckoutForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  // Validazione form
  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutForm> = {}
    
    // Dati personali
    if (!formData.firstName.trim()) newErrors.firstName = 'Nome richiesto'
    if (!formData.lastName.trim()) newErrors.lastName = 'Cognome richiesto'
    
    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email richiesta'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email non valida'
    }
    
    // Telefono
    const phoneRegex = /^[\d\s\+\-\(\)]{8,}$/
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefono richiesto'
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Numero di telefono non valido'
    }
    
    // Indirizzo
    if (!formData.address.trim()) newErrors.address = 'Indirizzo richiesto'
    if (!formData.city.trim()) newErrors.city = 'Città richiesta'
    if (!formData.province.trim()) newErrors.province = 'Provincia richiesta'
    
    // CAP
    const zipRegex = /^\d{5}$/
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'CAP richiesto'
    } else if (!zipRegex.test(formData.zipCode)) {
      newErrors.zipCode = 'CAP non valido (5 cifre)'
    }
    
    // Termini
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = true as any
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Submit ordine
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    setIsProcessing(true)
    
    // Simula processamento ordine
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Salva dati ordine
    const orderData = {
      orderId: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      customer: formData,
      items: cartItems,
      subtotal,
      shipping,
      total,
    }
    
    localStorage.setItem('lastOrder', JSON.stringify(orderData))
    localStorage.removeItem('wineCart')
    
    // Vai alla pagina di conferma
    router.push('/checkout/success')
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <p>Caricamento...</p>
      </div>
    )
  }

  return (
    <div className="checkout-container">
      <header className="checkout-header">
        <div className="checkout-header-content">
          <h1>🍷 Vini Pregiati</h1>
          <div className="checkout-steps">
            <span className="step active">1. Checkout</span>
            <span className="step-arrow">→</span>
            <span className="step">2. Conferma</span>
          </div>
        </div>
      </header>

      <main className="checkout-main">
        <div className="checkout-grid">
          {/* Form */}
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit}>
              {/* Dati Personali */}
              <section className="form-section">
                <h2>Dati Personali</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">Nome *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastName">Cognome *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Telefono *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+39 123 456 7890"
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>
              </section>

              {/* Indirizzo di Spedizione */}
              <section className="form-section">
                <h2>Indirizzo di Spedizione</h2>
                
                <div className="form-group">
                  <label htmlFor="address">Indirizzo *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Via, numero civico"
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">Città *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                  
                  <div className="form-group form-group-small">
                    <label htmlFor="province">Provincia *</label>
                    <input
                      type="text"
                      id="province"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      placeholder="PE"
                      maxLength={2}
                      className={errors.province ? 'error' : ''}
                    />
                    {errors.province && <span className="error-message">{errors.province}</span>}
                  </div>
                  
                  <div className="form-group form-group-small">
                    <label htmlFor="zipCode">CAP *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="65100"
                      maxLength={5}
                      className={errors.zipCode ? 'error' : ''}
                    />
                    {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="country">Paese</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    disabled
                  />
                </div>
              </section>

              {/* Note */}
              <section className="form-section">
                <h2>Note Aggiuntive</h2>
                <div className="form-group">
                  <label htmlFor="notes">Note per la consegna (opzionale)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Es. Suonare al secondo piano, preferisco consegna al mattino..."
                  />
                </div>
              </section>

              {/* Termini */}
              <section className="form-section">
                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                  />
                  <label htmlFor="acceptTerms">
                    Accetto i <a href="/terms" target="_blank">termini e condizioni</a> e la <a href="/privacy" target="_blank">privacy policy</a> *
                  </label>
                </div>
                {errors.acceptTerms && (
                  <span className="error-message">Devi accettare i termini per procedere</span>
                )}
              </section>

              {/* Submit */}
              <button 
                type="submit" 
                className="checkout-submit-btn"
                disabled={isProcessing}
              >
                {isProcessing ? '🔄 Processamento...' : '🔒 Conferma e Procedi al Pagamento'}
              </button>
              
              <p className="checkout-secure-note">
                🔒 Pagamento sicuro tramite SSL. I tuoi dati sono protetti.
              </p>
            </form>
          </div>

          {/* Riepilogo Ordine */}
          <div className="checkout-summary">
            <div className="summary-sticky">
              <h2>Riepilogo Ordine</h2>
              
              <div className="summary-items">
                {cartItems.map(item => (
                  <div key={item.id} className="summary-item">
                    <div className="summary-item-info">
                      <div className="summary-item-name">{item.name}</div>
                      <div className="summary-item-vintage">{item.vintage}</div>
                      <div className="summary-item-qty">Quantità: {item.quantity}</div>
                    </div>
                    <div className="summary-item-price">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-line">
                  <span>Subtotale</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="summary-line">
                  <span>Spedizione</span>
                  <span>{shipping === 0 ? 'GRATIS' : formatPrice(shipping)}</span>
                </div>
                {shipping === 0 && (
                  <div className="free-shipping-note">
                    ✓ Spedizione gratuita per ordini oltre 100€
                  </div>
                )}
                <div className="summary-line summary-total">
                  <span>Totale</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="summary-badges">
                <div className="summary-badge">🔒 Pagamento Sicuro</div>
                <div className="summary-badge">📦 Spedizione Tracciata</div>
                <div className="summary-badge">↩️ Reso Facile</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
