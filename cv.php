<?php
	require_once("head.php");
	$template->assign("title",$titre_appli." | CV");
	$template->draw($lang."/cv");
?>