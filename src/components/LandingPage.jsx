import { useEffect, useRef, useState } from "react";
import {
  Volume2,
  Map,
  BookMarked,
  Users,
  Target,
  Compass,
  Sparkles,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Handshake,
  Check,
  Minus,
  Download,
} from "lucide-react";

import logo from "../assets/logo.png";
import logoBlanco from "../assets/logoBlanco.png";
import pinolitoVolando from "../assets/pinolito/volando.png";
import pinolitoPensando from "../assets/pinolito/pensando.png";
import pinolitoAlegre from "../assets/pinolito/alegre.png";
import pinolitoEmocionado from "../assets/pinolito/emocionado.png";
import pinolitoFeliz from "../assets/pinolito/feliz.png";
import pinolitoCaminando from "../assets/pinolito/caminando.png";
import pinolitoDinamico from "../assets/pinolito/dinamico.png";

import "./LandingPage.css";

/* -------------------------------------------------------------------- */
/* Hook: reveals an element (and optionally draws the route line next   */
/* to it) the first time it scrolls into view.                          */
/* -------------------------------------------------------------------- */
function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.2, ...options }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

/* A single stop along the route: pin marker + dashed connector that     */
/* "grows" into view, used to open every section.                        */
function ParadaMarker({ numero, color }) {
  const [ref, visible] = useReveal({ threshold: 0.4 });
  return (
    <div className={`parada-marker ${visible ? "is-visible" : ""}`} ref={ref}>
      <span className="parada-connector" style={{ background: color }} />
      <span className="parada-pin" style={{ borderColor: color }}>
        <Map size={14} strokeWidth={2.5} color={color} />
      </span>
      <span className="parada-numero" style={{ color }}>
        Parada {numero}
      </span>
    </div>
  );
}

