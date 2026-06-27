// src/App.jsx

import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Ask from "./components/Ask";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy-loaded route components for extreme bundle optimization (Level 3 Fix)
const Home = lazy(() => import("./pages/Home"));
const Biology = lazy(() => import("./pages/Biology"));
const Chemistry = lazy(() => import("./pages/Chemistry"));
const Physics = lazy(() => import("./pages/Physics"));
const Mathematics = lazy(() => import("./pages/Mathematics"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Policy = lazy(() => import("./pages/Policy"));
const Terms = lazy(() => import("./pages/Terms"));
const Feedback = lazy(() => import("./pages/Feedback"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        {/* Main Layout */}
        <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
        
        {/* Navbar */}
        <Navbar />

        {/* Page Routes wrapped in Suspense for code splitting */}
        <main>
          <Suspense 
            fallback={
              <div className="flex min-h-[75vh] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
                  <p className="text-sm font-bold text-slate-500 animate-pulse">Loading simulation environment...</p>
                </div>
              </div>
            }
          >
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Auth */}
              <Route path="/auth" element={<Auth />} />

              {/* Subject Pages */}
              <Route path="/biology/*" element={<Biology />} />
              <Route path="/chemistry/*" element={<Chemistry />} />
              <Route path="/physics/*" element={<Physics />} />
              <Route path="/mathematics/*" element={<Mathematics />} />
              {/* FAQ */}
              <Route path="/faq" element={<FAQ />} />

              {/* Policy */}
              <Route path="/policy" element={<Policy />} />

              <Route path="/terms" element={<Terms />} />

              <Route path="/feedback" element={<Feedback />} />
              {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        {/* Floating AI Assistant */}
        <Ask />
      </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;