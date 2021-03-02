<?php
include("pdoxml.php");
include("base.php");
$nomtable=$_REQUEST['nomtable']; // Nom de la table, eq de select
$clef=$_REQUEST['clef']; // equivalent du where
$valeur=$_REQUEST['valeur'];

$sql=new PdoXml($server,$user,$mdp,$db);
$xml= $sql->Xml($nomtable,$clef,$valeur);
echo $xml;
?>
