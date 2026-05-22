import { defineConfig, loadEnv } from "vite"
import { createMockShowroomWebsiteConfig } from "./src/showroom-website-config.mock.js"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const backendOrigin = env.VITE_SHOWROOM_BACKEND_ORIGIN || "http://127.0.0.1:48081"
  const useMockShowroom = env.VITE_SHOWROOM_USE_MOCK === "true"
  const proxy = {
    "/admin-api/infra/file": {
      target: backendOrigin,
      changeOrigin: true
    }
  }

  if (!useMockShowroom) {
    proxy["/showroom/display"] = {
      target: backendOrigin,
      changeOrigin: true
    }
  }

  return {
    server: {
      middlewareMode: false,
      configureServer(server) {
        if (!useMockShowroom) {
          return
        }

        server.middlewares.use((req, res, next) => {
          if (req.url !== "/showroom/display/website-config") {
            next()
            return
          }

          const payload = {
            code: 0,
            msg: "",
            data: createMockShowroomWebsiteConfig()
          }
          res.setHeader("Content-Type", "application/json; charset=utf-8")
          res.end(JSON.stringify(payload))
        })
      },
      proxy
    }
  }
})
