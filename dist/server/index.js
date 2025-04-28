import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express()

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  app.use(vite.middlewares)

  app.use('*', async (req, res) => {
    const url = req.originalUrl

    try {
      // Read index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, '../index.html'),
        'utf-8'
      )

      // Apply Vite HTML transforms
      template = await vite.transformIndexHtml(url, template)

      // Load server entry
      const { render } = await vite.ssrLoadModule('./server/entry-server.js')

      // Render app HTML
      const { app: vueApp, router, pinia } = await render(url)

      // Render app HTML
      const appHtml = await vueApp.renderToString()

      // Inject the app HTML and state into the template
      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          '<!--pinia-state-->',
          `<script>window.PINIA_STATE = ${JSON.stringify(pinia.state.value)}</script>`
        )

      // Return the rendered HTML
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
  })
}

createServer() 