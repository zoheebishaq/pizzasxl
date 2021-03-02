// Déclarations/initialisation variables globales
chainexml="";
nomgenre="Nos Classics";
tarif=0;
taille="";
nom="";
prix=0;
max=6;

// tableaux représentant lesx éléments du panier
tbpizzas= [];  // nom de la pizza
tbtailles=[];   // taille de la pizza correspondante
tbqt=[];		// qt choisie pour la pizza correspondante
tbprix=[];   	// Prix pour la pîzza et sa quantité choisie
tbingred=[];      // ingrédients d'une pizza
tbdetails=[];		// boutons des détails
// Nos Classics          nos Pizzas Italiennes 


$(document).ready
(
  function()
  {
   	  
	  
	// function getXmlBase(nomtable,clef,valeur)
    // 0 : pas de clef, 0: pas de valeurs
     chainexml=getXmlBase("pizzas","nomGenre",nomgenre);
	
    // afficheListe(idliste,varxml,nomtable,valeur,libelle)
    // idListe => L'endroit où va s'insérer la liste dans le php
    // varxml => Le nom de la variable créee (chaine) via la fonction getXmlBase en ligne 5
    // nomtable => Le nom de la table dans la base de données
    // valeur => nom de la colonne dans la $table
    // libellé =>
    afficheListe("listepizzas",chainexml,"pizzas","nomPizza","nomPizza");

   // liste des tailles
   var chaine2=getXmlBase("tailles","0","0"); // 0 : pas de clef, 0: pas de valeurs
    afficheListe("listetaille",chaine2,"tailles","nomTaille","nomTaille");
	
	// liste des quantités
    listeNombres("qt",1,10,1);
	//--------------------------------------------------//
	// appel de la procédure affichage des détails
	 afficheDetails();
	 
	 // appel de la procédure affichage ingrédients
	 afficheIngredients();
	 
	 // appel de la procédure calcul
	 calcul();	 
  }
);

  // changement dans la liste des pizzas
  $("#listepizzas").change
  (	
		function()
		{
			afficheDetails();
          afficheIngredients();
		  calcul();
		}
  
  );
  
  
  //changement liste des tailles
  $("#listetaille").change
  (
		function()
		{
			calcul();
		}
  );
  
  // changement liste quantités
  $("#qt").change
  (
		function()
		{
			calcul();
		}
  );
  
  
  // click sur les boutons radio (genre)
$("#1,#2").click
  (
		function()
		{
			var id=$(this).attr('id');
			if(id=="1")
			{
				nomgenre="Nos Classics";
			}
			else
			{
				nomgenre="nos Pizzas Italiennes";
			}
		 chainexml=getXmlBase("pizzas","nomGenre",nomgenre);
		  $("#listepizzas").html("");
		  afficheListe("listepizzas",chainexml,"pizzas","nomPizza","nomPizza");
		afficheDetails(); 
			
		}
  );

// click sur le bouton btpanier
$("#btpanier").click
(
	function()
	{
		// nb elements du tableau panier
		nb= tbpizzas.length;
		if(nb<max)
		{
			qt=$("#qt").val();
			
			chaine1=nom+" "+taille;
			
			indexbouton="b"+nb;
			indexdetail="d"+nb;
			chaine1+="<br /><button id='"+indexbouton+"' type='button' class='btn btn-success btn-sm btndetail '>Détails</button>";
			chaine1+="<div id='"+indexdetail+"' class='detailpanier'>";
			contenuingr=$("#ingredients").html();
			chaine1+=contenuingr+"</div>";
			
			
			indexelement="n"+nb;
			chaine2="<input type='number' class='classeqt' min='1' max='10' ";
			chaine2+="value='"+qt+"' id='"+indexelement+"' />";
			prixpizza=prix;
			prixpizza=prixpizza*1000;
			prixpizza=Math.round(prixpizza)/1000;
			prixpizza=prixpizza.toFixed(2); 
			chaine3=prixpizza;
			
			
			// ajout dans la section du panier
				
			// ajout de la poubelle ( suppression d'un élément)
			indextrash="t"+nb;
			chtrash="<a href='#' id='"+indextrash+"' class='classetr'>";
			chtrash+="<img class='img-fluid' src='trash.png' /></a>";
			//$("#paniertrash").append(chtrash+"<br />");
			
			// on affiche le total des pizzas et du montant en concaténant
			chaine="<div class='row lignepanier mr-1'>";
			chaine+="<div class='col-xs-12 col-sm-12 col-md-5 col-lg-5 my-auto'>"+chaine1+"</div>";
			chaine+="<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4 my-auto'>"+chaine2+"</div>";
			chaine+="<div class='col-xs-12 col-sm-12 col-md-2 col-lg-2 my-auto'>"+chaine3+"</div>";
			chaine+="<div class='col-xs-12 col-sm-12 col-md-1 col-lg-1 my-auto text-center'>"+chtrash+"</div>";
			
			// fermeture de la ligne
			chaine+="</div>";
			
			$("#divpanier").append(chaine);
			
			// Pour supprimer un élément en javascript :
			// Nomtableau.splice(index,nbelements)
			
			// mise à jour des tableaux
			tbpizzas[nb]=nom;
			tbtailles[nb]=taille;
			tbqt[nb]=qt;
			tbprix[nb]=prix;
			tbingred[nb]=contenuingr;
			tbdetails[nb]=indexbouton;
			
			total= totalpizzas();
			$("#spannombre").html(total);
			montant =totalmontant();
			$("#spanmontant").html(montant+" €");
			
			$("#"+indexdetail).slideToggle();
		}		
	}
);



