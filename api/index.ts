/**
 * API de Global66 - Express Server Middleware
 *
 * Este servidor Express maneja las rutas de la API:
 * - GET /api/rates - Obtiene tipos de cambio de divisas
 * - POST /api/subscribe - Maneja suscripciones de usuarios
 */

import dotenv from 'dotenv'
import express, { Request, Response, NextFunction, RequestHandler } from 'express'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

dotenv.config()

const app = express()

// Middleware para parsear JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * Configuración de Google Sheets
 * Verifica si las credenciales están configuradas
 */
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

const sheetsEnabled = GOOGLE_SHEET_ID && GOOGLE_SERVICE_ACCOUNT_EMAIL && GOOGLE_PRIVATE_KEY

/**
 * Tipos para la API
 */
interface RatesResponse {
  base: string
  rates: Record<string, number>
  target: string | null
  asOf: string
  success: boolean
}

interface SubscribeRequest {
  name: string
  email: string
  currency?: string
}

interface SubscribeResponse {
  success: boolean
  message: string
  data: {
    name: string
    email: string
    currency: string | null
    subscribedAt: string
    savedToSheets: boolean
  }
}

interface SheetsResult {
  success: boolean
  method: string
  data?: any
}

/**
 * Función para guardar datos en Google Sheets
 */
async function saveToGoogleSheets(
  name: string,
  email: string,
  currency: string = ''
): Promise<SheetsResult> {
  if (!sheetsEnabled) {
    console.log('[Google Sheets] No configurado - guardando solo en logs')
    return { success: true, method: 'log_only' }
  }

  try {
    // Autenticación con JWT
    const serviceAccountAuth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      key: GOOGLE_PRIVATE_KEY!,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    // Inicializar documento
    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID!, serviceAccountAuth)
    await doc.loadInfo()

    // Obtener o crear la hoja "Suscripciones"
    let sheet = doc.sheetsByTitle['Suscripciones']

    if (!sheet) {
      // Crear hoja si no existe
      sheet = await doc.addSheet({
        title: 'Suscripciones',
        headerValues: ['Nombre', 'Email', 'Moneda', 'Fecha']
      })
      console.log('[Google Sheets] Hoja "Suscripciones" creada')
    }

    // Agregar fila
    const timestamp = new Date().toISOString()
    const row = await sheet.addRow({
      Nombre: name,
      Email: email,
      Moneda: currency || 'N/A',
      Fecha: timestamp
    })

    console.log('[Google Sheets] Suscripción guardada:', {
      rowNumber: row.rowNumber,
      email
    })

    return {
      success: true,
      method: 'google_sheets',
      data: { rowNumber: row.rowNumber }
    }
  } catch (error: any) {
    console.error('[Google Sheets Error]', error.message)
    throw error
  }
}

// Middleware de logging para desarrollo
const loggingMiddleware: RequestHandler = (req, _res, next) => {
  console.log(`[API] ${req.method} ${req.path}`)
  next()
}

app.use(loggingMiddleware)

/**
 * GET /api/rates
 *
 * Obtiene los tipos de cambio actuales
 *
 * Query params:
 * - base: Moneda base (default: 'USD')
 * - target: Moneda objetivo (default: 'CLP')
 *
 * Response:
 * {
 *   base: string,
 *   rates: { [currency]: number },
 *   asOf: ISO timestamp
 * }
 */
app.get('/rates', (req: Request, res: Response) => {
  try {
    const { base = 'USD', target = 'CLP' } = req.query

    // Datos mock de tipos de cambio
    // En producción, esto vendría de una API externa o base de datos
    const mockRates: Record<string, number> = {
      USD: 1.0,
      CLP: 987.62,
      PEN: 3.81,
      ARS: 1025.5,
      BRL: 5.42,
      MXN: 17.15,
      COP: 4125.0,
      EUR: 0.92,
      GBP: 0.79
    }

    // Validar que la moneda base exista
    if (!mockRates[base as string]) {
      return res.status(400).json({
        success: false,
        error: `Moneda base '${base}' no soportada`,
        supportedCurrencies: Object.keys(mockRates)
      })
    }

    // Si se especifica un target, podemos priorizar esa información
    const response: RatesResponse = {
      base: base as string,
      rates: mockRates,
      target: (target as string) || null,
      asOf: new Date().toISOString(),
      success: true
    }

    // Log para desarrollo
    console.log(`[Rates] Consulta: ${base} -> ${target || 'ALL'}`)

    res.status(200).json(response)
  } catch (error: any) {
    console.error('[Rates Error]', error)
    res.status(500).json({
      success: false,
      error: 'Error al obtener tipos de cambio',
      message: error.message
    })
  }
})

/**
 * POST /api/subscribe
 *
 * Registra una nueva suscripción de usuario
 *
 * Body:
 * {
 *   name: string (requerido),
 *   email: string (requerido),
 *   currency?: string (opcional)
 * }
 *
 * Response:
 * {
 *   success: boolean,
 *   message: string
 * }
 */
app.post('/subscribe', async (req: Request<{}, {}, SubscribeRequest>, res: Response) => {
  try {
    const { name, email, currency } = req.body

    // Validación de campos requeridos
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Campos requeridos faltantes',
        message: 'Por favor proporciona nombre y email'
      })
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Email inválido',
        message: 'Por favor proporciona un email válido'
      })
    }

    // Log en consola
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📧 NUEVA SUSCRIPCIÓN')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`Nombre:   ${name}`)
    console.log(`Email:    ${email}`)
    console.log(`Moneda:   ${currency || 'No especificada'}`)
    console.log(`Fecha:    ${new Date().toLocaleString('es-CL')}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    // Guardar en Google Sheets (si está configurado)
    let sheetsResult: SheetsResult | null = null
    try {
      sheetsResult = await saveToGoogleSheets(name, email, currency)
    } catch (sheetsError: any) {
      // Si falla Google Sheets, no falla la subscripción
      console.warn(
        '[Subscribe] Error al guardar en Google Sheets, continuando:',
        sheetsError.message
      )
    }

    const response: SubscribeResponse = {
      success: true,
      message:
        '¡Gracias por suscribirte! Te mantendremos informado sobre los mejores tipos de cambio.',
      data: {
        name,
        email,
        currency: currency || null,
        subscribedAt: new Date().toISOString(),
        savedToSheets: sheetsResult?.method === 'google_sheets'
      }
    }

    res.status(201).json(response)
  } catch (error: any) {
    console.error('[Subscribe Error]', error)
    res.status(500).json({
      success: false,
      error: 'Error al procesar suscripción',
      message: error.message
    })
  }
})

/**
 * GET /api/health
 *
 * Health check endpoint para verificar que la API está funcionando
 */
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

/**
 * Manejador de rutas no encontradas
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint no encontrado',
    message: `La ruta ${req.method} ${req.path} no existe`,
    availableEndpoints: ['GET /api/rates', 'POST /api/subscribe', 'GET /api/health']
  })
})

/**
 * Manejador de errores global
 */
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[API Error]', err.stack)
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Ocurrió un error inesperado'
  })
})

export default app
