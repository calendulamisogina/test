'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'

// Types
interface Wine {
  id: string
  name: string
  description: string
  price: number
  vintage: string
  region: string
  type: string
  inStock: boolean
  rating: number
  reviewCount: number
  imageUrl: string
}

interface CartItem {
  product: Wine
  quantity: number
}

// Mock wines data
const wines: Wine[] = [
  {
    id: 'wine-001',
    name: 'Barolo Riserva',
    description: 'Elegante e complesso, con note di ciliegia, rosa e tabacco. Affinamento di 5 anni.',
    price: 89.00,
    vintage: 'DOCG 2018',
    region: 'Piemonte',
    type: 'Rosso',
    inStock: true,
    rating: 4.9,
    reviewCount: 127,
    imageUrl: '/images/wine-1.jpg'
  },
  {
    id: 'wine-002',
    name: 'Brunello di Montalcino',
    description: 'Potente e strutturato, con sentori di frutti rossi maturi e spezie dolci.',
    price: 75.00,
    vintage: 'DOCG 2019',
    region: 'Toscana',
    type: 'Rosso',
    inStock: true,
    rating: 4.8,
    reviewCount: 89,
    imageUrl: '/images/wine-2.jpg'
  },
  {
    id: 'wine-003',
    name: 'Amarone della Valpolicella',
    description: 'Vino corposo con note di amarena, cioccolato e prugna secca. Passito eccezionale.',
    price: 65.00,
    vintage: 'DOCG 2017',
    region: 'Veneto',
    type: 'Rosso',
    inStock: false,
    rating: 4.7,
    reviewCount: 156,
    imageUrl: '/images/wine-3.jpg'
  },
  {
    id: 'wine-004',
    name: 'Chianti Classico',
    description: 'Equilibrato e beverino, con note di ciliegia fresca, viola e una leggera speziatura.',
    price: 28.00,
    vintage: 'DOCG 2020',
    region: 'Toscana',
    type: 'Rosso',
    inStock: true,
    rating: 4.6,
    reviewCount: 234,
    imageUrl: '/images/wine-4.jpg'
  },
  {
    id: 'wine-005',
    name: 'Primitivo di Manduria',
    description: 'Intenso e avvolgente, con profumi di mora, prugna e vaniglia. Corposo e morbido.',
    price: 32.00,
    vintage: 'DOC 2021',
    region: 'Puglia',
    type: 'Rosso',
    inStock: true,
    rating: 4.5,
    reviewCount: 178,
    imageUrl: '/images/wine-5.jpg'
  },
  {
    id: 'wine-006',
    name: 'Nero d\'Avola',
    description: 'Mediterraneo e fruttato, con sentori di ciliegia nera, spezie e macchia mediterranea.',
    price: 24.00,
    vintage: 'IGT Sicilia 2020',
    region: 'Sicilia',
    type: 'Rosso',
    inStock: true,
    rating: 4.4,
    reviewCount: 201,
    imageUrl: '/images/wine-6.jpg'
  }
]

