// CJLP - Scripts JavaScript

// Navigation mobile

document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const desktopItems = document.querySelectorAll('.navbar-menu li > *');

  if (menuBtn && mobileMenu && desktopItems.length) {
    // populate mobile menu by cloning existing nav items
    mobileMenu.innerHTML = ''; // clear any placeholder
    desktopItems.forEach(item => {
      const clone = item.cloneNode(true);
      if (clone.tagName === 'A') {
        clone.addEventListener('click', () => {
          mobileMenu.classList.remove('show');
          menuBtn.querySelector('span').textContent = '☰';
        });
      } else if (clone.tagName === 'BUTTON' && clone.id === 'logout-btn') {
        clone.addEventListener('click', () => {
          localStorage.removeItem('loggedIn');
          location.reload();
        });
      }
      mobileMenu.appendChild(clone);
    });

    // toggle open/close
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('show');
      const icon = menuBtn.querySelector('span');
      icon.textContent = mobileMenu.classList.contains('show') ? '✕' : '☰';
      mobileMenu.setAttribute('aria-hidden', mobileMenu.classList.contains('show') ? 'false' : 'true');
      menuBtn.setAttribute('aria-expanded', mobileMenu.classList.contains('show'));
    });
  }
});

// Formulaire de contact
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  // Simulation d'envoi
  alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
  form.reset();
  
  return false;
}

// Formulaire d'adhésion
function handleAdhesionSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const termsCheckbox = form.querySelector('input[name="terms"]');
  
  if (!termsCheckbox.checked) {
    alert('Veuillez accepter les conditions pour continuer.');
    return false;
  }
  
  // Simulation d'envoi
  alert('Merci pour votre demande d\'adhésion ! Nous examinerons votre candidature et vous contacterons sous 48h.');
  form.reset();
  
  return false;
}

// Filtres d'actualités
function filterActualites(category) {
  const articles = document.querySelectorAll('.article-item');
  const buttons = document.querySelectorAll('.filter-btn');
  
  // Mettre à jour les boutons
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.category === category) {
      btn.classList.add('active');
    }
  });
  
  // Filtrer les articles
  articles.forEach(article => {
    if (category === 'Tous' || article.dataset.category === category) {
      article.style.display = 'block';
    } else {
      article.style.display = 'none';
    }
  });
}

// Animation au scroll (optionnel)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observer les cartes
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    observer.observe(card);
  });
});

// Gestion du formulaire d'inscription et connexion
document.addEventListener('DOMContentLoaded', function() {
  // Vérifier si l'utilisateur est connecté
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const inscriptionSection = document.getElementById('inscription-section');
  const mainContent = document.getElementById('main-content');
  const logoutBtn = document.getElementById('logout-btn');
  
  if (isLoggedIn) {
    // Masquer inscription, afficher contenu principal
    if (inscriptionSection) inscriptionSection.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';
    if (logoutBtn) logoutBtn.style.display = 'inline';
  } else {
    // Afficher inscription, masquer contenu principal
    if (inscriptionSection) inscriptionSection.style.display = 'block';
    if (mainContent) mainContent.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
  
  // Gestion du bouton déconnexion
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      localStorage.removeItem('loggedIn');
      location.reload();
    });
  }
  
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(event) {
      const action = event.submitter ? event.submitter.value : '';
      
      if (action === 'reset') {
        event.preventDefault();
        handlePasswordReset();
      } else if (action === 'login') {
        event.preventDefault();
        handleLogin();
      } else {
        // Inscription
        event.preventDefault();
        handleInscription();
      }
    });
  }
});

// Fonction pour générer un code de récupération
function generateRecoveryCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Fonction pour réinitialiser le mot de passe
function handlePasswordReset() {
  const email = document.getElementById('reset_email').value;
  if (!email) {
    alert('Veuillez entrer votre adresse mail.');
    return;
  }
  
  if (!isValidEmail(email)) {
    alert('Veuillez entrer une adresse email valide.');
    return;
  }
  
  const recoveryCode = generateRecoveryCode();
  
  // Initialiser EmailJS (remplacez par vos clés réelles)
  emailjs.init('YOUR_PUBLIC_KEY'); // Remplacez par votre clé publique EmailJS
  
  const templateParams = {
    to_email: email,
    recovery_code: recoveryCode,
    subject: 'Code de récupération de mot de passe - CJLP'
  };
  
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams) // Remplacez par vos IDs
    .then(function(response) {
      alert('Un code de récupération a été envoyé à votre adresse mail.');
      // Stocker le code pour vérification (optionnel)
      localStorage.setItem('recoveryCode', recoveryCode);
      localStorage.setItem('recoveryEmail', email);
    }, function(error) {
      alert('Erreur lors de l\'envoi du mail. Veuillez réessayer.');
      console.error('EmailJS error:', error);
    });
}

