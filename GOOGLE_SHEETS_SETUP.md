# Configuración de Google Sheets para Suscripciones

Este documento explica cómo configurar la integración con Google Sheets para almacenar las suscripciones de usuarios.

## Paso 1: Crear un Proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Nombre sugerido: "Global66-Subscriptions"

## Paso 2: Habilitar la API de Google Sheets

1. En el menú lateral, ve a **APIs & Services** → **Enable APIs and Services**
2. Busca "Google Sheets API"
3. Haz clic en **Enable**

## Paso 3: Crear Service Account

1. Ve a **APIs & Services** → **Credentials**
2. Haz clic en **Create Credentials** → **Service Account**
3. Llena los datos:
   - **Service account name**: `global66-sheets-service`
   - **Service account ID**: (se genera automáticamente)
   - **Description**: "Service account para integración con Google Sheets"
4. Haz clic en **Create and Continue**
5. En "Grant this service account access to project":
   - No necesitas agregar roles específicos
6. Haz clic en **Done**

## Paso 4: Crear Key (Clave JSON)

1. En la lista de Service Accounts, haz clic en el email del service account que acabas de crear
2. Ve a la pestaña **Keys**
3. Haz clic en **Add Key** → **Create new key**
4. Selecciona **JSON**
5. Haz clic en **Create**
6. Se descargará un archivo JSON con las credenciales - ¡guárdalo en un lugar seguro!

## Paso 5: Crear Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala "Global66 - Suscripciones"

**Nota:** La hoja "Suscripciones" con los encabezados se creará automáticamente la primera vez que se guarde una suscripción. Si prefieres crearla manualmente:

4. Crea una hoja llamada "Suscripciones" (o renombra la hoja por defecto)
5. En la primera fila, agrega los siguientes encabezados:
   ```
   | Nombre | Email | Moneda | Fecha |
   ```

## Paso 6: Compartir la Hoja con el Service Account

1. En tu Google Sheet, haz clic en **Compartir** (Share)
2. Copia el **email del service account** desde el archivo JSON descargado
   - Se ve así: `nombre-service@proyecto-id.iam.gserviceaccount.com`
3. Pega el email en el campo "Add people and groups"
4. Dale permisos de **Editor**
5. Desmarca "Notify people" (no es necesario)
6. Haz clic en **Share**

## Paso 7: Obtener el ID de la Hoja

1. En tu Google Sheet abierto, mira la URL
2. La URL se ve así:
   ```
   https://docs.google.com/spreadsheets/d/ABC123XYZ789/edit
   ```
3. El ID de la hoja es la parte entre `/d/` y `/edit`:
   ```
   ABC123XYZ789
   ```
4. Copia este ID

## Paso 8: Configurar Variables de Entorno

1. Abre el archivo JSON de credenciales descargado
2. Crea un archivo `.env` en la raíz del proyecto (o copia `.env.example`)
3. Llena las variables:

```bash
# Google Sheets Configuration
GOOGLE_SHEET_ID=ABC123XYZ789
GOOGLE_SERVICE_ACCOUNT_EMAIL=nombre-service@proyecto-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgk...[tu clave aquí]...==\n-----END PRIVATE KEY-----\n"

# Server Configuration
PORT=3000
NODE_ENV=development
BASE_URL=http://localhost:3000
```

**⚠️ Importante:**

- El `GOOGLE_PRIVATE_KEY` debe incluir `\n` para los saltos de línea
- Asegúrate de que esté entre comillas dobles
- No compartas este archivo `.env` - está en `.gitignore`

## Paso 9: Instalar Dependencias

El proyecto usa `google-spreadsheet` (librería simplificada) en lugar de `googleapis` para mayor facilidad de uso.

```bash
npm install
```

Las dependencias necesarias son:
- `google-spreadsheet` - Cliente simplificado para Google Sheets
- `google-auth-library` - Autenticación con service accounts

## Paso 10: Probar la Integración

1. Inicia el servidor:

   ```bash
   npm run dev
   ```

2. Envía una petición de prueba:

   ```bash
   curl -X POST http://localhost:3000/api/subscribe \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","currency":"CLP"}'
   ```

3. Verifica que aparezca una nueva fila en tu Google Sheet

## Verificar el Estado

Si Google Sheets no está configurado, la aplicación seguirá funcionando pero solo guardará los datos en los logs de consola. Verás este mensaje:

```
[Google Sheets] No configurado - guardando solo en logs
```

## Estructura de la Hoja

Cada suscripción se guardará con el siguiente formato:

| Nombre       | Email             | Moneda | Fecha                    |
| ------------ | ----------------- | ------ | ------------------------ |
| Juan Pérez   | juan@example.com  | CLP    | 2024-10-31T17:51:00.000Z |
| María García | maria@example.com | PEN    | 2024-10-31T18:30:00.000Z |

## Troubleshooting

### Error: "The caller does not have permission"

- Asegúrate de haber compartido la hoja con el email del service account
- Verifica que tiene permisos de "Editor"

### Error: "Unable to parse range"

- La hoja "Suscripciones" se crea automáticamente si no existe
- Si creaste manualmente una hoja con otro nombre, renómbrala a "Suscripciones"
- O cambia el nombre en `api/index.js` línea 51: `doc.sheetsByTitle['TuNombreAqui']`

### Error: "Invalid grant"

- Verifica que el `GOOGLE_PRIVATE_KEY` esté correctamente formateado
- Asegúrate de que tenga los `\n` para los saltos de línea

## Seguridad

- ✅ Nunca subas el archivo `.env` a Git
- ✅ El archivo `.gitignore` ya incluye `.env`
- ✅ No compartas el archivo JSON de credenciales
- ✅ Rota las credenciales periódicamente
- ✅ Usa diferentes service accounts para desarrollo y producción

## Link Público del Spreadsheet

Para compartir el spreadsheet públicamente (solo lectura):

1. En tu Google Sheet, haz clic en **Compartir**
2. En "Get link", cambia a **Anyone with the link** → **Viewer**
3. Copia el link y compártelo

**Link público:**

```
https://docs.google.com/spreadsheets/d/1TNrQZm9opycleRKn3qUHC9cHs4DHPML6fVsxFhqeeMA
```
