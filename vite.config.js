import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const backendOrigin = env.VITE_SHOWROOM_BACKEND_ORIGIN || "http://127.0.0.1:48081"

  return {
    server: {
      proxy: {
        "/showroom/display": {
          target: backendOrigin,
          changeOrigin: true
        },
        "/admin-api/infra/file": {
          target: backendOrigin,
          changeOrigin: true
        }
      }
    }
  }
})
