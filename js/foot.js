var libelle_bouton = var_lang == "en" ? "Send" : "Envoyer";
var libelle_bouton_envoye = var_lang == "en" ? "Message sent" : "Message envoyé";

window.addEventListener("load",function(){
	var liste_menu = document.getElementsByClassName("menu");
	for(var i=0;i<liste_menu.length;i++){
		liste_menu[i].onclick = function(event){
			var target = event.target ? event.target : event.srcElement;
			window.location = target.getAttribute("data-href");
		}
	}

	var contact = document.getElementById("contact");
	contact.onclick = function(){
		glasspane();
		document.getElementById("div_contact").style.display = "block";
	}

	document.getElementById("btn_annuler").onclick = function(){
		init_bouton();
		remove_glasspane();
		document.getElementById("div_contact").style.display = "none";	
	}

	document.getElementById("btn_envoyer").onclick = function(){
		if(controle_formulaire(document.getElementById("div_contact"),var_lang)){
			ajax.post("traitement/mail.php",function(){
				document.getElementById("btn_envoyer").innerHTML = libelle_bouton_envoye;
				document.getElementById("btn_envoyer").className = "btn_vert";
			},recuperation_formulaire(document.getElementById("div_contact")));
		}	
	}

	var liste_lang = document.getElementsByClassName("span_lang");
	for (var i = 0; i < liste_lang.length; i++) {
		var lang = liste_lang[i];
		lang.onclick = function(event){
			ajax.post("traitement/lang.php",function(){
				window.location.reload();
			},"lang="+event.target.innerHTML);
		}
	};

	document.getElementById("txt_mail").onfocus = init_bouton;
	document.getElementById("txt_objet").onfocus = init_bouton;
	document.getElementById("txt_message").onfocus = init_bouton;
});

function height(){
	// firefox is ok
	var h = document.documentElement.scrollHeight;	
	// now IE 7 + Opera with "min window"
	if ( document.documentElement.clientHeight > h ) { h  = document.documentElement.clientHeight; }
	// last for safari
	if ( document.body.scrollHeight > h ) { h = document.body.scrollHeight; }

	return h;
}

function init_bouton(){
	document.getElementById("btn_envoyer").innerHTML = libelle_bouton;
	document.getElementById("btn_envoyer").className = "";
}