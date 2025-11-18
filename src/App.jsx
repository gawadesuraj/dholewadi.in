/* eslint-disable no-unused-vars */
// FILE: src/App.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GlobalBackground from "./components/ui/GlobalBackground";
import Layout from "./components/layout/Layout";
import Router from "./router";
import "./i18n/i18n"; // Initialize i18n
// import "./styles/responsive.css";

import { useEffect } from "react";

// REMOVED: AOS imports
// import AOS from "aos";
// import "aos/dist/aos.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  // REMOVED: AOS Initialization useEffect
  // AOS often causes z-index issues with Modals because it adds 'transform' styles.

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalBackground>
          <Layout>
            <Router />
          </Layout>
        </GlobalBackground>
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="toast-container"
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
