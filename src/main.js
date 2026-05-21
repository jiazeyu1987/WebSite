import "./medical-kiosk.css"
import "./showroom-app.css"
import { createMedicalKioskApp } from "./medical-kiosk.js"
import { createShowroomConsumerApp } from "./showroom-app.js"

const root = document.getElementById("app")
const pathname = window.location.pathname.replace(/\/+$/, "") || "/"

if (pathname.startsWith("/showroom")) {
  createShowroomConsumerApp(root)
} else {
  createMedicalKioskApp(root)
}
