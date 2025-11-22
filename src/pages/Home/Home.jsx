import Hero from "./Hero";
import QuickServices from "./QuickServices";
import NewsHighlights from "./NewsHighlights";
import QuoteStrip from "./QuoteStrip";
import StatsStrip from "./StatsStrip";
import MapSection from "./MapSection";
import Breadcrumb from "../../components/common/Breadcrumb";

function Home() {
  const breadcrumbs = [];

  return (
    <div id="main-content">
      <Hero />
      <QuoteStrip />
      <QuickServices />
      <NewsHighlights />
      <StatsStrip />
      <MapSection />
    </div>
  );
}

export default Home;
