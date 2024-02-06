<?php
	$data = json_decode(file_get_contents("php://input"));
	$idUsuario = $data->{"idUsuario"};
	
	include("../conect.php");

	$sql = "delete from Usuarios where idUsuario='$idUsuario' and Roles_idRol=2";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }else{
    	echo "Profesional eliminado correctamente!";
    }

	$con->close();
?>