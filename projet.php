<?php
	require_once("head.php");
	$template->assign("title",$titre_appli." | Projets");
	$template->draw($lang."/projet");
?>