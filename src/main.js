import "./style.css"
import { createDemoApp } from "./app.js"
import { categories } from "./demoData.js"

const root = document.getElementById("app")

createDemoApp(root, categories, categories[0].id)
