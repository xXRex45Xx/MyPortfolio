import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing.page.jsx";
import WorkPage from "./pages/work.page.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<LandingPage />} />
                    <Route path="/mywork/:id" element={<WorkPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
