import App from "./App"
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Details from "./Details"
import Home from "./Home"
import { createRoot } from "react-dom/client"
import { StrictMode } from "react"

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)
const router = createBrowserRouter([
    {
        path: "/details/:id",
        element: <Details />
    },
    {
        path: "/",
        element: <Home />
    }
])

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)