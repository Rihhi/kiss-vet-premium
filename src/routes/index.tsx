import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, animate, AnimatePresence } from "framer-motion";
import {
  MapPin, Phone, Star, Stethoscope, Syringe, Scissors, FlaskConical,
  Cpu, Smile, MessageCircle, Siren, Moon, Sun, ArrowUp, Menu, X,
  Mail, Clock, ChevronLeft, ChevronRight, PawPrint, Sparkles, Send
} from "lucide-react";

import heroPets from "@/assets/hero-pets.jpg";
import clinicImg from "@/assets/clinic.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

/* ---------- helpers ---------- */

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("kv-dark") : null;
    const initial = stored === "1";
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);
  const toggle = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("kv-dark", next ? "1" : "0");
      return next;
    });
  };
  return { dark, toggle };
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2, ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ---------- Navigation ---------- */

const NAV = [
  { href: "#rolunk", label: "Rólunk" },
  { href: "#szolgaltatasok", label: "Szolgáltatások" },
  { href: "#velemenyek", label: "Vélemények" },
  { href: "#galeria", label: "Galéria" },
  { href: "#kapcsolat", label: "Kapcsolat" },
];

function Nav({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 ${
        scrolled ? "glass rounded-full mx-4 px-4 py-2 sm:mx-auto sm:max-w-6xl" : ""
      }`}>
        <a href="#" className="flex items-center gap-2 shrink-0">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--gradient-gold)] shadow-glow">
            <PawPrint className="h-5 w-5 text-navy" strokeWidth={2.4} />
          </div>
          <div className="min-w-0">
            <div className="font-display text-base font-bold leading-none text-navy dark:text-foreground">Kiss</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Állatorvosi Rendelő</div>
          </div>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-foreground/80 transition-colors hover:text-gold">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            aria-label="Sötét mód"
            onClick={toggle}
            className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-background/50 backdrop-blur transition hover:border-gold hover:text-gold"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#kapcsolat"
            className="btn-shimmer hidden rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-luxe transition hover:scale-[1.03] md:inline-flex"
          >
            Időpontfoglalás
          </a>
          <button
            aria-label="Menü"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border/60 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mx-4 mt-2 rounded-3xl p-4 md:hidden"
          >
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm hover:bg-gold/10">
                {n.label}
              </a>
            ))}
            <a href="#kapcsolat" onClick={() => setOpen(false)} className="mt-2 block rounded-xl bg-navy px-4 py-3 text-center text-sm text-primary-foreground">
              Időpontfoglalás
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------- Hero ---------- */

function FloatingPaws() {
  const positions = [
    { top: "12%", left: "8%", delay: 0, size: 28 },
    { top: "22%", left: "82%", delay: 1.5, size: 22 },
    { top: "62%", left: "12%", delay: 3, size: 32 },
    { top: "72%", left: "78%", delay: 2, size: 24 },
    { top: "40%", left: "45%", delay: 4, size: 20 },
    { top: "85%", left: "40%", delay: 1, size: 26 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {positions.map((p, i) => (
        <PawPrint
          key={i}
          className="absolute animate-float-paw text-gold-light/40"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size, animationDelay: `${p.delay}s` }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yFg = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24">
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        <img
          src={heroPets}
          alt="Boldog kutya és macska a Kiss Állatorvosi Rendelőben"
          width={1920}
          height={1280}
          className="h-full w-full scale-110 object-cover"
        />
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-background" />
      </motion.div>

      <FloatingPaws />

      <motion.div style={{ y: yFg, opacity }} className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.24em] backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-gold-light" />
          Prémium állategészségügy Békéscsabán
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
          className="text-balance text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Kiss <span className="text-gradient-gold">Állatorvosi</span> Rendelő
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8 }}
          className="mx-auto mt-6 max-w-2xl text-lg font-light italic text-white/85 sm:text-xl md:text-2xl"
        >
          „Szeretettel és szakértelemmel kedvence egészségéért."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#kapcsolat"
            className="btn-shimmer group inline-flex items-center gap-2 rounded-full bg-[var(--gradient-gold)] px-8 py-4 text-base font-semibold text-navy shadow-glow transition-transform duration-300 hover:scale-[1.05]"
          >
            <span className="relative z-10">Időpontfoglalás</span>
          </a>
          <a
            href="tel:+36209121338"
            className="btn-shimmer inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-transform duration-300 hover:scale-[1.05] hover:bg-white/20"
          >
            <Phone className="h-4 w-4" />
            <span className="relative z-10">Hívás most</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
      >
        <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
          Görgessen
          <div className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Info cards ---------- */

function InfoCards() {
  const items = [
    { icon: MapPin, title: "Cím", value: "5600 Békéscsaba, Kolozsvári utca 61.", href: "https://maps.google.com/?q=5600+Békéscsaba+Kolozsvári+utca+61" },
    { icon: Phone, title: "Telefonszám", value: "+36 20 912 1338", href: "tel:+36209121338" },
    { icon: Star, title: "Értékelés", value: "4,5 / 5 – 88 vélemény alapján" },
  ];
  return (
    <section className="relative -mt-16 px-4 sm:-mt-20">
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3 sm:gap-6">
        {items.map((it, i) => (
          <motion.a
            key={it.title}
            href={it.href}
            target={it.href?.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="glass group flex items-start gap-4 rounded-3xl p-6"
          >
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--gradient-gold)] text-navy shadow-glow transition group-hover:rotate-6">
              <it.icon className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{it.title}</div>
              <div className="mt-1 font-display text-lg font-semibold text-foreground">{it.value}</div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

/* ---------- About ---------- */

function About() {
  return (
    <section id="rolunk" className="py-24 bg-[#F5FAFF]">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-[var(--gradient-gold)] opacity-30 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] shadow-luxe">
            <img src={clinicImg} alt="A Kiss Állatorvosi Rendelő belső tere" width={1400} height={1000} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="glass absolute -bottom-6 -right-6 hidden rounded-2xl p-4 sm:block">
            <div className="text-3xl font-bold text-gradient-gold font-display">10+</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">év tapasztalat</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-xs uppercase tracking-[0.28em] text-gold">Rólunk</div>
          <h2 className="mt-3 text-4xl font-bold leading-tight text-navy dark:text-foreground sm:text-5xl">
            Családias környezet, <span className="text-gradient-gold">prémium</span> ellátás.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            A Kiss Állatorvosi Rendelő célja, hogy minden kis kedvenc a lehető legjobb ellátásban részesüljön.
            Több éves tapasztalattal, korszerű eszközökkel és állatszerető szemlélettel várjuk pácienseinket.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Modern diagnosztika", "Empatikus csapat", "Nyugodt vizsgálók", "Sürgősségi elérés"].map((f) => (
              <li key={f} className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-sage/20 text-sage">
                  <PawPrint className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{f}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */

const SERVICES = [
  { icon: Stethoscope, title: "Általános vizsgálat", desc: "Alapos állapotfelmérés és tanácsadás minden korosztály számára." },
  { icon: Syringe, title: "Védőoltások", desc: "Az évszakoknak és életkornak megfelelő oltási program." },
  { icon: Scissors, title: "Sebészeti ellátás", desc: "Modern műtétek biztonságos altatással és utókezeléssel." },
  { icon: FlaskConical, title: "Laborvizsgálatok", desc: "Gyors, helyben elérhető vérkép és egyéb laboratóriumi tesztek." },
  { icon: Cpu, title: "Mikrochip beültetés", desc: "Fájdalommentes chippezés hivatalos regisztrációval." },
  { icon: Smile, title: "Fogászati kezelések", desc: "Ultrahangos fogkőeltávolítás és teljes szájhigiéniai kezelés." },
  { icon: MessageCircle, title: "Tanácsadás", desc: "Táplálás, viselkedés, tartás — személyre szabott javaslatokkal." },
  { icon: Siren, title: "Sürgősségi ellátás", desc: "Gyors reagálás váratlan helyzetekben, telefonos konzultációval." },
];

function Services() {
  return (
    <section id="szolgaltatasok" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-sage/5 to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs uppercase tracking-[0.28em] text-gold">Szolgáltatások</div>
          <h2 className="mt-3 text-4xl font-bold text-navy dark:text-foreground sm:text-5xl">
            Teljes körű állategészségügy
          </h2>
          <p className="mt-4 text-muted-foreground">Kedvencei minden élethelyzetére felkészülten.</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.55 }}
              whileHover={{ y: -8, boxShadow: "0 30px 60px -20px oklch(0.32 0.06 250 / 0.35)" }}
              className="group glass relative overflow-hidden rounded-3xl p-7"
            >
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[var(--gradient-sage)] text-white shadow-luxe transition-transform duration-500 group-hover:rotate-[12deg]">
                <s.icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="font-display text-xl font-semibold text-navy dark:text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-gold/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */

function Stats() {
  const stats = [
    { value: 10, suffix: "+", label: "év tapasztalat" },
    { value: 1000, suffix: "+", label: "kezelt kisállat" },
    { value: 4.5, suffix: "★", label: "átlagos értékelés", decimal: true },
    { value: 88, suffix: "+", label: "elégedett vélemény" },
  ];
  return (
    <section className="relative mx-6 my-16 overflow-hidden rounded-[2.5rem] bg-navy px-6 py-20 text-white shadow-luxe sm:mx-auto sm:max-w-7xl">
      <div className="absolute inset-0 -z-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,var(--color-gold)_0,transparent_40%),radial-gradient(circle_at_80%_80%,var(--color-sage)_0,transparent_40%)]" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="text-xs uppercase tracking-[0.28em] text-gold-light">Miért minket válasszon?</div>
        <h2 className="mt-3 text-4xl font-bold sm:text-5xl">Bizalom, számokban.</h2>
      </div>
      <div className="relative z-10 mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-5xl font-bold text-gradient-gold sm:text-6xl">
              {s.decimal ? (
                <>{s.value}<span className="text-3xl">{s.suffix}</span></>
              ) : (
                <><Counter to={s.value} />{s.suffix}</>
              )}
            </div>
            <div className="mt-2 text-xs uppercase tracking-widest text-white/70">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */

const REVIEWS = [
  { name: "Anna K.", text: "Profi, segítőkész csapat, az összes állatkámat ide hozom." },
  { name: "Péter T.", text: "Nagyon jó kezekben volt a cicánk." },
  { name: "Zsuzsa M.", text: "Kedves és hozzáértő szakemberek." },
  { name: "László B.", text: "Sürgős esetben azonnal fogadtak, hálásak vagyunk." },
  { name: "Nóra V.", text: "Modern rendelő, empatikus orvosok. Csak ajánlani tudom!" },
];

function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="velemenyek" className="mx-auto max-w-6xl px-6 py-28">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs uppercase tracking-[0.28em] text-gold">Vélemények</div>
        <h2 className="mt-3 text-4xl font-bold text-navy dark:text-foreground sm:text-5xl">Amit ügyfeleink mondanak</h2>
      </div>
      <div className="relative mt-14 overflow-hidden">
        <div className="glass mx-auto max-w-3xl rounded-[2rem] p-10 text-center sm:p-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="mt-6 font-display text-2xl italic leading-relaxed text-foreground sm:text-3xl">
                „{REVIEWS[idx].text}"
              </p>
              <div className="mt-6 text-sm uppercase tracking-widest text-muted-foreground">— {REVIEWS[idx].name}</div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button aria-label="Előző" onClick={() => setIdx((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)} className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:border-gold hover:text-gold">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} aria-label={`Vélemény ${i + 1}`} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-gold" : "w-2 bg-border"}`} />
              ))}
            </div>
            <button aria-label="Következő" onClick={() => setIdx((i) => (i + 1) % REVIEWS.length)} className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:border-gold hover:text-gold">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Gallery ---------- */

