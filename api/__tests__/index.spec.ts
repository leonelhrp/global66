/**
 * API Integration Tests
 *
 * Tests for Express API endpoints using Supertest
 */

import request from 'supertest'
import app from '../index'

// Mock Google Sheets to avoid real API calls
vi.mock('google-spreadsheet', () => ({
  GoogleSpreadsheet: vi.fn().mockImplementation(() => ({
    loadInfo: vi.fn(),
    sheetsByTitle: {},
    addSheet: vi.fn().mockResolvedValue({
      addRow: vi.fn().mockResolvedValue({ rowNumber: 1 })
    })
  }))
}))

vi.mock('google-auth-library', () => ({
  JWT: vi.fn().mockImplementation(() => ({}))
}))

describe('API Endpoints', () => {
  describe('GET /rates', () => {
    it('returns exchange rates successfully', async () => {
      const response = await request(app).get('/rates')

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.base).toBe('USD')
      expect(response.body.rates).toBeDefined()
      expect(response.body.asOf).toBeDefined()
    })

    it('returns all supported currencies', async () => {
      const response = await request(app).get('/rates')

      expect(response.body.rates).toHaveProperty('USD')
      expect(response.body.rates).toHaveProperty('CLP')
      expect(response.body.rates).toHaveProperty('PEN')
      expect(response.body.rates).toHaveProperty('ARS')
      expect(response.body.rates).toHaveProperty('BRL')
      expect(response.body.rates).toHaveProperty('MXN')
      expect(response.body.rates).toHaveProperty('COP')
      expect(response.body.rates).toHaveProperty('EUR')
      expect(response.body.rates).toHaveProperty('GBP')
    })

    it('accepts base currency parameter', async () => {
      const response = await request(app).get('/rates?base=EUR')

      expect(response.status).toBe(200)
      expect(response.body.base).toBe('EUR')
    })

    it('accepts target currency parameter', async () => {
      const response = await request(app).get('/rates?target=CLP')

      expect(response.status).toBe(200)
      expect(response.body.target).toBe('CLP')
    })

    it('accepts both base and target parameters', async () => {
      const response = await request(app).get('/rates?base=USD&target=CLP')

      expect(response.status).toBe(200)
      expect(response.body.base).toBe('USD')
      expect(response.body.target).toBe('CLP')
    })

    it('returns 400 for unsupported base currency', async () => {
      const response = await request(app).get('/rates?base=XYZ')

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('no soportada')
      expect(response.body.supportedCurrencies).toBeDefined()
    })

    it('includes timestamp in ISO format', async () => {
      const response = await request(app).get('/rates')

      expect(response.body.asOf).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    })

    it('rates are positive numbers', async () => {
      const response = await request(app).get('/rates')

      Object.values(response.body.rates).forEach((rate: any) => {
        expect(typeof rate).toBe('number')
        expect(rate).toBeGreaterThan(0)
      })
    })

    it('USD rate is always 1.0', async () => {
      const response = await request(app).get('/rates')

      expect(response.body.rates.USD).toBe(1.0)
    })

    it('returns valid JSON', async () => {
      const response = await request(app).get('/rates')

      expect(response.headers['content-type']).toMatch(/json/)
    })
  })

  describe('POST /subscribe', () => {
    const validSubscription = {
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      currency: 'CLP'
    }

    it('successfully subscribes with valid data', async () => {
      const response = await request(app).post('/subscribe').send(validSubscription)

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
      expect(response.body.message).toBeDefined()
      expect(response.body.data).toBeDefined()
    })

    it('returns subscription data in response', async () => {
      const response = await request(app).post('/subscribe').send(validSubscription)

      expect(response.body.data.name).toBe(validSubscription.name)
      expect(response.body.data.email).toBe(validSubscription.email)
      expect(response.body.data.currency).toBe(validSubscription.currency)
      expect(response.body.data.subscribedAt).toBeDefined()
    })

    it('works without optional currency field', async () => {
      const response = await request(app).post('/subscribe').send({
        name: 'María González',
        email: 'maria@example.com'
      })

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
      expect(response.body.data.currency).toBeNull()
    })

    it('returns 400 when name is missing', async () => {
      const response = await request(app).post('/subscribe').send({
        email: 'test@example.com'
      })

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('requeridos')
    })

    it('returns 400 when email is missing', async () => {
      const response = await request(app).post('/subscribe').send({
        name: 'Test User'
      })

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('requeridos')
    })

    it('returns 400 when both fields are missing', async () => {
      const response = await request(app).post('/subscribe').send({})

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
    })

    it('validates email format', async () => {
      const response = await request(app).post('/subscribe').send({
        name: 'Test User',
        email: 'invalid-email'
      })

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('inválido')
    })

    it('rejects email without @', async () => {
      const response = await request(app).post('/subscribe').send({
        name: 'Test',
        email: 'testexample.com'
      })

      expect(response.status).toBe(400)
      expect(response.body.error).toContain('inválido')
    })

    it('rejects email without domain', async () => {
      const response = await request(app).post('/subscribe').send({
        name: 'Test',
        email: 'test@'
      })

      expect(response.status).toBe(400)
      expect(response.body.error).toContain('inválido')
    })

    it('accepts valid email formats', async () => {
      const validEmails = [
        'user@example.com',
        'user.name@example.co.uk',
        'user+tag@example.com',
        '123@example.com'
      ]

      for (const email of validEmails) {
        const response = await request(app).post('/subscribe').send({
          name: 'Test User',
          email
        })

        expect(response.status).toBe(201)
      }
    })

    it('includes timestamp in response', async () => {
      const response = await request(app).post('/subscribe').send(validSubscription)

      expect(response.body.data.subscribedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    })

    it('returns JSON content type', async () => {
      const response = await request(app).post('/subscribe').send(validSubscription)

      expect(response.headers['content-type']).toMatch(/json/)
    })

    it('handles special characters in name', async () => {
      const response = await request(app).post('/subscribe').send({
        name: 'José María Ñoño',
        email: 'jose@example.com'
      })

      expect(response.status).toBe(201)
      expect(response.body.data.name).toBe('José María Ñoño')
    })

    it('savedToSheets indicates sheets status', async () => {
      const response = await request(app).post('/subscribe').send(validSubscription)

      expect(response.body.data).toHaveProperty('savedToSheets')
      expect(typeof response.body.data.savedToSheets).toBe('boolean')
    })
  })

  describe('GET /health', () => {
    it('returns 200 OK', async () => {
      const response = await request(app).get('/health')

      expect(response.status).toBe(200)
    })

    it('returns success status', async () => {
      const response = await request(app).get('/health')

      expect(response.body.success).toBe(true)
      expect(response.body.status).toBe('ok')
    })

    it('includes timestamp', async () => {
      const response = await request(app).get('/health')

      expect(response.body.timestamp).toBeDefined()
      expect(response.body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    })

    it('includes uptime', async () => {
      const response = await request(app).get('/health')

      expect(response.body.uptime).toBeDefined()
      expect(typeof response.body.uptime).toBe('number')
      expect(response.body.uptime).toBeGreaterThanOrEqual(0)
    })

    it('returns JSON', async () => {
      const response = await request(app).get('/health')

      expect(response.headers['content-type']).toMatch(/json/)
    })
  })

  describe('404 Not Found', () => {
    it('returns 404 for non-existent GET route', async () => {
      const response = await request(app).get('/nonexistent')

      expect(response.status).toBe(404)
      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('no encontrado')
    })

    it('returns 404 for non-existent POST route', async () => {
      const response = await request(app).post('/nonexistent')

      expect(response.status).toBe(404)
      expect(response.body.success).toBe(false)
    })

    it('includes available endpoints in 404 response', async () => {
      const response = await request(app).get('/invalid')

      expect(response.body.availableEndpoints).toBeDefined()
      expect(Array.isArray(response.body.availableEndpoints)).toBe(true)
      expect(response.body.availableEndpoints.length).toBeGreaterThan(0)
    })

    it('shows requested path in error message', async () => {
      const response = await request(app).get('/invalid-path')

      expect(response.body.message).toContain('/invalid-path')
    })

    it('shows request method in error message', async () => {
      const response = await request(app).get('/invalid')

      expect(response.body.message).toContain('GET')
    })
  })

  describe('CORS and Headers', () => {
    it('accepts JSON content type', async () => {
      const response = await request(app)
        .post('/subscribe')
        .set('Content-Type', 'application/json')
        .send({
          name: 'Test',
          email: 'test@example.com'
        })

      expect(response.status).toBe(201)
    })

    it('accepts URL encoded data', async () => {
      const response = await request(app)
        .post('/subscribe')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send('name=Test&email=test@example.com')

      expect(response.status).toBe(201)
    })
  })

  describe('Edge Cases', () => {
    it('handles very long names', async () => {
      const longName = 'A'.repeat(1000)
      const response = await request(app).post('/subscribe').send({
        name: longName,
        email: 'test@example.com'
      })

      expect(response.status).toBe(201)
    })

    it('handles multiple currency queries', async () => {
      const requests = ['CLP', 'PEN', 'ARS', 'BRL'].map((target) =>
        request(app).get(`/rates?target=${target}`)
      )

      const responses = await Promise.all(requests)

      responses.forEach((response) => {
        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)
      })
    })

    it('handles concurrent subscribe requests', async () => {
      const subscriptions = Array.from({ length: 5 }, (_, i) => ({
        name: `User ${i}`,
        email: `user${i}@example.com`
      }))

      const requests = subscriptions.map((sub) => request(app).post('/subscribe').send(sub))

      const responses = await Promise.all(requests)

      responses.forEach((response) => {
        expect(response.status).toBe(201)
        expect(response.body.success).toBe(true)
      })
    })
  })

  describe('Data Consistency', () => {
    it('returns consistent rate data across requests', async () => {
      const response1 = await request(app).get('/rates')
      const response2 = await request(app).get('/rates')

      expect(response1.body.rates).toEqual(response2.body.rates)
    })

    it('maintains base currency in response', async () => {
      const bases = ['USD', 'EUR', 'GBP']

      for (const base of bases) {
        const response = await request(app).get(`/rates?base=${base}`)
        expect(response.body.base).toBe(base)
      }
    })
  })
})
