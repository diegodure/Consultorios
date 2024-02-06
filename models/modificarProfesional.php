<?php
	$data = json_decode(file_get_contents("php://input"));
	$idUsuario = $data->{"idUsuario"};
	$nombre = $data->{"nombre"};
	$apellido = $data->{"apellido"};
	$user = $data->{"user"};
	$pass = $data->{"pass"};
	$ci = $data->{"ci"};
	$telefono = $data->{"telefono"};
	
	include("../conect.php");

	$sql = "update Usuarios set Nombres='$nombre', Apellidos='$apellido', User='$user', Pass='$pass', Ci='$ci', Telefono='$telefono' where idUsuario='$idUsuario' and Roles_idRol=2";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Profesional modificado correctamente!";
    }

	$con->close();
?>s