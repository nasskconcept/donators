const sectionCartes = document.getElementById("liste-utilisateurs");
const selectNbCartes = document.getElementById("nb-cartes");

let users = [];
let listeActive = []; // 👈 Stocke la liste filtrée/affichée actuellement

// Récupération des données
fetch("https://randomuser.me/api/?results=50")
  .then((res) => res.json())
  .then((data) => {
    users = data.results.map((user) => ({
      name: `${user.name.first} ${user.name.last}`,
      city: user.location.city,
      country: user.location.country,
      phone: user.phone,
      gender: user.gender,
      photo: user.picture.medium,
      amount: Math.floor(Math.random() * 276) + 25, // 25 à 300 €
    }));

    listeActive = users; // 👈 on initialise listeActive
    afficherCartes(listeActive.slice(0, parseInt(selectNbCartes.value)));
  });

// Fonction d'affichage
function afficherCartes(liste) {
  sectionCartes.innerHTML = "";
  liste.forEach((user) => {
    const borderColor =
      user.gender === "male" ? "border-blue-500" : "border-pink-500";
    sectionCartes.innerHTML += `
      <article class="bg-white rounded-lg shadow-lg p-4 text-center border-b-4 ${borderColor}">
        <p class="text-lg font-bold text-green-600 mb-2">${user.amount},00 €</p>
        <img src="${user.photo}" alt="${user.name}" class="mx-auto rounded-full w-24 h-24 mb-2">
        <h3 class="text-xl font-semibold">${user.name}</h3>
        <p>${user.city}, <span class="font-semibold">${user.country}</span></p>
        <p class="text-sm text-gray-500 mt-1">${user.phone}</p>
      </article>
    `;
  });
}

// Sélecteur du nombre de cartes
selectNbCartes.addEventListener("change", () => {
  afficherCartes(listeActive.slice(0, parseInt(selectNbCartes.value)));
});

// Filtres
document.getElementById("tous").addEventListener("click", () => {
  listeActive = users;
  afficherCartes(listeActive.slice(0, parseInt(selectNbCartes.value)));
});

document.getElementById("homme").addEventListener("click", () => {
  listeActive = users.filter((u) => u.gender === "male");
  afficherCartes(listeActive.slice(0, parseInt(selectNbCartes.value)));
});

document.getElementById("femme").addEventListener("click", () => {
  listeActive = users.filter((u) => u.gender === "female");
  afficherCartes(listeActive.slice(0, parseInt(selectNbCartes.value)));
});

// Tri
document.getElementById("montant-don").addEventListener("click", () => {
  const triMontant = [...listeActive].sort((a, b) => b.amount - a.amount);
  afficherCartes(triMontant.slice(0, parseInt(selectNbCartes.value)));
});

document.getElementById("ordre-abc").addEventListener("click", () => {
  const triAlpha = [...listeActive].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  afficherCartes(triAlpha.slice(0, parseInt(selectNbCartes.value)));
});
const searchInput = document.getElementById("search-nom");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  listeActive = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm)
  );

  afficherCartes(listeActive.slice(0, parseInt(selectNbCartes.value)));
});
