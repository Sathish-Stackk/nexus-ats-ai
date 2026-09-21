import { jsPDF } from 'jspdf';

/**
 * Clean ATS PDF Exporter Utility
 * Generates single-column, high-readability ATS compliant PDF document
 */
export function exportToATSPDF(resumeData) {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4'
  });

  const { name, title, contact, summary, skills, experience, projects, education } = resumeData;

  let y = 40;
  const marginX = 40;
  const contentWidth = 515;

  // Header: Name & Title
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(20, 20, 20);
  doc.text(name || 'ALEX JOHNSON', marginX, y);

  y += 18;
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(70, 70, 70);
  doc.text(title || 'Computer Science & Engineering Graduate | Full-Stack Engineer', marginX, y);

  y += 15;
  doc.setFontSize(9.5);
  doc.setTextColor(90, 90, 90);
  doc.text(contact || 'Email: alex.johnson@example.com | Phone: +1 (555) 019-2834 | GitHub: github.com/alex-dev | LinkedIn: linkedin.com/in/alex', marginX, y);

  // Line separator
  y += 12;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.8);
  doc.line(marginX, y, marginX + contentWidth, y);

  // Helper section header
  const addSectionHeader = (titleText) => {
    y += 20;
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    doc.text(titleText.toUpperCase(), marginX, y);
    y += 4;
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(0.5);
    doc.line(marginX, y, marginX + contentWidth, y);
    y += 14;
  };

  // Helper multi-line paragraph
  const addParagraph = (text, fontSize = 9.5, isBold = false) => {
    doc.setFont('Helvetica', isBold ? 'bold' : 'normal');
    doc.setFontSize(fontSize);
    doc.setTextColor(40, 40, 40);
    const lines = doc.splitTextToSize(text, contentWidth);
    doc.text(lines, marginX, y);
    y += lines.length * (fontSize + 3.5);
  };

  // 1. Professional Summary
  if (summary) {
    addSectionHeader('Professional Summary');
    addParagraph(summary);
  }

  // 2. Technical Skills
  if (skills) {
    addSectionHeader('Technical Skills');
    addParagraph(`Languages & Core: ${skills.languages || 'Java, Python, C++, JavaScript, TypeScript, SQL, HTML/CSS'}`);
    addParagraph(`Frameworks & Tools: ${skills.frameworks || 'React, Node.js, Express, Vite, Tailwind CSS, Docker, Git'}`);
    addParagraph(`Databases & Cloud: ${skills.databases || 'PostgreSQL, MongoDB, Redis, AWS S3, GitHub Actions'}`);
  }

  // 3. Key Projects
  addSectionHeader('Technical Projects');
  (projects || [
    {
      name: 'NexusATS - Autonomous AI ATS Resume Architect & Interview Simulator',
      tech: 'React, Node.js, Vector Similarity NLP Engine, Chart.js, PDF Engine',
      bullets: [
        'Architected a multi-agent resume parsing platform utilizing TF-IDF term vectors and cosine similarity algorithms, achieving 94% ATS parsing precision.',
        'Built an interactive real-time technical interview simulator with WebSockets state handling and automated evaluation rubrics.',
        'Engineered an ATS-scannable single-column PDF export engine, improving resume parsing success rate across 10+ target ATS platforms.'
      ]
    },
    {
      name: 'Distributed Real-Time Log Stream Analytics Pipeline',
      tech: 'Python, FastAPI, Redis Pub/Sub, Docker, WebSockets, Chart.js',
      bullets: [
        'Developed a high-throughput event logging pipeline handling 10,000+ logs/second with <15ms latency.',
        'Implemented sliding window rate-limiting algorithm and Docker containerized setup with automated CI/CD pipeline.'
      ]
    }
  ]).forEach(proj => {
    addParagraph(`${proj.name} | [${proj.tech}]`, 10, true);
    proj.bullets.forEach(bullet => {
      addParagraph(`• ${bullet}`, 9.5, false);
    });
    y += 4;
  });

  // 4. Education
  addSectionHeader('Education');
  addParagraph('Bachelor of Technology in Computer Science & Engineering (B.Tech CSE)', 10, true);
  addParagraph('GPA: 3.8 / 4.0 | Expected Graduation: 2026', 9.5, false);

  // Save PDF
  doc.save(`${(name || 'Resume').toLowerCase().replace(/\s+/g, '_')}_ATS_Optimized.pdf`);
}
