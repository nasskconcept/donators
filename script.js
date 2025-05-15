const sectionCartes = document.getElementById("liste-utilisateurs");
const selectNbCartes = document.getElementById("nb-cartes");
const searchInput = document.getElementById("search-nom");

let users = [];
let listeActive = [];

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
      amount: Math.floor(Math.random() * 276) + 25,
    }));

    listeActive = users;

    localStorage.setItem("donateursFiltres", JSON.stringify(users));
    localStorage.setItem("nbCartes", selectNbCartes.value);

    mettreAJourAffichageEtStockage();
  });

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

function mettreAJourAffichageEtStockage() {
  const nb = parseInt(selectNbCartes.value);
  const listeVisible = listeActive.slice(0, nb);
  afficherCartes(listeVisible);
  localStorage.setItem("donateursFiltres", JSON.stringify(listeActive));
  localStorage.setItem("nbCartes", nb);
}

selectNbCartes.addEventListener("change", () => {
  mettreAJourAffichageEtStockage();
});

document.getElementById("tous").addEventListener("click", () => {
  listeActive = users;
  mettreAJourAffichageEtStockage();
});

document.getElementById("homme").addEventListener("click", () => {
  listeActive = users.filter((u) => u.gender === "male");
  mettreAJourAffichageEtStockage();
});

document.getElementById("femme").addEventListener("click", () => {
  listeActive = users.filter((u) => u.gender === "female");
  mettreAJourAffichageEtStockage();
});

document.getElementById("montant-don").addEventListener("click", () => {
  listeActive = [...listeActive].sort((a, b) => b.amount - a.amount);
  mettreAJourAffichageEtStockage();
});

document.getElementById("ordre-abc").addEventListener("click", () => {
  listeActive = [...listeActive].sort((a, b) => a.name.localeCompare(b.name));
  mettreAJourAffichageEtStockage();
});

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  listeActive = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm)
  );
  mettreAJourAffichageEtStockage();
});
