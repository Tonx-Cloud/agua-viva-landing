import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutBook from "@/components/AboutBook";
import QuoteBanner from "@/components/QuoteBanner";
import Tasting from "@/components/Tasting";
import VideoGallery from "@/components/VideoGallery";
import AudioGallery from "@/components/AudioGallery";
import AuthorSection from "@/components/AuthorSection";
import AuthorWorks from "@/components/AuthorWorks";
import BlogSection from "@/components/BlogSection";
import BuyModal from "@/components/BuyModal";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import AuthGate from "@/components/AuthGate";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutBook />
        <QuoteBanner index={0} variant="dark" />
        <AuthGate>
          <Tasting />
          <QuoteBanner index={1} variant="light" />
          <AudioGallery />
          <VideoGallery />
          <QuoteBanner index={2} variant="dark" />
          <AuthorSection />
          <AuthorWorks />
          <BlogSection />
          <QuoteBanner index={3} variant="light" />
        </AuthGate>
        <BuyModal />
      </main>
      <FloatingButtons />
      <Footer />
    </>
  );
}
