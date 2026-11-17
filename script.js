/**
 * Muhammad Hasnain — Software Engineer & Full-Stack Web Developer Portfolio
 * script.js
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Mobile Navigation & Scrollspy
     ========================================================================== */
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  const navBackdrop = document.getElementById('navBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const navLinks = document.querySelectorAll('.nav-item > a, .drawer-cta-btn');

  function openNav() {
    if (siteNav) {
      siteNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeNav() {
    if (siteNav) {
      siteNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      if (siteNav.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeNav);
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeNav);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  // Close nav on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  // Close nav on resize past 900px
  window.addEventListener('resize', () => {
    if (!window.matchMedia('(max-width:900px)').matches) {
      closeNav();
    }
  });

  /* Mobile footer accordions */
  const footerMobileQuery = window.matchMedia('(max-width:900px)');
  const footerToggles = document.querySelectorAll('.footer-toggle');
  function syncFooterToggles() {
    footerToggles.forEach(toggle => {
      toggle.setAttribute('aria-expanded', String(!footerMobileQuery.matches));
    });
  }

  footerToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      if (!footerMobileQuery.matches) return;
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isExpanded));
    });
  });

  syncFooterToggles();
  footerMobileQuery.addEventListener('change', syncFooterToggles);

  // Active section scrollspy
  const sections = document.querySelectorAll('section[id]');
  function updateScrollspy() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-item > a[href="#${sectionId}"]`);
      
      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  }
  window.addEventListener('scroll', updateScrollspy, { passive: true });

  /* ==========================================================================
     2. Custom Mouse Cursor (Desktop Only)
     ========================================================================== */
  const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 900px)').matches;

  if (!isTouchDevice) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    const speed = 0.16;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .work-card, .skill-category-card, .t-card, input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '38px';
        cursor.style.height = '38px';
        cursor.style.backgroundColor = 'var(--accent)';
        cursor.style.opacity = '0.5';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'var(--accent)';
        cursor.style.opacity = '0.8';
      });
    });
  }

  /* ==========================================================================
     3. Theme Toggle with Wipe Animation & Persistence
     ========================================================================== */
  const themeLink = document.getElementById('themeLink');
  const wipe = document.getElementById('wipe');
  const html = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('hasnain_portfolio_theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeButtonUI(savedTheme);

  function updateThemeButtonUI(theme) {
    if (!themeLink) return;
    const isDark = theme === 'dark';
    const themeText = themeLink.querySelector('.theme-text');
    if (themeText) {
      themeText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }
  }

  if (themeLink && wipe) {
    themeLink.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

      wipe.style.display = 'block';
      wipe.style.background = nextTheme === 'light' ? '#fafafc' : '#0b0b0d';
      wipe.classList.add('sweep');

      setTimeout(() => {
        html.setAttribute('data-theme', nextTheme);
        localStorage.setItem('hasnain_portfolio_theme', nextTheme);
        updateThemeButtonUI(nextTheme);
      }, 420);

      setTimeout(() => {
        wipe.classList.remove('sweep');
        wipe.style.transform = 'skewX(-12deg) translateX(-10%)';
        void wipe.offsetWidth;
        wipe.style.transform = '';
        wipe.style.display = 'none';
      }, 900);
    });
  }

  /* ==========================================================================
     4. Software Engineer Typewriter
     ========================================================================== */
  const phrases = [
    { pre: 'I architect & build ', key: 'scalable web applications' },
    { pre: 'I engineer high-throughput ', key: 'REST & GraphQL microservices' },
    { pre: 'I craft modern frontends in ', key: 'React, Next.js & TypeScript' },
    { pre: 'I design resilient systems with ', key: 'Docker, AWS & PostgreSQL' },
    { pre: 'I optimize code for ', key: 'speed, security & clean architecture' }
  ];

  const preEl = document.getElementById('twPre');
  const keyEl = document.getElementById('twKey');
  let pIndex = 0;

  function typeLoop() {
    if (!preEl || !keyEl) return;
    const { pre, key } = phrases[pIndex];
    let i = 0;
    preEl.textContent = '';
    keyEl.textContent = '';

    const typePre = setInterval(() => {
      preEl.textContent = pre.slice(0, i + 1);
      i++;
      if (i >= pre.length) {
        clearInterval(typePre);
        let j = 0;
        const typeKey = setInterval(() => {
          keyEl.textContent = key.slice(0, j + 1);
          j++;
          if (j >= key.length) {
            clearInterval(typeKey);
            setTimeout(eraseLoop, 1800);
          }
        }, 50);
      }
    }, 45);
  }

  function eraseLoop() {
    if (!preEl || !keyEl) return;
    const { pre, key } = phrases[pIndex];
    let j = key.length;

    const eraseKey = setInterval(() => {
      j--;
      keyEl.textContent = key.slice(0, j);
      if (j <= 0) {
        clearInterval(eraseKey);
        let i = pre.length;
        const erasePre = setInterval(() => {
          i--;
          preEl.textContent = pre.slice(0, i);
          if (i <= 0) {
            clearInterval(erasePre);
            pIndex = (pIndex + 1) % phrases.length;
            setTimeout(typeLoop, 350);
          }
        }, 25);
      }
    }, 25);
  }

  typeLoop();

  /* ==========================================================================
     5. Projects Filter Tabs
     ========================================================================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const workCards = document.querySelectorAll('.work-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      workCards.forEach(card => {
        const matches = filter === 'all' || card.dataset.category === filter;
        if (matches) {
          card.classList.remove('filtered-out');
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });

  /* ==========================================================================
     7. Interactive Project Modal (Deep-Dive Case Studies)
     ========================================================================== */
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalContent = document.getElementById('modalContent');

  const projectDetails = {
    cloudpulse: {
      title: 'CloudPulse — Distributed Telemetry & Observability Dashboard',
      category: 'Full-Stack Platform (2026)',
      overview: 'CloudPulse is a high-throughput observability platform designed to monitor microservice clusters in real time. It aggregates metrics, tracks distributed request traces, and provides visual latency heatmaps for DevOps and engineering teams.',
      challenges: [
        'Ingesting and visualizing tens of thousands of time-series metric datapoints per second without UI lag.',
        'Implementing automated anomaly detection algorithms that alert on atypical latency spikes.',
        'Optimizing rendering with virtualized tables and Canvas-based real-time time-series charts.'
      ],
      techStack: ['React', 'Next.js 14', 'TypeScript', 'Node.js', 'Redis', 'Docker', 'Chart.js', 'Prometheus'],
      github: 'https://github.com',
      demo: 'https://example.com'
    },
    nexuspay: {
      title: 'NexusPay — High-Throughput Payment & Billing Microservice',
      category: 'Backend & Microservices (2025)',
      overview: 'NexusPay is an enterprise-grade financial transaction service providing idempotent payment processing, automated subscription tiering, and PCI-compliant transaction verification.',
      challenges: [
        'Guaranteeing strict idempotency on payment endpoints to prevent duplicate charges during network failures.',
        'Handling asynchronous webhooks from multiple payment gateways (Stripe, PayPal) with retry queues in Redis.',
        'Designing secure relational database schemas with comprehensive transaction rollback capabilities.'
      ],
      techStack: ['Node.js', 'Express.js', 'PostgreSQL', 'Stripe API', 'Redis', 'Docker', 'Jest'],
      github: 'https://github.com',
      demo: 'https://example.com'
    },
    devflow: {
      title: 'DevFlow — AI Code Quality & Pull Request Auditor',
      category: 'Cloud & AI Engineering (2026)',
      overview: 'DevFlow is an automated GitHub integration bot that evaluates incoming pull requests using Abstract Syntax Tree (AST) static analysis and large language models to flag security risks, code smells, and performance regressions.',
      challenges: [
        'Parsing diverse codebases and constructing semantic AST diffs for rapid context evaluation.',
        'Minimizing API latency by running local static checks before dispatching targeted diff snippets to the LLM.',
        'Generating concise, constructive review comments directly on GitHub PR diff lines.'
      ],
      techStack: ['Python', 'FastAPI', 'Next.js', 'OpenAI API', 'GitHub Webhooks', 'Docker', 'AWS Lambda'],
      github: 'https://github.com',
      demo: 'https://example.com'
    },
    synapsedocs: {
      title: 'SynapseDocs — Real-Time Collaborative Workspace',
      category: 'Full-Stack Collaborative (2025)',
      overview: 'SynapseDocs brings frictionless real-time markdown documentation to engineering teams. Multiple users can co-edit technical specifications simultaneously with real-time cursor tracking and zero merge collisions.',
      challenges: [
        'Implementing Operational Transformation (OT) / CRDT algorithms over WebSockets for conflict-free concurrent editing.',
        'Preserving sub-30ms latency across distributed clients using Redis Pub/Sub channels.',
        'Supporting live synchronized Markdown preview with KaTeX math rendering and code syntax highlighting.'
      ],
      techStack: ['Next.js', 'TypeScript', 'WebSockets', 'Tailwind CSS', 'Redis', 'Supabase'],
      github: 'https://github.com',
      demo: 'https://example.com'
    },
    apexui: {
      title: 'ApexUI — Accessible Enterprise Component System',
      category: 'Frontend & Design System (2025)',
      overview: 'A comprehensive, WCAG 2.1 AA compliant UI component library created for enterprise web applications. Includes modal dialogs, accessible dropdown menus, data tables, and forms.',
      challenges: [
        'Ensuring 100% keyboard navigability, focus trapping in modals, and full screen reader compatibility.',
        'Designing a completely headless architecture compatible with Tailwind CSS theme configuration.',
        'Maintaining automated component testing with Storybook and Jest/Testing Library.'
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook', 'Jest', 'ARIA Primitives'],
      github: 'https://github.com',
      demo: 'https://example.com'
    },
    datastream: {
      title: 'DataStream — Distributed Event Ingestion Pipeline',
      category: 'Data & Event Pipeline (2025)',
      overview: 'A scalable event streaming platform engineered for processing IoT sensor telemetry and clickstream analytics at 50,000+ events per second with schema enforcement and automated indexing.',
      challenges: [
        'Architecting event consumer groups in Apache Kafka to avoid backpressure bottlenecks.',
        'Executing batch writes into PostgreSQL and AWS S3 with data partitioning.',
        'Continuous health monitoring and zero-loss consumer failover.'
      ],
      techStack: ['Python', 'Apache Kafka', 'PostgreSQL', 'Docker', 'AWS S3'],
      github: 'https://github.com',
      demo: 'https://example.com'
    }
  };

  function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data || !modalContent) return;

    modalContent.innerHTML = `
      <h3>${data.title}</h3>
      <span class="modal-cat-badge">${data.category}</span>
      
      <h4 class="modal-section-title">Overview & Architecture</h4>
      <p class="modal-p">${data.overview}</p>

      <h4 class="modal-section-title">Key Engineering Challenges Solved</h4>
      <ul class="modal-list">
        ${data.challenges.map(item => `<li>${item}</li>`).join('')}
      </ul>

      <h4 class="modal-section-title">Technology Stack</h4>
      <div class="project-tags" style="margin-bottom: 20px;">
        ${data.techStack.map(t => `<span class="ptag">${t}</span>`).join('')}
      </div>

      <div class="modal-actions">
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          View on GitHub
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
        <a href="#contact" class="btn btn-secondary modal-contact-trigger">
          Discuss Project
        </a>
      </div>
    `;

    // Handle internal link inside modal
    const contactTrigger = modalContent.querySelector('.modal-contact-trigger');
    if (contactTrigger) {
      contactTrigger.addEventListener('click', () => {
        closeModal();
      });
    }

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.btn-project-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openProjectModal(btn.dataset.project);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  /* ==========================================================================
     8. Scroll Cues
     ========================================================================== */
  document.querySelectorAll('.scroll-cue').forEach(cue => {
    cue.addEventListener('click', () => {
      const targetSelector = cue.dataset.next;
      const target = document.querySelector(targetSelector);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ==========================================================================
     9. Contact Form Validation & Submission
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const status = document.getElementById('formStatus');

    const validators = {
      name: v => v.trim().length >= 2 || 'Please enter your name.',
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
      subject: v => v.trim().length >= 3 || 'Please enter an inquiry subject.',
      message: v => v.trim().length >= 10 || 'Message should be at least 10 characters long.'
    };

    function setFieldError(field, message) {
      const wrapper = field.closest('.field');
      if (!wrapper) return;
      const errorEl = wrapper.querySelector('.field-error');
      if (message) {
        wrapper.classList.add('invalid');
        if (errorEl) errorEl.textContent = message;
      } else {
        wrapper.classList.remove('invalid');
        if (errorEl) errorEl.textContent = '';
      }
    }

    function validateField(field) {
      const rule = validators[field.name];
      if (!rule) return true;
      const result = rule(field.value);
      setFieldError(field, result === true ? '' : result);
      return result === true;
    }

    contactForm.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.closest('.field') && field.closest('.field').classList.contains('invalid')) {
          validateField(field);
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = [...contactForm.querySelectorAll('input[required], textarea[required]')];
      const allValid = fields.map(validateField).every(Boolean);

      if (!allValid) {
        if (status) {
          status.textContent = 'Please fill out all required fields correctly.';
          status.className = 'form-status error';
        }
        return;
      }

      const submitBtn = contactForm.querySelector('.form-submit');
      if (submitBtn) submitBtn.disabled = true;
      if (status) {
        status.textContent = 'Sending message…';
        status.className = 'form-status';
      }

      // Simulated async dispatch
      setTimeout(() => {
        if (status) {
          status.textContent = '✓ Thank you! Your message has been sent successfully. Muhammad will respond within 24 hours.';
          status.className = 'form-status success';
        }
        contactForm.reset();
        if (submitBtn) submitBtn.disabled = false;
      }, 900);
    });
  }

});
