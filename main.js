document.addEventListener("DOMContentLoaded", () => {
  // === Title Reveal on Scroll ===
  const navText = document.querySelector(".title-block");
  window.addEventListener("scroll", () => {
    navText.classList.toggle("hidden", window.scrollY <= 500);
  });

  // === Remove Blur from Profile Image ===
  document.querySelector(".myPhoto")?.classList.add("remove-blur");

  // === Sections Setup ===
  const sectionIds = [
    "#first", "#about_me", "#project_1", "#project_2", "#skills", "#certifications",
    "#experiences", "#experiences-1", "#experiences-2", "#experiences-3", "#contact"
  ];
  const sections = sectionIds.map(id => document.querySelector(id)).filter(Boolean);
  const navLinks = document.querySelectorAll(".v_nav a");

  let isScrolling = false;
  let currentIndex = 0;
  const isWideScreen = window.innerWidth >= 768;

  function scrollToSection(index) {
    isScrolling = true;
    sections[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
    updateActiveLink(index);
    setTimeout(() => { isScrolling = false; }, 1000);
  }

  function updateActiveLink(index) {
    navLinks.forEach(link => link.classList.remove("active"));
    navLinks[index]?.classList.add("active");
  }

  function updateActiveLinkByHref(href) {
    navLinks.forEach(link => link.classList.remove("active"));
    document.querySelector(`.v_nav a[href="${href}"]`)?.classList.add("active");
  }

  // === Scroll Navigation (Wheel) for Wide Screens ===
  if (isWideScreen) {
    window.addEventListener("wheel", (e) => {
      const section = sections[currentIndex];
      const isExperiences = section?.id === "experiences";

      if (isExperiences) {
        const atTop = section.scrollTop === 0;
        const atBottom = section.scrollHeight - section.clientHeight === section.scrollTop;
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) return;
      }

      e.preventDefault();
      if (isScrolling) return;

      if (e.deltaY > 0 && currentIndex < sections.length - 1) currentIndex++;
      else if (e.deltaY < 0 && currentIndex > 0) currentIndex--;

      scrollToSection(currentIndex);
    }, { passive: false });
  }

  // === Nav Link Click Support ===
  navLinks.forEach((link, i) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const index = sections.findIndex(sec => `#${sec.id}` === targetId);
      if (index !== -1) {
        currentIndex = index;
        scrollToSection(index);
      }
    });
  });

  // === Section Visibility Observer for Active Link ===
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
  
      const id = entry.target.id;
      const matchingLink = document.querySelector(`.v_nav a[href="#${id}"]`);
  
      if (matchingLink) {
        updateActiveLinkByHref(`#${id}`);
        currentIndex = Array.from(sections).findIndex(s => s.id === id);
      }
    });
  }, { threshold: 0.6 });
  

  sections.forEach(section => sectionObserver.observe(section));

  // === Typing Effect in About Section ===
  const aboutSection = document.querySelector(".View_2");
  const typingTarget = document.getElementById("typing-text");
  const aboutText = [
    "I’m Philip Youssef, a passionate full-stack developer and current IT engineering student at the University of Brescia.",
    "With hands-on experience in Python, Django, React, and cloud technologies like AWS, I specialize in building scalable and user-focused web applications.",
    "Over the last few years, I’ve led development teams, designed intuitive interfaces, and deployed production-ready platforms."
  ];

  let hasTyped = false;

  function typeText(lines, element, charDelay = 5, lineDelay = 40) {
    let line = 0, char = 0;
    element.innerHTML = "";

    function typeLine() {
      if (line >= lines.length) return;
      const p = document.createElement("p");
      element.appendChild(p);

      function typeChar() {
        if (char < lines[line].length) {
          p.innerHTML += lines[line][char++];
          setTimeout(typeChar, charDelay);
        } else {
          char = 0;
          line++;
          setTimeout(typeLine, lineDelay);
        }
      }
      typeChar();
    }

    typeLine();
  }

  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasTyped) {
        hasTyped = true;
        typeText(aboutText, typingTarget);
      }
    });
  }, { threshold: 0.6 }).observe(aboutSection);

  // === Reveal on View Effect ===
  const revealElements = document.querySelectorAll(".reveal-on-view");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  }, { threshold: 0.3 });

  revealElements.forEach(el => {
    el.querySelectorAll("img").forEach((img, i) => {
      img.style.setProperty("--i", i);
    });
    revealObserver.observe(el);
  });

  // === iFrame Animation on Visibility ===
  const iframeAnimations = [
    { sectionId: "project_1", demoId: "project_1_demo" },
    { sectionId: "project_2", demoId: "project_2_demo" }
  ];

  iframeAnimations.forEach(({ sectionId, demoId }) => {
    const section = document.getElementById(sectionId);
    const iframe = document.querySelector(`#${demoId} iframe`);
    const image = document.querySelector(`#${demoId} img`);

    if (section && iframe && image) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const toggle = entry.isIntersecting ? "add" : "remove";
          iframe.classList[toggle]("phone_on");
          image.classList[toggle]("phone_on");
        });
      }, { threshold: 0.6 });

      observer.observe(section);
    }
  });

  // === Debug Placeholder ===
  const certifications = document.getElementById("certifications");
  if (certifications) {
    console.log("Certifications section is loaded.");
  }
});
