<?php
class PdoColXml
{
   var $connex;
	var $nombase;
	var $tbl;

	public function PdoColXml($server,$user,$mdp,$db) // Constructeur
	{
    // en php, le -> remplace le . java
		$this->connex=new PDO("mysql:host=$server;dbname=$db", $user, $mdp);
		$this->nombase=$db;
	}

	public function colXml($table)
	{
		$chaine="<".$this->nombase.">";;
	   $req="show columns from ".$table;
	   $resultat= $this->connex->query($req);
	   $colonnes=$resultat->fetchALL(PDO::FETCH_ASSOC);

	   foreach($colonnes as $col)
	   {
	      $chaine.="<colonne><nomcol>";
		  $chaine.=$col['Field']."</nomcol></colonne>";
	   }
	   $chaine.="</".$this->nombase.">";

        return $chaine;
	}
}

?>
