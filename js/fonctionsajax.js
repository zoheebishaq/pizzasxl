// Procédure qui reçoit en paramètres
// le nom du dossier, le nom du fichier à lire ,
// le nom du fichier php
//puis affiche  le contenu du fichier texte
// dans l'objet spécifié;

function lecture(urlphp,nomfichier,objet)
{
   $.ajax
   (
        {
		  	url: urlphp,
			data:{nomfichier:nomfichier},
			async:false,
			complete:function(resultat)
			{
			   // on formate en texte la réponse du serveur

			   texte=resultat.responseText;
			   $("#"+objet).html(texte);
			}

		}
   );

}

// fonction qui reçoit en paramètres
// le nom du dossier, celui du fichier à récupérer
// et le fichier php
// puis retourne la chaine xml
// comprenant le nom du fichier et son url
function getFichier(dossier,fichier,urlphp)
{
	$.ajax
	  (
			{
			     url:urlphp,
				 datatype:"xml",
				 data:{dossier:dossier,fichier,fichier},
				 async:false,
				 success:function(resultat)
				 {
				 xml=resultat;
				 }
			}
	  );

  return xml;

}

// fonction retournant un fichier image alétoire
function imagealea(dossier,urlphp)
{
	$.ajax
	  (
			{
			     url:urlphp,
				 datatype:"xml",
				 data:{dossier:dossier},
				 async:false,
				 success:function(resultat)
				 {
				 xml=resultat;
				 }
			}
	  );
	  return xml;
}






// fonction qui reçoit en paramètres
// le nom du dossier, le nom du fichier php
// puis explore le contenu di dossier
// et retourne la chaine xml contenant
// le nom de chaque fichier avec son url
function getDossier(dossier,urlphp)
{

	$.ajax
	  (
			{
			     url:urlphp,
				 datatype:"xml",
				 data:{dossier:dossier},
				 async:false,
				 success:function(resultat)
				 {
				 xml=resultat;
				 }
			}
	  );

  return xml;
}


// fonction recevant en paramètre le nom du dossier
// le nom du fichier xml
// et le nom du fichier php puis retourne la chaine xml obtenue
function getXml(dossier,fichier, urlphp)
{
 $.ajax
	  (
			{
			     url:urlphp,
				 datatype:"xml",
				 data:{dossier:dossier,fichier:fichier},
				 async:false,
				 success:function(resultat)
				 {
				 xml=resultat;
				 }
			}
	  );

  return xml;
}

// fonction recevant en paramètre le nom d'une table ou d'une vue de la base de données concernée
// appelle le fichier php qui va envoyer les paramètres au SGBD puis récupère les enregistrements
// et retourne la chaine xml correspondante

 function getXmlBase(nomtable,clef,valeur)
{
 $.ajax
	  (
			{
			   url:"modeles/sqlxml.php",
				 datatype:"xml",
				 data:{nomtable:nomtable,clef:clef,valeur:valeur},
				 async:false,
				 success:function(resultat)
				 {
				 xml=resultat;
				 }
			}
	  );

  return xml;
}

// procédure qui affiche dans une liste déroulante spécifiée
// des informations extraites d'une chain xml
// idliste : identifiant de la liste déroulante
// varxml : nom de la variable xml contenant la structure xml
// nomtable : nom de la balise conteneur de la chaine xml correspondant
// au nom d'une table ou d'une vue dans la base de données correspondante
// valeur : nom de la colonne ( champ ) destiné à la propriété value de la liste
// généralement une clé primaire ou étrangère
// libelle : nom de la colonne (champ) destiné à l'affichage dans la liste
function afficheListe(idliste,varxml,nomtable,valeur,libelle)
{
   var chaine="";
   $(varxml).find(nomtable).each
   (
        function()
		{
		  var va =$(this).find(valeur).text();
		  var lib=$(this).find(libelle).text();
		  chaine+="<option value='"+va+"'>"+lib+"</option>";
		}
   );
   var nomliste="#"+idliste;
   $(nomliste).append(chaine);
}

// fonction qui retourne les différentes valeurs
// d'un élément xml
// colnom=nom de la colonne de référence
// colvaleur :valeur correspondante
// colrech : nom de la colonne recherchée

function getElement(xml,vue,colnom,colvaleur,colrech)
{
    var res="";
	$(xml).find(vue).each
	(
	    function()
		{
		   var id=$(this).find(colnom).text();
		   if(id==colvaleur)
		       res=$(this).find(colrech).text();

		}
	);
	return res;
}

// Fonction non-Ajax
function listeNombres (liste, debut, fin, pas) // Quelle liste ? Où je commence ? Où je termine ? Comment j'incrémente ?
{
  chaine="";
  for(i=debut; i<=fin; i+=pas)
  {
    chaine+="<option value='"+i+"'>"+i+"</option>"; // += pour concaténer en JS
    // value='"+i+"' => pour renvoyer une valeur à PHP, peut être pas forcemment nécéssaire.
    // Si on ne met pas de value, PHP est sensé prendre la valeur d'affichage.
  }
      $("#"+liste).html(chaine);
}
