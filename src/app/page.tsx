import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutBook from "@/components/AboutBook";
import QuoteBanner from "@/components/QuoteBanner";
import Tasting from "@/components/Tasting";
import VideoGallery from "@/components/VideoGallery";
import AuthorSection from "@/components/AuthorSection";
import BuyModal from "@/components/BuyModal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutBook />
        <QuoteBanner index={0} variant="dark" />
        <Tasting />
        <QuoteBanner index={1} variant="light" />
        <VideoGallery />
        <QuoteBanner index={2} variant="dark" />
        <AuthorSection />
        <QuoteBanner index={3} variant="light" />
        <BuyModal />
      </main>
      <Footer />
    </>
  );
}
