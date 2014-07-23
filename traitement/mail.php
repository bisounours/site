<?php
	$mail = $_POST["txt_mail"];
	$objet = $_POST["txt_objet"];
	$message = $_POST["txt_message"]; 

	mail("ltolvai@gmail.com",$objet,$message,"From:".$mail);
?>