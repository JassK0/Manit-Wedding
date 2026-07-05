import { useMemo } from "react";
import "./App.css";
import { Hero } from "./components/Hero";
import { DayNav } from "./components/DayNav";
import { HappeningNowBar } from "./components/HappeningNowBar";
import { Timeline } from "./components/Timeline";
import { Footer } from "./components/Footer";
import { WovenTrim } from "./components/PhulkariMotifs";
import { weddingDays } from "./data/events";
import { useActiveSection } from "./hooks/useActiveSection";

export default function App() {
  const dayIds = useMemo(() => weddingDays.map((d) => d.id), []);
  const activeId = useActiveSection(dayIds);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to itinerary
      </a>
      <WovenTrim className="woven-trim" />
      <div className="sticky-header">
        <HappeningNowBar />
        <DayNav activeId={activeId} />
      </div>
      <main id="main">
        <Hero />
        <Timeline />
        <Footer />
      </main>
      <WovenTrim className="woven-trim" />
    </>
  );
}
