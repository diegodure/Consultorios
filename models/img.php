<?php
	foreach ($_FILES as $archivo) {
		$nombre = $_FILES['file']["name"];
		print($nombre);
		$datos = base64_encode(file_get_contents($_FILES['file']['tmp_name']));
		print($datos);
	}
	

	//$con->close();

?>