import Header from "./Header";
import Footer from "./Footer";

// ... existing imports

function Layout({ children }) {
  return (
    <div className="min-h-screen w-full relative text-gray-800 flex flex-col">

      {/* Header */}
      <Header />

      {/* Main Content Area */}
      {/* REMOVED 'z-10' from the className below */}
      <main
        id="main-content"
        className="flex-1 overflow-y-auto scroll-smooth hide-scrollbar relative"
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
