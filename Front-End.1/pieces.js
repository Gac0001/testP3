import { ajoutListenersAvis } from "./avis.js";
// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();


function genererPieces(pieces){
    for(let i=0; i<pieces.length; i++){

        const sectionFiche=document.querySelector('.fiches')
    
        const piecesElt=document.createElement('article')
    
    
        //creation et affectation d'elements
        const imageElt=document.createElement('img');
        imageElt.src=pieces[i].image;
    
        const nomElt=document.createElement('h2');
        nomElt.innerText=pieces[i].nom;
    
        const prixElt=document.createElement('p');
        prixElt.innerText=`Prix : ${pieces[i].prix}€ (${pieces[i].prix < 35? "€":"€€€"})`;
    
        const categorieElt=document.createElement('p');
        categorieElt.innerText=pieces[i].categorie;
    
        const descriptionElt=document.createElement('p');
        descriptionElt.innerText=pieces[i].description ?? "(Pas de description pour le moment)";
    
        const disponibleElt=document.createElement('p');
        disponibleElt.innerText=pieces[i].disponibilite ? "En stock":"Rupture de stock";

        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = piecesElt.id;
        avisBouton.textContent = "Afficher les avis";
    
        //affichage d'elements dans le DOM
    
        sectionFiche.appendChild(piecesElt)
        piecesElt.appendChild(imageElt);
        piecesElt.appendChild(nomElt);
        piecesElt.appendChild(prixElt);
        piecesElt.appendChild(categorieElt);
    
        //verification d'elements
        piecesElt.appendChild(descriptionElt);
        piecesElt.appendChild(disponibleElt)
        piecesElt.appendChild(avisBouton);
    
    }
    ajoutListenersAvis()
}
//premier affichag de la page
genererPieces(pieces);

// Ajout du listener pour trier les pièces par ordre de prix croissant
//Declanchement du bouton pour trier les elts du tableau en ordre croissant
const boutonTrier=document.querySelector('.btn-trier');
boutonTrier.addEventListener("click", function(){
    const piecesOrdonnees=Array.from(pieces);
    piecesOrdonnees.sort(function (a,b){
        return a.prix-b.prix;
    });
    document.querySelector('.fiches').innerHTML='';
    genererPieces(piecesOrdonnees)
    console.log(piecesOrdonnees)
})

//Declanchement du bouton pour filtrer les elts les plus coûteux
const boutonFiltrer=document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function(){
    const piecesFiltrees=pieces.filter(function(piece){
        return piece.prix <= 35;
    })
    document.querySelector('.fiches').innerHTML='';
    genererPieces(piecesFiltrees)
    console.log(piecesFiltrees)
})

//Declanchement du bouton pour trier les elts du tableau en ordre decroissant
const boutonTrier2=document.querySelector('.btn-trier2');
boutonTrier2.addEventListener("click", function(){
    
    const piecesOrdonnees=Array.from(pieces);
    piecesOrdonnees.sort(function (a,b){
        return b.prix-a.prix;
    });
    document.querySelector('.fiches').innerHTML='';
    genererPieces(piecesOrdonnees)
    console.log(piecesOrdonnees)
})

//Declanchement du bouton pour filtrer les elts les moins coûteux
const boutonFiltrer2=document.querySelector(".btn-filtrer2");
boutonFiltrer2.addEventListener("click", function(){
    const piecesFiltrees=pieces.filter(function(piece){
        return piece.description;
    })
    document.querySelector('.fiches').innerHTML='';
    genererPieces(piecesFiltrees)
    console.log(piecesFiltrees)
})

//filtrage de la balise input type='range'
const inputRange=document.querySelector('#cost')
inputRange.addEventListener('input', function(){
    const piecesFiltrees=pieces.filter(function(piece){
        return piece.prix <= inputRange.value;
    })
    document.querySelector('.fiches').innerHTML='';
    genererPieces(piecesFiltrees)
    console.log(piecesFiltrees)
})

/**************************************************************** */
const noms=pieces.map(piecx=>piecx.nom);
const cost=pieces.map(piece=>piece.prix);
    for(let i=pieces.length-1; i>=0; i--){
    if(pieces[i].prix>35){
        noms.splice(i,1)
        cost.splice(i,1)
    }
}

const abordableElt=document.createElement('ul');
for(let i=0; i<noms.length; i++){
    const nomElts=document.createElement('li');
    nomElts.innerText=`${noms[i]} - ${cost[i]}`;
    abordableElt.appendChild(nomElts)
}
document.querySelector('.abordables').appendChild(abordableElt)

const piecesName=pieces.map(piece=>piece.nom);
const piecesPrix=pieces.map(piece=>piece.prix)
    for(let i=pieces.length-1; i>=0; i--){
        if(pieces[i].disponibilite===false){
            piecesName.splice(i,1)
            piecesPrix.splice(i,1)
        }
    }


const listDescript=document.createElement('ul');
for(let i=0; i<piecesName.length; i++){
    const descriptName=document.createElement('li');
    descriptName.innerText=`${piecesName[i]} - ${piecesPrix[i]}€`;
    listDescript.appendChild(descriptName)
}
const detaille=document.querySelector('.descriptPieceDisp').appendChild(listDescript)

/************************************************************************** */













