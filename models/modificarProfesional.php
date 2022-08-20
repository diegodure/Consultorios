<?php
	$data = json_decode(file_get_contents("php://input"));
	$idProfesional = $data->{"idProfesionale"};
	$nombre = $data->{"nombre"};
	$apellido = $data->{"apellido"};
	$ci = $data->{"ci"};
	$telefono = $data->{"telefono"};
	
	include("../conect.php");

	$sql = "update Profesionales set Nombres='$nombre', Apellidos='$apellido', Ci='$ci', Telefono='$telefono' where idProfesionale='$idProfesional'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Profesional modificado correctamente!";
    }

	$con->close();
?>s