function Reveal({ as: Tag = "div", className = "", children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#ruta", label: "La ruta" },
    { href: "#equipo", label: "Quiénes somos" },
    { href: "#mision", label: "Misión y visión" },
    { href: "#diferencia", label: "Por qué Ruta 505" },
  ];

  return (
    <div className="r505">
      {/* ---------------------------------------------------------- NAV */}
      <header className={`r505-nav ${scrolled ? "r505-nav--scrolled" : ""}`}>
        <div className="r505-nav__inner">
          <a href="#top" className="r505-nav__brand">
            <img src={scrolled ? logo : logoBlanco} alt="Ruta 505" />
          </a>

          <nav className="r505-nav__links">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#cta" className="r505-btn r505-btn--sm r505-nav__cta">
            Súmate <ArrowRight size={16} />
          </a>

          <button
            className="r505-nav__burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="r505-nav__mobile">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href="#cta" className="r505-btn" onClick={() => setMenuOpen(false)}>
              Súmate a la ruta
            </a>
          </div>
        )}
      </header>

      {/* --------------------------------------------------------- HERO */}
      <section className="r505-hero" id="top">
        <div className="r505-hero__glow" />
        <div className="r505-hero__inner">
          <Reveal className="r505-hero__copy">
            <span className="r505-eyebrow">
              <Sparkles size={14} /> Turismo cultural y comunitario de Nicaragua
            </span>
            <h1>
              La cultura viva de Nicaragua,
              <br />
              <span className="r505-hero__accent">contada por quien la vive.</span>
            </h1>
            <p>
              Ruta 505 conecta al turista con comunidades, artesanos y guías a
              través de rutas creativas, un asistente que narra cada lugar con
              audio contextual, y un pasaporte digital que convierte cada
              visita en una historia propia.
            </p>
            <div className="r505-hero__actions">
              <a href="#cta" className="r505-btn r505-btn--lg">
                Descubre la ruta <ArrowRight size={18} />
              </a>
              <a href="#ruta" className="r505-btn r505-btn--ghost-light r505-btn--lg">
                ¿Cómo funciona?
              </a>
            </div>
          </Reveal>

          <div className="r505-hero__art">
            <img
              src={pinolitoVolando}
              alt="Pinolito, la mascota de Ruta 505, volando"
              className="r505-float"
            />
          </div>
        </div>

        <div className="r505-hero__trail" aria-hidden="true">
          <svg viewBox="0 0 200 60" preserveAspectRatio="none">
            <path
              d="M0,50 C 50,10 150,10 200,50"
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2"
              strokeDasharray="1 10"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </section>

      {/* ------------------------------------------------- ¿QUÉ ES? ---- */}
      <section className="r505-section" id="ruta">
        <ParadaMarker numero="01" color="#065F33" />
        <div className="r505-section__grid">
          <Reveal className="r505-section__text">
            <h2>¿De qué trata Ruta 505?</h2>
            <p>
              Ruta 505 es una plataforma web y móvil que conecta al turista
              con la oferta cultural y comunitaria de Nicaragua. A través de
              rutas creativas diseñadas directamente por los actores
              culturales, un asistente virtual que narra cada lugar mediante
              audio contextual, y un pasaporte digital que convierte al
              turista en protagonista de su propia experiencia, la plataforma
              organiza y da visibilidad a un sector históricamente disperso
              en el entorno digital.
            </p>
            <p>
              La propuesta surge como respuesta a una necesidad concreta:
              permitir que comunidades, artesanos y guías turísticos
              alcancen al visitante de forma directa, ordenada y verificable,
              sin depender de intermediarios.
            </p>
          </Reveal>

          <Reveal className="r505-feature-stack" delay={120}>
            <div className="r505-feature-card">
              <Volume2 size={22} />
              <div>
                <h3>Audio contextual</h3>
                <p>Pinolito narra cada lugar según dónde estás parado.</p>
              </div>
            </div>
            <div className="r505-feature-card">
              <Map size={22} />
              <div>
                <h3>Rutas creativas</h3>
                <p>Armadas por los propios actores culturales, con costo claro.</p>
              </div>
            </div>
            <div className="r505-feature-card">
              <BookMarked size={22} />
              <div>
                <h3>Pasaporte digital</h3>
                <p>Cada visita queda registrada como tu propia historia.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------- EQUIPO ------ */}
      <section className="r505-section r505-section--dark" id="equipo">
        <ParadaMarker numero="02" color="#95C11F" />
        <div className="r505-section__grid r505-section__grid--reverse">
          <Reveal className="r505-mascota">
            <img src={pinolitoPensando} alt="Pinolito pensando" className="r505-float r505-float--slow" />
          </Reveal>
          <Reveal className="r505-section__text" delay={100}>
            <span className="r505-tag">
              <Users size={14} /> Quiénes somos
            </span>
            <h2>Un equipo nicaragüense, con los pies en Chontales</h2>
            <p>
              Ruta 505 es desarrollado por <strong>Cuajada Salvaje</strong>,
              un equipo de estudiantes nicaragüenses comprometidos con el
              fortalecimiento del turismo cultural y comunitario del país. El
              equipo combina conocimiento en comunicación, tecnología y
              gestión turística, con un enfoque particular en el
              departamento de Chontales y las zonas rurales de Nicaragua.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------- MISIÓN / VISIÓN - */}
      <section className="r505-section" id="mision">
        <ParadaMarker numero="03" color="#009FE3" />
        <Reveal as="h2" className="r505-section__title">
          Misión y visión
        </Reveal>
        <div className="r505-mv-grid">
          <Reveal className="r505-mv-card">
            <Handshake size={26} />
            <h3>Misión</h3>
            <p>
              Conectar al turista con la cultura viva de Nicaragua, brindando
              a las comunidades, artesanos y guías turísticos una
              herramienta digital confiable que dé visibilidad a su oferta,
              facilite el contacto directo con el visitante y contribuya a
              mejorar sus ingresos.
            </p>
          </Reveal>
          <Reveal className="r505-mv-card" delay={120}>
            <Compass size={26} />
            <h3>Visión</h3>
            <p>
              Convertirnos en la plataforma de referencia del turismo
              cultural y comunitario en Nicaragua, reconocida por articular
              de manera confiable al turista, al actor cultural y a las
              instituciones reguladoras, con proyección de expansión hacia
              otros destinos de la región centroamericana.
            </p>
          </Reveal>
        </div>
        <img
          src={pinolitoAlegre}
          alt="Pinolito alegre"
          className="r505-mascota-cameo r505-float"
        />
      </section>

      {/* --------------------------------------------------- METAS ----- */}
      <section className="r505-section r505-section--tint" id="metas">
        <ParadaMarker numero="04" color="#F39200" />
        <div className="r505-section__grid r505-section__grid--reverse">
          <Reveal className="r505-mascota">
            <img src={pinolitoEmocionado} alt="Pinolito emocionado" className="r505-float" />
          </Reveal>
          <Reveal className="r505-section__text" delay={80}>
            <span className="r505-tag">
              <Target size={14} /> Hacia dónde vamos
            </span>
            <h2>¿Qué esperamos lograr con Ruta 505?</h2>
            <ul className="r505-goal-list">
              <li>
                <TrendingUp size={18} />
                Aumentar la visibilidad digital de los pequeños prestadores
                de servicios culturales que hoy no figuran en ninguna
                plataforma.
              </li>
              <li>
                <Map size={18} />
                Contribuir a extender la estadía promedio del turista en
                Nicaragua mediante rutas que integran varios atractivos y
                servicios.
              </li>
              <li>
                <Handshake size={18} />
                Generar una fuente adicional de ingresos directos para
                familias y comunidades rurales, sin intermediarios ni
                comisiones por transacción.
              </li>
              <li>
                <ShieldCheck size={18} />
                Fortalecer la confianza del visitante mediante la alianza
                con INTUR y el distintivo Experiencia Verificada.
              </li>
              <li>
                <Sparkles size={18} />
                Posicionar al departamento de Chontales como punto de
                partida de un modelo replicable a nivel nacional.
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------- DIFERENCIACIÓN -- */}
      <section className="r505-section" id="diferencia">
        <ParadaMarker numero="05" color="#065F33" />
        <Reveal className="r505-section__text r505-section__text--center">
          <h2>¿Qué nos diferencia de otras plataformas?</h2>
          <p>
            En Nicaragua ya existen iniciativas digitales orientadas al
            turismo, como Mapa Nicaragua, Visita Nicaragua, Vagabundo
            Nicaragua y Passporter. Así se compara Ruta 505 frente a ellas.
          </p>
        </Reveal>

        <Reveal className="r505-table-wrap" delay={100}>
          <table className="r505-table">
            <thead>
              <tr>
                <th>Aspecto</th>
                <th className="r505-table__highlight">
                  <img src={logoBlanco} alt="Ruta 505" />
                </th>
                <th>Otras plataformas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Narración del atractivo</td>
                <td className="r505-table__highlight">
                  <Check size={16} /> Audio contextual y geolocalizado con
                  Pinolito
                </td>
                <td>
                  <Minus size={16} /> Información estática en texto o mapa
                </td>
              </tr>
              <tr>
                <td>Diseño de rutas</td>
                <td className="r505-table__highlight">
                  <Check size={16} /> Creadas por los propios actores
                  culturales, con costo estimado
                </td>
                <td>
                  <Minus size={16} /> Listados sin paquete ni costo integrado
                </td>
              </tr>
              <tr>
                <td>Rol del turista</td>
                <td className="r505-table__highlight">
                  <Check size={16} /> Protagonista: registra su propia
                  experiencia
                </td>
                <td>
                  <Minus size={16} /> Usuario pasivo, solo consulta
                </td>
              </tr>
              <tr>
                <td>Enfoque turístico</td>
                <td className="r505-table__highlight">
                  <Check size={16} /> Especializado en turismo rural y de
                  naturaleza comunitario
                </td>
                <td>
                  <Minus size={16} /> Enfoque general, sin especialización
                </td>
              </tr>
              <tr>
                <td>Respaldo institucional</td>
                <td className="r505-table__highlight">
                  <Check size={16} /> Alianza de datos con INTUR
                </td>
                <td>
                  <Minus size={16} /> Sin integración formal con el ente
                  regulador
                </td>
              </tr>
            </tbody>
          </table>
        </Reveal>

        <img
          src={pinolitoFeliz}
          alt="Pinolito feliz"
          className="r505-mascota-cameo r505-float r505-float--slow"
        />
      </section>

      {/* ----------------------------------------------------- CTA ----- */}
      <section className="r505-cta" id="cta">
        <img
          src={pinolitoCaminando}
          alt="Pinolito caminando hacia la próxima parada"
          className="r505-cta__mascota r505-float"
        />
        <Reveal className="r505-cta__copy">
          <h2>Tu próxima parada empieza aquí</h2>
          <p>
            Sé parte de la red de comunidades, artesanos y guías que ya
            están construyendo la Ruta 505.
          </p>
          {/* <div className="r505-hero__actions">
            
            <a href="#" className="r505-btn r505-btn--lg r505-btn--light">
              Quiero ser aliado <ArrowRight size={18} />
            </a>
            
            <span className="r505-btn r505-btn--ghost-light r505-btn--lg r505-btn--disabled">
              <Clock size={18} /> App próximamente
            </span>
          </div>
          */}

          
          <div className="r505-hero__actions">
            <a
              href="http://20.98.53.104:8080/Ruta505.apk"
              className="r505-btn r505-btn--ghost-light r505-btn--lg"
              download="Ruta505.apk"
            >
              <Download size={18} />
              Descarga la App
            </a>
          </div>
        </Reveal>
      </section>

      {/* --------------------------------------------------- FOOTER ---- */}
      <footer className="r505-footer">
        <img src={pinolitoDinamico} alt="" className="r505-footer__ghost" aria-hidden="true" />
        <div className="r505-footer__content">
          <img src={logo} alt="Ruta 505" className="r505-footer__logo" />
          <p>Turismo cultural y comunitario · Chontales, Nicaragua</p>
          <p className="r505-footer__fine">
            Ruta 505 — desarrollado por Cuajada Salvaje, en alianza con INTUR.
          </p>
        </div>
      </footer>
    </div>
  );
}