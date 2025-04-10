// Collapsed hamburger on mobile
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navWrapper = document.getElementById('nav-wrapper');
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);

  hamburger.addEventListener('click', function() {
    navWrapper.classList.toggle('active');
    overlay.classList.toggle('active');
    hamburger.innerHTML = navWrapper.classList.contains('active') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });

  overlay.addEventListener('click', function() {
    navWrapper.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  });

  // Close menu when a nav item is clicked (for mobile)
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      if (window.innerWidth < 600) {
        navWrapper.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });
});

// Home Click (logo and name)
document.getElementById('branding').addEventListener('click', function(e) {
  e.preventDefault();
  
  // Remove active class from all buttons
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  
  // Add active to home button
  document.querySelector('.nav-btn[data-target="home"]').classList.add('active');
  
  // Show home section
  document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
  document.getElementById('home').classList.add('active');
  
  // Close mobile menu if open
  if (window.innerWidth < 600) {
    document.getElementById('nav-wrapper').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('hamburger').innerHTML = '<i class="fas fa-bars"></i>';
  }
  
  // Scroll to top if needed
  window.scrollTo(0, 0);
});




const linkInput = document.getElementById("linkInput");
const linkList = document.getElementById("linkList");
const navBtns = document.querySelectorAll(".nav-btn");
const contentSections = document.querySelectorAll(".content-section");

// Tab navigation
navBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons and sections
    navBtns.forEach(b => b.classList.remove("active"));
    contentSections.forEach(section => section.classList.remove("active"));
    
    // Add active class to clicked button and corresponding section
    btn.classList.add("active");
    const target = btn.getAttribute("data-target");
    document.getElementById(target).classList.add("active");
  });
});

function addLink() {
  const url = linkInput.value.trim();
  if (!url) return;

  // Basic URL validation
  if (!isValidUrl(url)) {
    alert("Please enter a valid URL (e.g., https://example.com)");
    return;
  }

  const links = JSON.parse(localStorage.getItem("neetlinks") || "[]");
  links.push(url);
  localStorage.setItem("neetlinks", JSON.stringify(links));
  linkInput.value = "";
  renderLinks();
  
  // Switch to My Links tab after saving
  document.querySelector('.nav-btn[data-target="links"]').click();
  
  // Add visual feedback
  const saveBtn = document.querySelector('.save-btn');
  saveBtn.classList.add('pulse');
  setTimeout(() => saveBtn.classList.remove('pulse'), 300);
}

function deleteLink(index) {
  if (confirm("Are you sure you want to delete this link?")) {
    const links = JSON.parse(localStorage.getItem("neetlinks") || "[]");
    links.splice(index, 1);
    localStorage.setItem("neetlinks", JSON.stringify(links));
    renderLinks();
  }
}

function copyLink(url) {
  navigator.clipboard.writeText(url).then(() => {
    // Visual feedback
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
      if (btn.dataset.url === url) {
        btn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 1000);
      }
    });
  });
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function renderLinks() {
  const links = JSON.parse(localStorage.getItem("neetlinks") || "[]");
  linkList.innerHTML = "";
  
  if (links.length === 0) {
    linkList.innerHTML = '<p class="empty-message">No links saved yet. Add some using the Home tab!</p>';
    return;
  }

  links.forEach((url, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="${url}" target="_blank">${url}</a>
      <div class="action-btns">
        <button class="action-btn copy-btn" onclick="copyLink('${url}')" data-url="${url}">
          <i class="fas fa-copy"></i>
        </button>
        <button class="action-btn delete-btn" onclick="deleteLink(${index})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    linkList.appendChild(li);
  });
}

// Initialize
renderLinks();