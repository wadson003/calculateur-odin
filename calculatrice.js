const ajouter =(a,b) => a+b;
const soustraire = (a,b) => a-b;
const multiplier =(a,b)=> a*b
const diviser = (a,b)=> {
    if (b===0) return "Erreur :Div/0";
    return a/b;
};

let premierNombre = "";
let deuxiemeNombre = "";
let OperateurActuel = null;
let ecranDoitEtreReinitialise = false;

function operate(operateur, a, b){
    a = Number(a);
    b = Number(b);
    switch (operateur){
        case "+":return ajouter(a,b);
        case "-":return soustraire(a,b);
        case "*":return multiplier(a,b);
        case "/":return diviser(a,b);
        default: return null;
    }
}

const afficheur =document.getElementById('ecran');
const boutonsNombre = document.querySelectorAll('.number');
const boutonsOperateur = document.querySelectorAll('.operator');
const boutonEgal = document.getElementById('egals');
const boutonclear = document.getElementById('effacer');


boutonsNombre.forEach((bouton)=> {
    bouton.addEventListener('click',() => {
        if (afficheur.textContent==='0' || ecranDoitEtreReinitialise){
            afficheur.textContent = bouton.textContent;
            ecranDoitEtreReinitialise = false;
        }else{
            if (bouton.textContent ==='.' && afficheur.textContent.includes('.'))
                return;
            afficheur.textContent += bouton.textContent;
        }
        });
    });
boutonsOperateur.forEach((bouton)=>{
    bouton.addEventListener('click',()=>{
        if (OperateurActuel !== null) calculer();
        premierNombre = afficheur.textContent;
        OperateurActuel = bouton.textContent;
        ecranDoitEtreReinitialise = true;
    });
});

function calculer(){
    if (OperateurActuel === null || ecranDoitEtreReinitialise) return;
    deuxiemeNombre = afficheur.textContent;
    let resultat = operate(OperateurActuel, premierNombre, deuxiemeNombre);

    if(typeof resultat === 'number'){
        resultat = Math.round(resultat*1000)/1000;
    }
    afficheur.textContent = resultat;
    OperateurActuel = null;
}

boutonEgal.addEventListener('click',calculer);

boutonclear.addEventListener('click',() =>{
    afficheur.textContent ='0';
    premierNombre = "";
    deuxiemeNombre = "";
    OperateurActuel = null;
});


