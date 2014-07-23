/* Fichier contenant les fonctions pour les fenetres de dialogue generique */

/* EVENEMENT JS */
/* ========================================================================== */

/* REDEFINITION DE LA FONCTION ALERT */
/* ========================================================================== */
window.alert = function(msg){
    var alert = document.createElement("div");
    alert.id = "div_alert";
    
    var message = document.createElement("span");
    message.innerHTML = msg;
    
    var bouton = document.createElement("button");
    bouton.innerHTML = "OK";
    bouton.onclick = remove_alert;
     
    var td = document.createElement("td");
    var tr = document.createElement("tr");
    var table = document.createElement("table");
    
    td.appendChild(message);
    tr.appendChild(td);
    table.appendChild(tr);
    
    td = document.createElement("td");
    tr = document.createElement("tr");
    
    td.appendChild(bouton);
    tr.appendChild(td);
    table.appendChild(tr);
    
	alert.appendChild(table);
	glasspane();
	document.body.appendChild(alert);
}

function remove_alert(){
	document.getElementById("div_alert").parentNode.removeChild(document.getElementById("div_alert"));
	remove_glasspane();
}

/* REDEFINITION DE LA FONCTION CONFIRM */
/* ========================================================================== */

//ne redefinie pas exactement la fonction confirm
//le systeme d'attente de la reponse (gere par le navigateur) ne peut être reproduit
//creer une fonction confirm prenant trois attribut
//- le message a afficher
//- la valeur du bouton de confirmation
//- la fonction a executer en cas de confirmation
window.confirm = function(msg,nom_btn_ok,fonction_ok){
    var alert = document.createElement("div");
    alert.id = "div_confirm";
    
    var message = document.createElement("span");
    message.innerHTML = msg;
    
    var bouton_ok = document.createElement("button");
    bouton_ok.innerHTML = nom_btn_ok;
    bouton_ok.onclick = fonction_ok;
    
    var bouton_cancel = document.createElement("button");
    bouton_cancel.innerHTML = "Annuler";
    bouton_cancel.onclick = remove_confirm;
    bouton_cancel.className = "btn_gris";
     
    var td = document.createElement("td");
    var tr = document.createElement("tr");
    var table = document.createElement("table");
    
    td.appendChild(message);
    tr.appendChild(td);
    table.appendChild(tr);
    
    td = document.createElement("td");
    tr = document.createElement("tr");
    
    td.appendChild(bouton_cancel);
    td.appendChild(bouton_ok);
    tr.appendChild(td);
    table.appendChild(tr);
    
    alert.appendChild(table);
    glasspane();
    document.body.appendChild(alert);
}

function remove_confirm(){
	document.getElementById("div_confirm").parentNode.removeChild(document.getElementById("div_confirm"));
    remove_glasspane();
}


/* GLASSPANE */
/* ========================================================================== */
function glasspane(){
    var glasspane = document.createElement("div");
    glasspane.id = "glasspane";
    glasspane.style.position = "fixed";
    glasspane.style.width = "100%";
    glasspane.style.height = "100%";
    glasspane.style.margin = "0";
    glasspane.style.padding = "0";
    glasspane.style.top = "0";
    glasspane.style.left = "0";
    glasspane.style.opacity = "0.7";
    glasspane.style.backgroundColor = "black";
    glasspane.style.zIndex = "50";
    document.body.appendChild(glasspane);
}

function remove_glasspane(){
    document.getElementById("glasspane").parentNode.removeChild(document.getElementById("glasspane"));
}