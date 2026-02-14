import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import QuoteForm from "@/components/QuoteForm";
import Trust from "@/components/Trust";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
        <QuoteForm />
        <Trust />
      </main>
      <Footer />
    </>
  );
};

export default Index;
