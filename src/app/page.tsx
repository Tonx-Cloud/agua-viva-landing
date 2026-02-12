import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutBook from "@/components/AboutBook";
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
        <Tasting />
        <VideoGallery />
        <AuthorSection />
        <BuyModal />
      </main>
      <Footer />
    </>
  );
}