// fonctions utilisateur
function afficheDetails()
{
	// on récup le nom de la pizza
	 nom=$("#listepizzas").val();
	
	// on récup la valeur du champ "végétarienne"
	var veget=getElement(chainexml,"pizzas","nomPizza",nom,"veget");
	// on récup lma valeur de "new"
	var nouveau=getElement(chainexml,"pizzas","nomPizza",nom,"new");
	
	// on récup le code tarif
	 tarif= getElement(chainexml,"pizzas","nomPizza",nom,"codeTarif");
	
	
	// on récup l'index de l'image
	var indeximage=getElement(chainexml,"pizzas","nomPizza",nom,"indeximage");
	
	
	// affichage des résultats récupérés
	$("#nompizza").html(nom);
	

	if(veget=="0")
	{
		veget="Végétarienne : Non";
	}
	else
	{
		veget="Végétarienne : Oui";
	}
	
	if(nouveau=="0")
	{
		nouveau="Nouvelle : Non";
	}
	else
	{
		nouveau="Nouvelle : Oui";
	}
	
	codetarif="Tarif : "+tarif;
	
	// affichage de l'image de la pizza
	nomimage=indeximage+".jpg";
	src="images/"+nomimage;
	$("#imgp").attr("src",src);
	
	
	
	
	// affichage des valeurs dans les zones concernées
$("#veget").html(veget);
$("#new").html(nouveau);
$("#tarif").html(codetarif);
}


function afficheIngredients()
{
	compteur=1;
	// on recup la valeur de la pizza sélectionnée dans la liste des pizzas
	var nompizza=$("#listepizzas").val();
	ingredients= getXmlBase("composer","nomPizza",nompizza);
	  chaineingred="";
	 // on parse la chaine xml contenant les ingrédients
	 $(ingredients).find("composer").each
	 (
			function()
			{
				// on récupère l'élément xml et on le formate sans les balises < >
				var ingred=$(this).find("nomIngredient").text();
				if(compteur>1)
				{
				chaineingred+=" - "+ingred;
				}
				else
				{
					chaineingred+=ingred;
				}
				compteur++;
			}
	 );

	// on ajoute ce contenu dans la zone ingredients
	$("#ingredients").html(chaineingred);

}

// Fonctions precédures définies 


// procédure de clacul du prix
function calcul()
{
	// on filtre la table couter sur la taille de la pizza
	taille=$("#listetaille").val();
	xmltaille=getXmlBase("couter","nomTaille",taille);
	// on récup le prix correspondant à uncode tarif donné
	prix= getElement(xmltaille,"couter","codeTarif",tarif,"prix");
	quantite=$("#qt").val();
	prix=prix*quantite;
	
	prixpizza=prix*1000;
	prixpizza=Math.round(prixpizza)/1000;
	prixpizza=prixpizza.toFixed(2);
	// on affiche le prix
	$("#prix").html(prixpizza+" €");
}

function totalpizzas()
{
	total=0;
	
		for(var i=0; i<tbqt.length;i++)
		{
			quant=parseInt(tbqt[i]);
			total+=quant;
		}
		return total;
}

function totalmontant()
{
	total=0;
	for(var i=0; i<tbqt.length;i++)
		{
			//quant=parseInt(tbqt[i]);
			prix=tbprix[i];
			total+=prix;
		}
		return total;
}

