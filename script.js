
// On prépare un tableau pour enregistrer toutes les dépenses saisies.
let depenses = [];

// Nous récupérons les éléments du formulaire pour pouvoir les utiliser facilement dans le code.
const champDescription = document.getElementById('champ-description'); // champ texte pour la description
const champMontant = document.getElementById('champ-montant');         // champ nombre pour le montant
const listeDepenses = document.getElementById('liste-depenses');       // zone d'affichage des dépenses
const totalAffichage = document.getElementById('total-affichage');     // zone d'affichage du total

// Cette fonction permet de mettre à jour l'affichage à chaque fois que nous ajoutons ou supprimons une dépense.
function majAffichage() {

    // Pour chaque dépense, on crée une ligne avec la description, le montant et un bouton pour supprimer
    // .join("") permet de transformer le tableau de lignes HTML en une seule grande chaîne de texte pour l'affichage
    listeDepenses.innerHTML = depenses.map(depense =>
        `<p>${depense.description} - ${depense.montant.toFixed(2)} € <button onclick="supprimerDepense(${depense.id})">Supprimer</button></p>`
    ).join("");

    // Nous calculons le total de toutes les dépenses et nous l'affichons.
    totalAffichage.textContent = depenses.reduce((total, depense) => total + depense.montant, 0).toFixed(2) + " €";
}

// Cette fonction s'exécute quand nous voulons ajouter une dépense.

function ajouterDepense() {
    // On lit ce que l'utilisateur a écrit dans les champs
    const desc = champDescription.value.trim();
    const montant = +champMontant.value;

    // Nous vérifions que les deux champs sont bien remplis. Si un champ est vide, on affiche une alerte et on arrête la fonction

    if (!desc || !montant) return alert("Merci de remplir la description et le montant.");
   
    // Ici, on insère une nouvelle dépense dans notre tableau avec un identifiant unique
    depenses.push({ id: Date.now(), description: desc, montant });

    // On efface les champs pour faciliter la saisie suivante
    champDescription.value = champMontant.value = "";

    
    majAffichage();
}

// Cette fonction permet de supprimer une dépense quand on clique sur le bouton "Supprimer".

function supprimerDepense(id) {
    // On filtre le tableau pour ne garder que les dépenses qui n'ont pas cet id
    depenses = depenses.filter(depense => depense.id !== id);


    majAffichage();
}

// Nous ajoutons un écouteur d'événement sur le bouton pour que, quand on clique, la fonction d'ajout soit appelée.
document.getElementById('bouton-ajouter').addEventListener('click', ajouterDepense);