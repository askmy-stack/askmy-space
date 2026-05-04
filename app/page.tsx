import Hero from "@/components/hero/Hero";
import SocialProofBar from "@/components/social-proof/SocialProofBar";
import CapabilitiesStrip from "@/components/capabilities/CapabilitiesStrip";
import SelectedWork from "@/components/work/SelectedWork";
import About from "@/components/about/About";
import Experience from "@/components/experience/Experience";
import NowBlock from "@/components/now/NowBlock";
import Contact from "@/components/contact/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProofBar />
      <CapabilitiesStrip />
      <SelectedWork />
      <About />
      <Experience />
      <NowBlock />
      <Contact />
    </>
  );
}
