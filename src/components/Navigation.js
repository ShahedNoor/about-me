"use client";

import { useEffect, useState } from "react";

export default function Navigation() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "stack"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActive(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth"
      });
      setActive(id);
    }
  };

  return (
    <nav className="glass-nav">
      <button 
        onClick={() => scrollTo("home")} 
        className={`nav-item ${active === "home" ? "active" : ""}`}
        style={{ border: 'none', background: active === 'home' ? 'var(--foreground)' : 'transparent', cursor: 'pointer' }}
      >
        Home
      </button>
      <button 
        onClick={() => scrollTo("projects")} 
        className={`nav-item ${active === "projects" ? "active" : ""}`}
        style={{ border: 'none', background: active === 'projects' ? 'var(--foreground)' : 'transparent', cursor: 'pointer' }}
      >
        Apps
      </button>
      <button 
        onClick={() => scrollTo("stack")} 
        className={`nav-item ${active === "stack" ? "active" : ""}`}
        style={{ border: 'none', background: active === 'stack' ? 'var(--foreground)' : 'transparent', cursor: 'pointer' }}
      >
        Stack
      </button>
    </nav>
  );
}