// Fonction pour valider une adresse email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Fonction pour gérer la connexion (placeholder)
function handleLogin() {
  const email = document.getElementById('login_email').value;
  const password = document.getElementById('login_password').value;
  
  if (!email || !password) {
    alert('Veuillez remplir tous les champs.');
    return;
  }
  
  if (!isValidEmail(email)) {
    alert('Veuillez entrer une adresse email valide.');
    return;
  }
  
  // Simulation de connexion
  alert('Connexion réussie !');
  localStorage.setItem('loggedIn', 'true');
  location.reload(); // Recharger pour afficher le contenu
}

// Fonction pour gérer l'inscription (placeholder)
function handleInscription() {
  const nom = document.getElementById('nom').value;
  const prenoms = document.getElementById('prenoms').value;
  const dateNaissance = document.getElementById('date_naissance').value;
  const email = document.getElementById('email').value;
  const contact = document.getElementById('contact').value;
  const motDePasse = document.getElementById('mot_de_passe').value;
  
  if (!nom || !prenoms || !dateNaissance || !email || !contact || !motDePasse) {
    alert('Veuillez remplir tous les champs.');
    return;
  }
  
  if (!isValidEmail(email)) {
    alert('Veuillez entrer une adresse email valide.');
    return;
  }
  
  if (motDePasse.length < 6) {
    alert('Le mot de passe doit contenir au moins 6 caractères.');
    return;
  }
  
  // Simulation d'inscription
  alert('Inscription réussie ! Bienvenue.');
  localStorage.setItem('loggedIn', 'true');
  location.reload(); // Recharger pour afficher le contenu
}

// Fonction pour charger les actualités en temps réel
async function loadNews() {
  const newsContainer = document.getElementById('news-container');
  if (!newsContainer) return;

  // Afficher un indicateur de chargement
  newsContainer.innerHTML = '<p style="text-align: center; color: #6b7280;">Chargement des actualités...</p>';

  try {
    // Remplacez 'YOUR_API_KEY' par votre clé API NewsAPI (gratuite sur newsapi.org)
    const apiKey = 'YOUR_API_KEY';
    const url = `https://newsapi.org/v2/everything?q=africa+leadership&language=fr&sortBy=publishedAt&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'ok') {
      displayNews(data.articles);
    } else {
      newsContainer.innerHTML = '<p style="text-align: center; color: #ef4444;">Erreur lors du chargement des actualités. Veuillez réessayer plus tard.</p>';
    }
  } catch (error) {
    console.error('Erreur lors du chargement des actualités:', error);
    newsContainer.innerHTML = '<p style="text-align: center; color: #ef4444;">Erreur de connexion. Vérifiez votre connexion internet.</p>';
  }
}

// Fonction pour afficher les actualités
function displayNews(articles) {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';

  if (articles.length === 0) {
    newsContainer.innerHTML = '<p style="text-align: center; color: #6b7280;">Aucune actualité trouvée.</p>';
    return;
  }

  articles.slice(0, 9).forEach(article => { // Limiter à 9 articles
    const articleElement = document.createElement('div');
    articleElement.className = 'card';
    articleElement.innerHTML = `
      <div class="card-icon">
        <i class="fas fa-newspaper"></i>
      </div>
      <h3>${article.title}</h3>
      <p>${article.description || 'Description non disponible.'}</p>
      <div style="margin-top: 1rem;">
        <small style="color: #6b7280;">${new Date(article.publishedAt).toLocaleDateString('fr-FR')}</small>
        <br>
        <a href="${article.url}" target="_blank" style="color: #00A651; text-decoration: none; font-weight: 500;">Lire l'article →</a>
      </div>
    `;
    newsContainer.appendChild(articleElement);
  });
}

// Charger les actualités si on est sur la page actualites.html
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('actualites.html')) {
    loadNews();
  }
});
