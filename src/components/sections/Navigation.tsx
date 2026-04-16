import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_ITEMS } from "@/data";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="font-display text-xl font-bold tracking-tight text-foreground">
            PRIME<span className="text-primary">ASSIST</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button key={item} onClick={() => scrollTo(item === "Contact" ? "cta" : item.toLowerCase())}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-medium">
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.upwork.com/agencies/1953211500372666476/" target="_blank" rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:shadow-[0_0_30px_-5px_hsl(192_95%_55%/0.5)] transition-all duration-300">
              Hire Us <ArrowUpRight size={14} />
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
            {NAV_ITEMS.map((item, i) => (
              <motion.button key={item}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => scrollTo(item === "Contact" ? "cta" : item.toLowerCase())}
                className="text-3xl font-display font-bold text-foreground hover:text-primary transition-colors">
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
