document.addEventListener("DOMContentLoaded", function () {
    // === Reveal title on scroll ===
    const navText = document.querySelector(".title-block");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        navText.classList.remove("hidden");
      } else {
        navText.classList.add("hidden");
      }
    });
  
    // === Unblur profile image ===
    const element = document.querySelector(".myPhoto");
    element.classList.add("remove-blur");
  
    // === Section Scroll Control ===
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll(".v_nav a");
    let isScrolling = false;
    let currentIndex = 0;
  
    function scrollToSection(index) {
      isScrolling = true;
      sections[index].scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      setActiveLink(index);
      setTimeout(() => {
        isScrolling = false;
      }, 1000); // adjust based on transition speed
    }
  
    window.addEventListener("wheel", (e) => {
      const currentSection = sections[currentIndex];
    
      // Check if current section is #experiences and allow internal scroll
      if (currentSection.id === "experiences") {
        const container = currentSection;
        const atTop = container.scrollTop === 0;
        const atBottom = container.scrollHeight - container.clientHeight === container.scrollTop;
    
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
          // Allow normal scrolling inside experiences
          return;
        }
      }
    
      // Continue with outer section navigation
      e.preventDefault();
      if (isScrolling) return;
    
      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        currentIndex++;
      } else if (e.deltaY < 0 && currentIndex > 0) {
        currentIndex--;
      }
      scrollToSection(currentIndex);
    }, { passive: false });
    
    // === Active nav link highlight ===
    function setActiveLink(index) {
      navLinks.forEach(link => link.classList.remove("active"));
      if (navLinks[index]) {
        navLinks[index].classList.add("active");
      }
    }
  
    // Nav click support
    navLinks.forEach((link, i) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        currentIndex = i;
        scrollToSection(currentIndex);
      });
    });
  
    // === Typing Effect on About Section ===
    const aboutSection = document.querySelector(".View_2");
    const typingTarget = document.getElementById("typing-text");
  
    const aboutText = [
      "I’m Philip Youssef, a passionate full-stack developer and current IT engineering student at the University of Brescia.",
      "With hands-on experience in Python, Django, React, and cloud technologies like AWS, I specialize in building scalable and user-focused web applications.",
      "Over the last few years, I’ve led development teams, designed intuitive interfaces, and deployed production-ready platforms."
    ];
  
    let hasTyped = false;
  
    function typeText(textArray, element, delay = 5) {
      let lineIndex = 0;
      let charIndex = 0;
      element.innerHTML = "";
  
      function typeLine() {
        if (lineIndex >= textArray.length) return;
        let currentLine = textArray[lineIndex];
        let span = document.createElement("p");
        element.appendChild(span);
  
        function typeChar() {
          if (charIndex < currentLine.length) {
            span.innerHTML += currentLine.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, delay);
          } else {
            charIndex = 0;
            lineIndex++;
            setTimeout(typeLine, 40);
          }
        }
  
        typeChar();
      }
  
      typeLine();
    }
  
    // Trigger typing on visibility
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasTyped) {
          hasTyped = true;
          typeText(aboutText, typingTarget);
        }
      });
    }, { threshold: 0.6 });
  
    observer.observe(aboutSection);
  });


  const revealElements = document.querySelectorAll(".reveal-on-view");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  }, { threshold: 0.3 });
  
  revealElements.forEach(el => revealObserver.observe(el));
  
  revealElements.forEach(el => {
    el.querySelectorAll("img").forEach((img, i) => {
      img.style.setProperty("--i", i);
    });
    revealObserver.observe(el);
  });
  

  // === Trigger iframe animation when project_1 is in view ===
  const projectSection = document.getElementById("project_1");
  const project2Section = document.getElementById("project_2");
  
  const demoIframe1 = document.querySelector("#project_1_demo iframe");
  const demoImg1 = document.querySelector("#project_1_demo img");
  
  const demoIframe2 = document.querySelector("#project_2_demo iframe");
  const demoImg2 = document.querySelector("#project_2_demo img");
  
  if (projectSection && demoIframe1 && demoImg1) {
    const iframeObserver1 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          demoIframe1.classList.add("phone_on");
          demoImg1.classList.add("phone_on");
        } else {
          demoIframe1.classList.remove("phone_on");
          demoImg1.classList.remove("phone_on");
        }
      });
    }, { threshold: 0.6 });
  
    iframeObserver1.observe(projectSection);
  }
  
  if (project2Section && demoIframe2 && demoImg2) {
    const iframeObserver2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          demoIframe2.classList.add("phone_on");
          demoImg2.classList.add("phone_on");
        } else {
          demoIframe2.classList.remove("phone_on");
          demoImg2.classList.remove("phone_on");
        }
      });
    }, { threshold: 0.6 });
  
    iframeObserver2.observe(project2Section); 
  }
  

  const certifications = document.getElementById("certifications");
  if (certifications ) {
    console.log('dd');
  }