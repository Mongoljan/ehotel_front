"use client";

import Aos from "aos";
import { useEffect } from "react";
import ScrollTop from "../components/common/ScrollTop";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import "aos/dist/aos.css";
import "../styles/index.scss";
import { Provider } from "react-redux";
import { store } from "../store/store";

// 👉 Import Sonner instead of react-hot-toast:
import { Toaster } from "sonner";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function RootLayout({ children }) {
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <html lang="en">
      <head>
        {/* …your head tags… */}
      </head>
      <body>
        <main>
          <Provider store={store}>
            {children}
            <ScrollTop />

            {/* Sonner’s Toaster */}
            <Toaster position="top-center" />
          </Provider>
        </main>
      </body>
    </html>
  );
}
