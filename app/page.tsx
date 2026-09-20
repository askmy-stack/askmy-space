import Hero from "@/components/hero/Hero";
import ScrollScene from "@/components/scene/ScrollScene";
import SocialProofBar from "@/components/social-proof/SocialProofBar";
import CapabilitiesStrip from "@/components/capabilities/CapabilitiesStrip";
import SelectedWork from "@/components/work/SelectedWork";
import SkillsSection from "@/components/skills/SkillsSection";
import About from "@/components/about/About";
import Experience from "@/components/experience/Experience";
import NowBlock from "@/components/now/NowBlock";
import OpenSource from "@/components/open-source/OpenSource";
import Contact from "@/components/contact/Contact";
import ReportIssue from "@/components/report/ReportIssue";

export default function HomePage() {
  return (
    <>
      <ScrollScene />
      <div className="relative z-10">
        <Hero />
        <SocialProofBar />
        <CapabilitiesStrip />
        <SelectedWork />
        <SkillsSection />
        <About />
        <Experience />
        <NowBlock />
        <OpenSource />
        <Contact />
        <ReportIssue />
      </div>
    </>
  );
}
