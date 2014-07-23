window.addEventListener("load",function(){
	var liste_competence = document.getElementsByClassName("competence");
	for(var i=0;i<liste_competence.length;i++){
		var competence = liste_competence[i];
		for(var j=1;j<=5;j++){
			var div = document.createElement("div");
			div.className = "niveau";
			if(j <= competence.getAttribute("data-niveau")){
				div.className += " actif";
			}
			competence.insertBefore(div,competence.firstChild)
		}
	}

	var liste_information = document.getElementsByClassName("information");
	for(var i=0;i<liste_information.length;i++){
		var information = liste_information[i];
		information.onclick = function(event){
			glasspane();
			var bouton = document.createElement("button");
			bouton.id = "btn_fermer";
			bouton.innerHTML = "Fermer";
			bouton.onclick = function(){
				document.getElementById(event.target.getAttribute("data-detail")).style.display = "none";
				document.getElementById("btn_fermer").parentNode.removeChild(document.getElementById("btn_fermer"));
				remove_glasspane();
			};
			document.getElementById(event.target.getAttribute("data-detail")).appendChild(bouton);
			document.getElementById(event.target.getAttribute("data-detail")).style.display = "block";
		}
	}
});