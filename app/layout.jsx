"use client";

import Aos from "aos";
import { useEffect } from "react";
import ScrollToTop from "../components/common/ScrollTop";
import { TranslationProvider } from "../contexts/TranslationContext";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import "aos/dist/aos.css";
import "../styles/index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { store } from "../store/store";

// 👉 Import Sonner instead of react-hot-toast:
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  useEffect(() => {
    // Only load bootstrap on client side
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap");
    }
    
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <html lang="en">
      <head>
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" 
          rel="stylesheet" 
        />
        {/* …your head tags… */}
      </head>
      <body>
        <TranslationProvider>
          <main>
            <Provider store={store}>
              {children}
              <ScrollToTop />
              <Toaster 
                position="top-right" 
                richColors 
                closeButton
              />
            </Provider>
          </main>
        </TranslationProvider>
      </body>
    </html>
  );
}