const GALLERY = [
  { src: g1, alt: "Vizsgálat kutyával", h: "row-span-2" },
  { src: g2, alt: "Cica a vizsgálón", h: "" },
  { src: g3, alt: "Vidám kiskutya", h: "" },
  { src: g4, alt: "Csapatunk", h: "row-span-2" },
  { src: g5, alt: "Puppy paw", h: "row-span-2" },
  { src: g6, alt: "Rendelő kívülről", h: "" },
];

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="galeria" className="mx-auto max-w-7xl px-6 py-28">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs uppercase tracking-[0.28em] text-gold">Galéria</div>
        <h2 className="mt-3 text-4xl font-bold text-navy dark:text-foreground sm:text-5xl">Pillanatképek a rendelőből</h2>
      </div>
      <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {GALLERY.map((g, i) => (
          <motion.button
            key={i}
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (i % 6) * 0.06 }}
            className={`group relative overflow-hidden rounded-3xl shadow-luxe ${g.h}`}
          >
            <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-navy/90 p-6 backdrop-blur-xl"
          >
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={GALLERY[open].src} alt={GALLERY[open].alt}
              className="max-h-[85vh] max-w-[95vw] rounded-2xl shadow-luxe"
            />
            <button aria-label="Bezárás" onClick={() => setOpen(null)} className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur">
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="kapcsolat" className="mx-auto max-w-7xl px-6 py-28">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs uppercase tracking-[0.28em] text-gold">Kapcsolat</div>
        <h2 className="mt-3 text-4xl font-bold text-navy dark:text-foreground sm:text-5xl">Írjon vagy látogasson meg</h2>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          {[
            { icon: MapPin, title: "Cím", value: "5600 Békéscsaba, Kolozsvári utca 61." },
            { icon: Phone, title: "Telefon", value: "+36 20 912 1338", href: "tel:+36209121338" },
            { icon: Mail, title: "E-mail", value: "info@kissallatorvos.hu", href: "mailto:info@kissallatorvos.hu" },
            { icon: Clock, title: "Nyitvatartás", value: "H–P: 8:00–18:00 · Szo: 9:00–13:00" },
          ].map((c) => (
            <a key={c.title} href={c.href} className="glass flex items-center gap-4 rounded-2xl p-5 transition hover:-translate-y-0.5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--gradient-gold)] text-navy">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.title}</div>
                <div className="mt-0.5 font-medium">{c.value}</div>
              </div>
            </a>
          ))}
          <div className="overflow-hidden rounded-3xl shadow-luxe">
            <iframe
              title="Térkép"
              src="https://www.google.com/maps?q=5600+Békéscsaba+Kolozsvári+utca+61&output=embed"
              className="h-64 w-full border-0"
              loading="lazy"
            />
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3500); }}
          className="glass rounded-3xl p-8"
        >
          <h3 className="font-display text-2xl font-semibold">Időpontkérés / Üzenet</h3>
          <p className="mt-1 text-sm text-muted-foreground">Vegye fel velünk a kapcsolatot, hamarosan válaszolunk.</p>
          <div className="mt-6 space-y-4">
            <input required placeholder="Név" className="w-full rounded-2xl border border-border bg-background/60 px-4 py-3 outline-none transition focus:border-gold" />
            <input required type="email" placeholder="E-mail" className="w-full rounded-2xl border border-border bg-background/60 px-4 py-3 outline-none transition focus:border-gold" />
            <input placeholder="Telefonszám" className="w-full rounded-2xl border border-border bg-background/60 px-4 py-3 outline-none transition focus:border-gold" />
            <textarea required rows={5} placeholder="Üzenet — kedvence neve, faja, panasza…" className="w-full rounded-2xl border border-border bg-background/60 px-4 py-3 outline-none transition focus:border-gold" />
            <button type="submit" className="btn-shimmer inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-4 font-semibold text-primary-foreground shadow-luxe transition hover:scale-[1.02]">
              <Send className="h-4 w-4" /> <span className="relative z-10">{sent ? "Elküldve — köszönjük!" : "Üzenet küldése"}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-navy py-12 text-white/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--gradient-gold)]">
            <PawPrint className="h-5 w-5 text-navy" />
          </div>
          <div>
            <div className="font-display text-lg font-semibold text-white">Kiss Állatorvosi Rendelő</div>
            <div className="text-xs uppercase tracking-widest">Békéscsaba</div>
          </div>
        </div>
        <div className="text-xs">© {new Date().getFullYear()} Kiss Állatorvosi Rendelő. Minden jog fenntartva.</div>
      </div>
    </footer>
  );
}

/* ---------- Extras: scroll progress + back to top + mobile call ---------- */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <motion.div style={{ width }} className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-[var(--gradient-gold)]" />
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Vissza a tetejére"
          className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-navy text-white shadow-luxe transition hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function MobileCall() {
  return (
    <a
      href="tel:+36209121338"
      aria-label="Hívás"
      className="fixed bottom-6 left-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[var(--gradient-gold)] text-navy shadow-glow md:hidden"
    >
      <Phone className="h-5 w-5" />
    </a>
  );
}

function PageLoader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-navy"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="grid h-20 w-20 place-items-center rounded-full bg-[var(--gradient-gold)] shadow-glow"
          >
            <PawPrint className="h-9 w-9 text-navy" strokeWidth={2.4} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Page ---------- */

function Home() {
  const { dark, toggle } = useDarkMode();
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <PageLoader />
      <ScrollProgress />
      <Nav dark={dark} toggle={toggle} />
      <main>
        <Hero />
        <InfoCards />
        <About />
        <Services />
        <Stats />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <MobileCall />
    </div>
  );
}
