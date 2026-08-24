import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Hero from "./components/Hero";
import Feature from "./components/Feature";
import Footer from "./components/Footer";
import Home from "./Home";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <header className="flex h-[200px] flex-col bg-black">
        <Banner />
      </header>
      <Hero />
      <Feature />
      <Home />
      <Footer />
    </div>
  );
}
