/*
	Fichier contenant des fonctions utiles dans le traitement 
	des formulaires.
*/

var alert_fr = {
				"integer":" doit être un nombre entier",
				"double":" doit être un nombre<br>Exemple : 1.25, 2, 4.1",
				"date":" doit être saisie sous la forme JJ/MM/AAAA",
				"mail":" doit être saisie sous la forme ...@...",
				"hour":" doit être un nombre compris entre 00 et 23",
				"minute":" doit être un nombre compris entre 00 et 59",
				"nullable":" est obligatoire"
			}

var alert_en = {
				"integer":" must be an integer",
				"double":" must be a number<br>Example : 1.25, 2, 4.1",
				"date":" must be entered as JJ/MM/AAAA",
				"mail":" must be entered as ...@...",
				"hour":" must be a number between 00 and 23",
				"minute":" must be a number between 00 and 59",
				"nullable":" is required"
				}

//Fonction permettant la recuperation des inputs des éléments HTML sous forme name = valeur
//Utile dans l'envoie d'un formulaire en ajax
function recuperation_formulaire(formulaire){
	var argument = "";
	var liste_input = formulaire.getElementsByTagName("input");
	for(var i=0;i < liste_input.length;i++){
		var input = liste_input[i];
		switch(input.type){
			case "text" :	
				argument += input.name + "=" + input.value.trim() + "&";
				break;
			case "hidden" :	
				argument += input.name + "=" + input.value.trim() + "&";
				break;
			case "checkbox":
				if(input.checked){
					if(input.value != ""){
						argument += input.name + "=" + input.value.trim() + "&";
					}else{
						argument += input.name + "=" + input.checked + "&";
					}
				}	
				break;
			case "radio":
				if(input.checked){
					if(input.value != ""){
						argument += input.name + "=" + input.value.trim() + "&";
					}else{
						argument += input.name + "=" + input.checked + "&";
					}
				}
				break;
			case "password" :	
				argument += input.name + "=" + input.value.trim() + "&";
				break;
		}
	}
	var liste_select = formulaire.getElementsByTagName("select");
	for(var i=0;i < liste_select.length;i++){
		var select = liste_select[i];
		if(select.multiple){
			var liste_option = "";
		    for(j=0;j<select.options.length;j++)
		    { 
		        if (select.options[j].selected)
		        { 
		            liste_option += select.options[j].value + ",";
		        }
		    }
		    argument += select.name + "=" + liste_option + "&";
		}else{
		    var val = select.value != "WONoSelectionString" ? select.value : ""; 
			argument += select.name + "=" + val + "&";
		}
	}
	var liste_textarea = formulaire.getElementsByTagName("textarea");
	for(var i=0;i < liste_textarea.length;i++){
		var textarea = liste_textarea[i];
		argument += textarea.name + "=" + textarea.value + "&";
	}
	argument = argument.substr(0,argument.length -1);
	return argument;
}

//Fonction controlant les elements inputs d'un element html en fonction de l'attribut data
function controle_formulaire(formulaire,langue){
	var liste_input = formulaire.getElementsByTagName("input");

	var alerte = langue == "en" ? alert_en : alert_fr;
	for(var i=0;i < liste_input.length;i++){
		var input = liste_input[i];
		switch(input.getAttribute("data-type")){
			case "string" :	
				
				break;
			case "integer" :	
				if(input.value.trim() != "" && !controle_integer(input.value)){
					alert(input.getAttribute("data-label") + alerte.integer);
					return false;
				}
				break;
			case "double":
				if(input.value.trim() != "" && !controle_double(input.value)){
					alert(input.getAttribute("data-label") + alerte.double);
					return false;
				}	
				break;
			case "date":
				if(input.value.trim() != "" && !controle_date(input.value)){
					alert(input.getAttribute("data-label") + alerte.date);
					return false;
				}
				break;
			case "mail" :	
				if(input.value.trim() != "" && !controle_mail(input.value)){
					alert(input.getAttribute("data-label") + alerte.mail);
					return false;
				}
				break;
			case "hour" :    
                if(input.value.trim() != "" && !controle_hour(input.value)){
                    alert(input.getAttribute("data-label") + alerte.hour);
                    return false;
                }
                break;
            case "minute" :   
                if(input.value.trim() != "" && !controle_minute(input.value)){
                    alert(input.getAttribute("data-label") + alerte.minute);
                    return false;
                }
                break;
		}
		if(input.type != "checkbox" && input.type != "radio" && !input.getAttribute("data-nullable") && document.defaultView.getComputedStyle(input,null).display != "none" && document.defaultView.getComputedStyle(input,null).visibility != "hidden" && input.value.trim() == ""){
            alert(input.getAttribute("data-label") + alerte.nullable);
            return false;
        }

		try{
			var input_equal = document.getElementById(input.getAttribute("data-equal"));
			if(input.value != input_equal.value){
				alert(input.getAttribute("data-label") +" et "+input_equal.getAttribute("data-label")+" doivent être identiques");
				return false;
			}
        }catch(err){
        }
        
        try{
            var input_link_required = document.getElementById(input.getAttribute("data-link-required"));
            if(input_link_required.value.trim() != "" && input.value.trim() == ""){
                alert(input.getAttribute("data-label")+" doit renseigné(e) lorsque "+input_link_required.getAttribute("data-label")+" est renseigné(e)");
                return false;
            }
        }catch(err){
        }
            
        try{
		    var input_link_nullable = document.getElementById(input.getAttribute("data-link-nullable"));
		    if(input.value.trim() != "" && input_link_nullable.value.trim() == ""){
		        alert(input.getAttribute("data-label")+" ne peut être renseigné(e) que si "+input_link_nullable.getAttribute("data-label")+" est renseigné(e)");
		        return false;
		    }
        }catch(err){
        }
	}
	var liste_textarea = formulaire.getElementsByTagName("textarea");
	for(var i=0;i < liste_textarea.length;i++){
		var textarea = liste_textarea[i];
		if(!textarea.getAttribute("data-nullable") && document.defaultView.getComputedStyle(textarea,null).display != "none" && document.defaultView.getComputedStyle(textarea,null).visibility != "hidden" && textarea.value.trim() == ""){
            alert(textarea.getAttribute("data-label") + alerte.nullable);
            return false;
        }
	}
	return true;
}


//Fonction de controle des champs de type double
function controle_double(value){
	var regex = new RegExp("^[0-9]{1,}[.,]{0,1}[0-9]*$");
	return regex.test(value);
}

//Fonction de controle des champs de type integer
function controle_integer(value){
	var regex = new RegExp("^[0-9]{1,}$");
	return regex.test(value);
}

//Fonction de controle des champs de type date
function controle_date(value){
	var regex = new RegExp("^[0-9]{2}/[0-9]{2}/[0-9]{4}$");
	return regex.test(value);
}

//Fonction de controle des champs de type mail
function controle_mail(value){
	var regex = new RegExp("^.+@.+$");
	return regex.test(value);
}

//Fonction de controle des champs de type mail
function controle_hour(value){
    var regex = new RegExp("^[0-2][0-9]$");
    return regex.test(value);
}

//Fonction de controle des champs de type mail
function controle_minute(value){
    var regex = new RegExp("^[0-5][0-9]$");
    return regex.test(value);
}