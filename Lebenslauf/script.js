// Funktion zum Ändern des Themes
function changeTheme(theme) {
  // Speichern des gewählten Themes im localStorage
  localStorage.setItem("selectedTheme", theme);

  // Ändern der CSS-Variablen je nach gewähltem Theme
  if (theme === "theme1") {
    document.documentElement.style.setProperty("--main-color", "#4911ff");
    document.documentElement.style.setProperty("--secondary-color", "#ffd2f9");
    updateFooterImages("theme1"); // Bilder für Theme 1 setzen
  } else if (theme === "theme2") {
    document.documentElement.style.setProperty("--main-color", "#e74c3c");
    document.documentElement.style.setProperty("--secondary-color", "#f8d7da");
    updateFooterImages("theme2"); // Bilder für Theme 2 setzen
  } else if (theme === "theme3") {
    document.documentElement.style.setProperty("--main-color", "#27532F");
    document.documentElement.style.setProperty("--secondary-color", "#EBEBEB");
    updateFooterImages("theme3"); // Bilder für Theme 3 setzen
  }

  // Den Body nach dem Anwenden des Themes sichtbar machen
  document.body.style.display = "block";
}

// Funktion zum Aktualisieren der Bilder im Footer
function updateFooterImages(theme) {
  const imagePaths = {
    theme1: [
      "./Bilder/CheckBoard.jpg",
      "./Bilder/Mascot.jpg",
      "./Bilder/CheckBoard.jpg",
    ],
    theme2: [
      "./Bilder/Bilder Footer/THEME2_FOOTER.jpg",
      "./Bilder/Bilder Footer/THEME2_Mascot_1.jpg",
      "./Bilder/Bilder Footer/THEME2_FOOTER.jpg",
    ],
    theme3: [
      "./Bilder/Bilder Footer/THEME3_FOOTER.jpg",
      "./Bilder/Bilder Footer/THEME3_Mascot_1.jpg",
      "./Bilder/Bilder Footer/THEME3_FOOTER.jpg",
    ],
  };

  // Alle Bilder im Footer auswählen
  const footerImages = document.querySelectorAll(".footer-box img");

  // Neue Bildpfade entsprechend dem ausgewählten Theme setzen
  footerImages.forEach((img, index) => {
    img.src = imagePaths[theme][index];
  });
}

// Funktion zum Laden des gespeicherten Themes
function loadTheme() {
  const savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme) {
    changeTheme(savedTheme); // Gespeichertes Theme anwenden
  } else {
    changeTheme("theme1"); // Standard-Theme anwenden
  }
}

// Beim Laden der Seite das gespeicherte Theme laden
window.addEventListener("load", loadTheme);

// Funktion zum Laden des aktuellen Themes aus localStorage
function getCurrentTheme() {
  return localStorage.getItem("selectedTheme") || "theme1"; // Standard-Theme: theme1
}

// Skript für den Hover-Effekt mit Bildwechsel
const footerBoxes = document.querySelectorAll(".footer-box");

footerBoxes.forEach((box) => {
  const image = box.querySelector(".mascot-image"); // Wähle das Bild mit der Klasse .mascot-image

  box.addEventListener("mouseenter", () => {
    if (image) {
      const theme = getCurrentTheme();
      if (theme === "theme1") {
        image.src = "./Bilder/Mascot2.jpg"; // Hover-Bild für Theme 1
      } else if (theme === "theme2") {
        image.src = "./Bilder/Bilder Footer/THEME2_Mascot_2.jpg"; // Hover-Bild für Theme 2
      } else if (theme === "theme3") {
        image.src = "./Bilder/Bilder Footer/THEME3_Mascot_2.jpg"; // Hover-Bild für Theme 3
      }
    }
  });

  box.addEventListener("mouseleave", () => {
    if (image) {
      const theme = getCurrentTheme();
      if (theme === "theme1") {
        image.src = "./Bilder/Mascot.jpg"; // Standard-Bild für Theme 1
      } else if (theme === "theme2") {
        image.src = "./Bilder/Bilder Footer/THEME2_Mascot_1.jpg"; // Standard-Bild für Theme 2
      } else if (theme === "theme3") {
        image.src = "./Bilder/Bilder Footer/THEME3_Mascot_1.jpg"; // Standard-Bild für Theme 3
      }
    }
  });
});

// Array mit den Bildpfaden
const images = [
  "./Bilder/SecondPizza.jpeg",
  "./Bilder/FirstPizza.jpeg",
  "./Bilder/Pizza.jpeg",
  "./Bilder/Pizza1.jpeg",
  "./Bilder/Pizza2.jpeg",
  "./Bilder/Pizza3.jpeg",
];

// Funktion, um ein zufälliges Bild zu wählen
function changeImage() {
  const imgElement = document.getElementById("dynamicImage");
  const randomIndex = Math.floor(Math.random() * images.length); // Zufälligen Index auswählen
  imgElement.src = images[randomIndex]; // Bildquelle ändern
}

// Funktion, um das Bild zurückzusetzen, wenn der Hover-Effekt endet
function resetImage() {
  const imgElement = document.getElementById("dynamicImage");
  imgElement.src = "./Bilder/ThirdPizza.jpeg"; // Standardbild wiederherstellen
}

function toggleMenu() {
  const menu = document.querySelector(".dropdown-menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

function closeMenu() {
  const menu = document.querySelector(".dropdown-menu");
  menu.style.display = menu.style.display = "none";
}

function openMenu() {
  document.getElementById("sideMenu").style.left = "0";
}

function closeMenu() {
  document.getElementById("sideMenu").style.left = "-300px";
}
