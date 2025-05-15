// Récupération des données
fetch("https://randomuser.me/api/?results=50")
  .then((res) => res.json())
  .then((data) => {
    const users = data.results.map((user) => ({
      name: `${user.name.first} ${user.name.last}`,
      amount: Math.floor(Math.random() * 276) + 25,
    }));

    const nbDons = users.length;
    const total = users.reduce((acc, u) => acc + u.amount, 0);
    const moyen = (total / nbDons).toFixed(2);

    const maxDon = Math.max(...users.map((u) => u.amount));
    const donateur = users.find((u) => u.amount === maxDon)?.name || "—";

    document.getElementById("stat-nb-dons").textContent = nbDons;
    document.getElementById("stat-total").textContent = `${total},00 €`;
    document.getElementById("stat-moyen").textContent = `${moyen} €`;
    document.getElementById("stat-max").textContent = `${maxDon},00 €`;
    document.getElementById("stat-meilleur").textContent = donateur;
  });
