const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const links = document.querySelectorAll('.nav-links a');

// Toggle menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');

    // restart animations
    if (navLinks.classList.contains('active')) {
        links.forEach(link => {
            link.style.animation = 'none';
            link.offsetHeight; // trigger reflow
            link.style.animation = '';
        });
    }
});

// Close menu on link click
links.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// HERO SECTION OF HOME PAGE

const slides = document.querySelectorAll(".nova-omne-slide");
const dots = document.querySelectorAll(".nova-omne-dot");
let current = 0;

function showSlide(index) {
  slides.forEach((s, i) => {
    s.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
}

function autoSlide() {
  showSlide(current);
  current = (current + 1) % slides.length;
}

setInterval(autoSlide, 4000);



// footer/
document.getElementById("year").textContent = new Date().getFullYear();

// SUBSCRIBE FORM
document.getElementById("subscribeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const subscribeBtn = e.target.querySelector("button");
  const popup = document.getElementById("subscribePopup");
  const closePopup = document.getElementById("closePopup");
  const email = emailInput.value.trim();

  if (!email) {
    alert("⚠️ Please enter a valid email address.");
    return;
  }

  subscribeBtn.disabled = true;
  subscribeBtn.textContent = "Subscribing...";

  try {
    const response = await fetch("/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      emailInput.value = "";
      // Show custom popup
      popup.style.display = "flex";

      // Auto close after 3 seconds
      setTimeout(() => {
        popup.style.display = "none";
      }, 3000);
    } else {
      alert(" " + (data.message || "Something went wrong!"));
    }
  } catch (error) {
    console.error("Subscription error:", error);
    alert("Unable to connect to the server. Please try again later.");
  } finally {
    subscribeBtn.disabled = false;
    subscribeBtn.textContent = "Subscribe";
  }

  // Manual close button
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });
});



// ABOUT US
const cards = document.querySelectorAll(".industry-card");

cards.forEach((card) => {
    const btn = card.querySelector(".toggle-btn i");

    btn.addEventListener("click", (e) => {
        e.stopPropagation();

        
        if (card.classList.contains("active")) {
            card.classList.remove("active");
            btn.classList.remove("fa-times");
            btn.classList.add("fa-plus");
            return;
        }

        
        cards.forEach((c) => {
            c.classList.remove("active");
            const icon = c.querySelector(".toggle-btn i");
            icon.classList.remove("fa-times");
            icon.classList.add("fa-plus");
        });

        
        card.classList.add("active");
        btn.classList.remove("fa-plus");
        btn.classList.add("fa-times");
    });
});


window.addEventListener("DOMContentLoaded", () => {
    const firstCard = document.querySelector(".industry-card:first-child");
    if (firstCard) {
        firstCard.classList.add("active");
        const icon = firstCard.querySelector(".toggle-btn i");
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-times");
    }
});



    