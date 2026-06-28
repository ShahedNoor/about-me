export default function Projects() {
  const projects = [
    {
      id: "01",
      title: "BarberStar Pro",
      desc: "A comprehensive booking and management app for barbershops.",
      link: "#",
    },
    {
      id: "02",
      title: "E-Commerce App",
      desc: "Full-stack mobile application for online shopping.",
      link: "#",
    },
    {
      id: "03",
      title: "Portfolio Web",
      desc: "Personal portfolio website built with Flutter Web.",
      link: "#",
    }
  ];

  return (
    <section id="projects">
      <h2 className="section-title">Apps</h2>
      <div className="grid">
        {projects.map((project) => (
          <article key={project.id} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--accent)' }}>{project.id}</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{project.title}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>{project.desc}</p>
            <a href={project.link} className="chip">View Project</a>
          </article>
        ))}
      </div>
    </section>
  );
}
