<?php
	function dedoubler($chaine){
		$array = split(",",trim($chaine));
		$array_unique = array_unique($array);
		$chaine_unique = "";
		foreach ($array_unique as $unique) {
			$chaine_unique .= $unique.",";
		}
		return substr($chaine_unique,0,-1);
	}
?>
<html>
	<head>
		<style>
			body{
				font-family: arial;
			}

			#title{
				top:10px;
				text-align: center;
				font-size:25px;
			}

			div{
				position:absolute;
				left:50%;
				width: 50%;
				margin-left: -25%;
				height: 200px;
				top:50px;
			}

			textarea{
				height: 100%;
				width:100%;
			}

			button{
				border: 1px solid;
				padding:7px;
				color: white;
				background: #0B4C5F;
				border-radius: 15px;
			}

			button:hover{
				cursor: pointer;
			}	

		</style>
		<title>Outils de dedoublonnage</title>
	</head>
	<body>
	<div id="title">Outils de dedoublonnage</div>
		<form method="post" action="./unique.php">
			<div>
				<textarea id="txt" name="txt" placeholder="Coller ici votre liste d'item s&eacute;par&eacute;s par des virgules "><?php if(isset($_POST["txt"])){echo trim($_POST["txt"]);} ?></textarea>
				<p>
					<center>
						<button type="submit">Dedoublonner</button>
					</center>
				</p>
				<?php
					if(isset($_POST["txt"])){
						echo "Liste avec item unique : ".dedoubler($_POST["txt"]);
					}
				?>
			</div>
		</form>
	</body>
</html>