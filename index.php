<?php
include("entete.html");
?>

<div class="container-fluid">
    
    <div class="col-12 mt-5 lignepanier text-justify">
        <h5>Bienvenue sur notre site.
        vous trouverez un large choix de pizzas dont certaines conviennent très bien aux végétariens comme aux amateurs de viande ou de poisson.
    </div>

	<div id="principale" class="row mt-5">

		<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 mx-auto mt-2 text-center">
			<!-- &nbsp; pour laisser de l'espace -->
			<span class="spantitre text-secondary">GENRES</span>
			&nbsp;&nbsp;<input type="radio" name="genre" id="1" checked="checked"/>Classiques
			&nbsp;&nbsp;<input type="radio" id="2" name="genre"/>Italiennes <br> <br><br />


			<span class="spantitre text-secondary">PIZZAS</span>
			&nbsp;&nbsp;
			<select id="listepizzas">	</select>
			<br />
			<div class="mt-1"> </div>
			<img src="images/0.jpg" id="imgp" width="36%" height="36%" class="img-fluid">
			&nbsp;&nbsp;
			<h5 id="nompizza" class="text-secondary"></h5>

			<div id="divingrédients">
			<h6 id="ingredients" class="text-secondary"></h6>
			</div>

			<div class="row mx-auto text-secondary">
				<div id="veget" class="col-xs-12 col-sm-4 col-md- col-lg-4 mx-auto text-center mt-2">
					
				</div>

				<div id="new" class="col-xs-12 col-sm-4 col-md- col-lg-4 mx-auto text-center mt-2">
					
				</div>
				<div id="tarif" class="col-xs-12 col-sm-4 col-md-4 col-lg-4 mx-auto text-center mt-2">
					
				</div>
				
			</div>


		</div>

		<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 mx-auto text-center mt-2">
			<div>
				<span class="spantitre text-secondary">CHOIX</span>
				<br> <br>

				<div class="mt-2">
					Taille : <select id="listetaille"></select>
				</div><br>

				<div class="mt-2">
				    Quantité : <select id="qt"></select>
				</div><br>

				<div class="mt-2">
				    Prix : <label id="prix" class="text-success"></label>
				</div><br>

	<div class="mt-2">
		<button type="button" class="btn-primary" id="btpanier">Ajouter au panier</button>
	</div><br>

			</div>
		</div>

		<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 mx-auto mt-2">
			<div class="text-center">
				<span class="spantitre text-secondary">MON PANIER</span>
			</div>
			<div id="divpanier" class="mt-2">
             
		    </div>
			<div>Nombre de pizzas : <label id="lblnombre" class= "text-success"><span id= "spannombre" class= "spanpanier text-success">0</span></label></div>
            <div>Montant global : <label id="lblmontant" class= "text-success"><span id= "spanmontant" class= "spanpanier text-success">0</span></label></div>
            <div class= "text-center mt-2">
                <button clas= "btn btn-primary">VALIDER LE PANIER</button>
            </div>
	  </div>
        
         <!-- pour supprimer un élément dans un tableau (javascript)
          Nomtableau splice(index, nb-elements)-->
    </div>
</div>

<?php
include("piedpage.html");
?>

</body>
<script src="js/index.js"></script>
</html>