// Utility function
function formatPrice(amount: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

// Product Card Component
function WineCard({ 
  wine, 
  onAddToCart 
}: { 
  wine: Wine
  onAddToCart: (wine: Wine) => void 
}) {
  return (
    <article className="product-card">
      <div className="product-image">
        <Image 
          src={wine.imageUrl} 
          alt={wine.name}
          width={800}
          height={1000}
          style={{ objectFit: 'cover' }}
        />
        <div className="vintage-badge">{wine.vintage}</div>
        {!wine.inStock && (
          <div className="out-of-stock-badge">Esaurito</div>
        )}
      </div>

      <div className="product-info">
        <div className="wine-type">{wine.type}</div>
        <h3 className="product-name">{wine.name}</h3>
        <p className="product-description">{wine.description}</p>

        <div className="product-meta">
          <span className="product-region">{wine.region}</span>
          <div className="product-rating">
            ★ {wine.rating.toFixed(1)}
            <span className="review-count">({wine.reviewCount})</span>
          </div>
        </div>

        <div className="product-footer">
          <div>
            <span className="product-price">{formatPrice(wine.price)}</span>
            <span className="price-bottle">per bottiglia</span>
          </div>
          <button
            onClick={() => onAddToCart(wine)}
            disabled={!wine.inStock}
            className="add-to-cart-btn"
            aria-label={`Aggiungi ${wine.name} al carrello`}
          >
            {wine.inStock ? 'Aggiungi' : 'Non disponibile'}
          </button>
        </div>
      </div>
    </article>
  )
}

// Main Page Component
export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Add item to cart
  const addToCart = (wine: Wine) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.product.id === wine.id)
      
      let newItems
      if (existing) {
        newItems = prevItems.map(item =>
          item.product.id === wine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        newItems = [...prevItems, { product: wine, quantity: 1 }]
      }
      
      // Salva in localStorage
      saveCartToStorage(newItems)
      return newItems
    })
  }

  // Update quantity
  const updateQuantity = (wineId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(wineId)
      return
    }
    
    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.product.id === wineId
          ? { ...item, quantity: newQuantity }
          : item
      )
      saveCartToStorage(newItems)
      return newItems
    })
  }

  // Remove from cart
  const removeFromCart = (wineId: string) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.product.id !== wineId)
      saveCartToStorage(newItems)
      return newItems
    })
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('wineCart')
  }

  // Save cart to localStorage
  const saveCartToStorage = (items: CartItem[]) => {
    const cartData = items.map(item => ({
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      vintage: item.product.vintage,
    }))
    localStorage.setItem('wineCart', JSON.stringify(cartData))
  }

  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) return
    saveCartToStorage(cartItems)
    window.location.href = '/checkout'
  }

  // Calculate totals
  const totalAmount = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity)
    }, 0)
  }, [cartItems])

  const itemCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }, [cartItems])

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🍷</span>
            <div className="logo-text">
              <h1>Vini Pregiati</h1>
              <div className="logo-tagline">Dal 1892</div>
            </div>
          </div>
          <div className="cart-badge">
            🛒 {itemCount} {itemCount === 1 ? 'bottiglia' : 'bottiglie'}
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Eccellenze Vinicole Italiane</h1>
          <p className="hero-subtitle">
            Scopri la nostra selezione di vini rossi pregiati dalle migliori regioni d&apos;Italia
          </p>
          <a href="#collezione" className="cta-button">Esplora la Collezione</a>
        </div>
      </section>

      <main className="container">
        <section id="collezione">
          <h2 className="section-title">La Nostra Collezione</h2>
          <div className="products-grid">
            {wines.map(wine => (
              <WineCard
                key={wine.id}
                wine={wine}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>

        <section className="cart-section">
          <h2>🍷 Il Tuo Ordine</h2>
          
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Il tuo carrello è vuoto</p>
              <p style={{ marginTop: '8px', fontSize: '15px' }}>
                Aggiungi dei vini per iniziare la tua selezione
              </p>
            </div>
          ) : (
            <>
              {cartItems.map(item => (
                <div key={item.product.id} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.product.name}</div>
                    <div className="cart-item-vintage">{item.product.vintage}</div>
                    <div className="cart-item-price">
                      {formatPrice(item.product.price)} × {item.quantity} = {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>

                  <div className="cart-item-controls">
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="quantity-btn"
                        aria-label="Diminuisci quantità"
                      >
                        −
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="quantity-btn"
                        aria-label="Aumenta quantità"
                      >
                        +
                      </button>
                    </div>
                    <span className="cart-item-subtotal">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="remove-btn"
                      aria-label={`Rimuovi ${item.product.name}`}
                    >
                      Rimuovi
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-total">
                <span className="cart-total-label">Totale:</span>
                <span className="cart-total-amount">{formatPrice(totalAmount)}</span>
              </div>

              <div className="cart-actions">
                <button onClick={handleCheckout} className="checkout-btn">
                  🔒 Procedi all&apos;Acquisto
                </button>
                <button onClick={clearCart} className="clear-cart-btn">
                  Svuota Carrello
                </button>
              </div>
            </>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">🍷</div>
          <h3>Vini Pregiati</h3>
          <p>Passione per il vino dal 1892</p>
          <p>Selezioniamo solo i migliori vini dalle cantine più prestigiose d&apos;Italia</p>
          
          <div className="footer-divider"></div>
          
          <div className="footer-badges">
            <div className="footer-badge">✓ Spedizione Sicura</div>
            <div className="footer-badge">✓ 100% Autentici</div>
            <div className="footer-badge">✓ Pagamento Sicuro</div>
          </div>

          <div className="footer-copyright">
            © 2026 Vini Pregiati. Bere responsabilmente.
          </div>
        </div>
      </footer>
    </>
  )
}
