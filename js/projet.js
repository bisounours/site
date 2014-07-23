window.addEventListener("load",function(){
	var liste_li = document.getElementsByTagName("li");
	for(var i=0;i<liste_li.length;i++){
		var li = liste_li[i];
		li.onclick = function(event){
			var liste_description = document.getElementsByClassName("description");
			for(var j=0;j<liste_description.length;j++){
				var description = liste_description[j];
				description.style.display = "none";
			}
			document.getElementById(event.target.getAttribute("data-href")).style.display = "inline-block";
			document.getElementById("foot").style.top = (height()-pos_foot)+"px";
		}
	}
});