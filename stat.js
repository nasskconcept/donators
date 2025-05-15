const donateursJSON = localStorage.getItem("donateursFiltres");
const nbCartes = parseInt(localStorage.getItem("nbCartes")) || 50;

if (donateursJSON) {
  const users = JSON.parse(donateursJSON);
  const listeVisible = users.slice(0, nbCartes);

  const nbDons = listeVisible.length;
  const total = listeVisible.reduce((acc, u) => acc + u.amount, 0);
  const moyen = (total / nbDons).toFixed(2);
  const maxDon = Math.max(...listeVisible.map((u) => u.amount));
  const donateur = listeVisible.find((u) => u.amount === maxDon)?.name || "—";

  document.getElementById("stat-nb-dons").textContent = nbDons;
  document.getElementById("stat-total").textContent = `${total},00 €`;
  document.getElementById("stat-moyen").textContent = `${moyen} €`;
  document.getElementById("stat-max").textContent = `${maxDon},00 €`;
  document.getElementById("stat-meilleur").textContent = donateur;

  const recap = document.getElementById("stat-recap");
  if (recap) {
    recap.textContent = `Statistiques basées sur les ${nbDons} profils affichés.`;
  }
} else {
  document.querySelector("main").innerHTML = `
    <section class="text-red-700 font-bold p-4">
      <p>Aucune donnée disponible.</p>
      <p><a href="index.html" class="underline">Retournez à la page principale</a> pour générer les statistiques.</p>
    </section>
  `;
}
