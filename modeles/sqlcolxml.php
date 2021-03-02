<?php
include("../modeles/pdoxml.php");
include("../modeles/base.php");
$nomtable=$_REQUEST['nomtable']; // Table
$clef=$_REQUEST['clef']; // Colonne de filtrage, équivalent du where
$valeur=$_REQUEST['valeur'];
$sql=new PdoColXml($server,$user,$mdp,$db);
$xml= $sql->ColXml($nomtable);
echo $xml;
?>
