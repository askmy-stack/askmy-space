import Hero from "@/components/hero/Hero";
import ProcessRibbon from "@/components/hero/ProcessRibbon";
import CapabilitiesStrip from "@/components/capabilities/CapabilitiesStrip";
import SelectedWork from "@/components/work/SelectedWork";
import SkillsSection from "@/components/skills/SkillsSection";
import About from "@/components/about/About";
import Experience from "@/components/experience/Experience";
import NowBlock from "@/components/now/NowBlock";
import Contact from "@/components/contact/Contact";
import ReportIssue from "@/components/report/ReportIssue";

export default function HomePage() {
  return (
    <div className="relative z-10">
      <Hero />
      <ProcessRibbon />
      <CapabilitiesStrip />
      <SelectedWork />
      <SkillsSection />
      <About />
      <Experience />
      <NowBlock />
      <Contact />
      <ReportIssue />
    </div>
  );
}
