// DOM Elements
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const backToTopBtn = document.getElementById("back-to-top");
const contactForm = document.getElementById("contact-form");
const downloadCvBtn = document.getElementById("download-cv");

// Mobile Navigation Toggle
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Active navigation link highlighting
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// Back to top button functionality
function toggleBackToTopBtn() {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
}

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Scroll event listeners
window.addEventListener("scroll", () => {
  updateActiveNavLink();
  toggleBackToTopBtn();
});

// Contact form validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(fieldId, message) {
  const errorElement = document.getElementById(`${fieldId}-error`);
  errorElement.textContent = message;
  errorElement.classList.add("show");
}

function hideError(fieldId) {
  const errorElement = document.getElementById(`${fieldId}-error`);
  errorElement.classList.remove("show");
}

function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  let isValid = true;

  // Clear previous errors
  hideError("name");
  hideError("email");
  hideError("message");

  // Validate name
  if (name === "") {
    showError("name", "Name is required");
    isValid = false;
  }

  // Validate email
  if (email === "") {
    showError("email", "Email is required");
    isValid = false;
  } else if (!validateEmail(email)) {
    showError("email", "Please enter a valid email address");
    isValid = false;
  }

  // Validate message
  if (message === "") {
    showError("message", "Message is required");
    isValid = false;
  }

  return isValid;
}

// Contact form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateForm()) {
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert("Thank you for your message! I'll get back to you soon.");
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  }
});

// Real-time form validation
document.getElementById("name").addEventListener("blur", () => {
  const name = document.getElementById("name").value.trim();
  if (name === "") {
    showError("name", "Name is required");
  } else {
    hideError("name");
  }
});

document.getElementById("email").addEventListener("blur", () => {
  const email = document.getElementById("email").value.trim();
  if (email === "") {
    showError("email", "Email is required");
  } else if (!validateEmail(email)) {
    showError("email", "Please enter a valid email address");
  } else {
    hideError("email");
  }
});

document.getElementById("message").addEventListener("blur", () => {
  const message = document.getElementById("message").value.trim();
  if (message === "") {
    showError("message", "Message is required");
  } else {
    hideError("message");
  }
});

// CV Download functionality
downloadCvBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Simulate CV download
  const link = document.createElement("a");
  link.href = "#"; // In a real scenario, this would be the path to your CV file
  link.download = "Alex_Johnson_CV.pdf";

  // Show download message
  alert("CV download would start here. Please add your actual CV file path.");
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".project-card, .skill-category"
  );

  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(15, 23, 42, 0.98)";
  } else {
    header.style.background = "rgba(15, 23, 42, 0.95)";
  }
});
