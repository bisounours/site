<?php
	session_start();
	require_once('./lib/rainTPL/RainTPL.php');

	//Initialisation de l'objet template
	RainTPL::$tpl_dir = "template/"; // template directory
	RainTPL::$cache_dir = "tmp/"; // cache directory
	$template = new RainTPL();

	$titre_appli = "Walot";

	if(isset($_SESSION["lang"])){
		$lang = $_SESSION["lang"];
	}else{
		$lang = "fr";
	}

	$template->assign("lang",$lang);

	if(file_exists('data/compteur.txt'))
	{
		$compteur_f = fopen('data/compteur.txt', 'r+');
		$compte = fgets($compteur_f);
	}else{
		$compteur_f = fopen('data/compteur.txt', 'a+');
		$compte = 0;
	}
	if(!isset($_SESSION['compteur'])){
		$_SESSION['compteur'] = 'visite';
		$compte++;
		fseek($compteur_f, 0);
		fputs($compteur_f, $compte);
	}
	fclose($compteur_f); 
?>