// procédure afficher le panier
function affichepanier(nb)
{
	// on vide la division divpanier
	$("#divpanier").html("");
	
	for(var i=0; i<nb; i++)
	{
		qtpizza=tbqt[i];
		nompizza=tbpizzas[i];
		taillepizza=tbtailles[i];
		prixpizza=tbprix[i];
		contenuingr=tbingred[i];
		valeurbouton=tbdetails[i];
		
		//chaine1=nom+" "+taille;
		indexelement="n"+i;
		chaine1=nompizza+" "+taillepizza;
		
		   //indexbouton="b"+nb;
			indexdetail="d"+i;
			chaine1+="<br /><button id='"+valeurbouton+"' type='button' class='btn btn-success btn-sm btndetail '>Détails</button>";
			chaine1+="<div id='"+indexdetail+"' class='detailpanier'>";
			chaine1+=contenuingr+"</div>";
		
		chaine2="<input type='number' class='classeqt' min='1' max='10' ";
		chaine2+="value='"+qtpizza+"' id='"+indexelement+"' />";
		//prixpizza=prixpizza*1000;
		//prixpizza=Math.round(prixpizza)/1000;
	   // prixpizza=prixpizza.toFixed(2); 
		chaine3=prixpizza;
				
		// ajout dans la section du panier
		// ajout de la poubelle ( suppression d'un élément)
		indextrash="t"+i;
		chtrash="<a href='#' id='"+indextrash+"' class='classetr'>";
		chtrash+="<img class='img-fluid' src='trash.png' /></a><br /><br />";
		//$("#paniertrash").append(chtrash+"<br />");
		
		// on affiche le total des pizzas et du montant en concaténant
		chaine="<div class='row lignepanier mr-1'>";
		chaine+="<div class='col-xs-12 col-sm-12 col-md-5 col-lg-5 my-auto'>"+chaine1+"</div>";
		chaine+="<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4 my-auto'>"+chaine2+"</div>";
		chaine+="<div class='col-xs-12 col-sm-12 col-md-2 col-lg-2 my-auto'>"+chaine3+"</div>";
		chaine+="<div class='col-xs-12 col-sm-12 col-md-1 col-lg-1 my-auto text-center'>"+chtrash+"</div>";
		// fermeture de la ligne
		chaine+="</div>";
		$("#divpanier").append(chaine);
		$("#"+indexdetail).slideToggle();
	}
}

// click sur element trash créer dynamiquement 
$(".classetr").live
(
	"click",
	function()
	{
		var id=$(this).attr('id');
		var index= id.substr(1,1);
		// on supprime, dans chacun des tableaux définis, l'élément correspondant à l'index
		tbpizzas.splice(index,1);
		tbtailles.splice(index,1);
		tbqt.splice(index,1);
		tbprix.splice(index,1);
		tbingred.splice(index,1);
		
		nb= tbpizzas.length;
		affichepanier(nb);
		total= totalpizzas();
			$("#spannombre").html(total);
			montant =totalmontant();
			$("#spanmontant").html(montant+" €");
	}
);


$(".classeqt").live
(
	"click",
	function()
	{
		var id=$(this).attr('id');
		var index= id.substr(1,1);
		
		var ancienneqt=tbqt[index];
		var ancienprix= tbprix[index]
		var prixunit=ancienprix/ancienneqt;
		var valeur=$(this).val();
		nouveauprix=valeur*prixunit;
		
		// on met à jour le tableau des quantités
		tbqt[index]=valeur;
		
		// on met à jour le tableau des prix
		tbprix[index]=nouveauprix;
		
		nb= tbpizzas.length;
		affichepanier(nb);
		
		total= totalpizzas();
			$("#spannombre").html(total);
			montant =totalmontant();
			$("#spanmontant").html(montant+" €");
	}
);

// click sur un des boutons détail du panier
$(".btndetail").live
(
    "click",function()
	{
		// on récup l'id du bouton cliqué
	     var id=$(this).attr('id');
		 var index= id.substr(1,1);
		 var indexdetail="#d"+index;
		 $(indexdetail).slideToggle();
		 
		 // on masque une fois sur deux la division qui contient les ingrédients
		 
	}
);


// click(changement) d'une valeur dans un élément number
/*$(".classeqt").live
(
	"click",function()
	{
		var id=$(this).attr(id);
		var index=id.substr(1,1);
		var ancienneqt=tbqt[index];
		var ancienprix= tbprix[index]
		var prixunit=ancienprix/ancienneqt;
		var valeur=$(this).val();
		nouveauprix=valeur*prixunit;
		
		// on met à jour le tableau des quantités
		tbqt[index]=valeur;
		
		// on met à jour le tableau des prix
		tbprix[index]=nouveauprix;
		
		nb= tbpizzas.length;
		affichepanier(nb);
		total= totalpizzas();
			$("#spannombre").html(total);
			montant =totalmontant();
			$("#spanmontant").html(montant+" €");
		
	}
);
*/