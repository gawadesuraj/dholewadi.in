import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

function Layout({ children }) {
  return (
    <div className="min-h-screen w-full relative text-gray-800 flex flex-col">
      {/* CSS to hide the scrollbar for the main content area */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none; /* For Chrome, Safari, and Opera */
          }
          .hide-scrollbar {
            -ms-overflow-style: none;  /* For IE and Edge */
            scrollbar-width: none;  /* For Firefox */
          }
        `}
      </style>

      {/* ScrollToTop component ensures navigation scrolls to the top of the new page */}
      <ScrollToTop />

      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main
        id="main-content"
        className="flex-1 overflow-y-auto scroll-smooth hide-scrollbar relative z-10"
        role="main"
        tabIndex={-1}
      >
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
