export default function TechStack() {
  const technologies = [
    "Flutter",
    "Dart",
    "Next.js",
    "React",
    "Node.js",
    "Firebase"
  ];

  return (
    <section id="stack">
      <h2 className="section-title">Tech Stack</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '60px' }}>
        {technologies.map((tech) => (
          <div key={tech} className="chip" style={{ fontSize: '1rem', padding: '12px 24px' }}>
            {tech}
          </div>
        ))}
      </div>
    </section>
  );
}
