<?php
	$data = json_decode(file_get_contents("php://input"));
	$idServicio = $data->{"idServicio"};
	
	include("../conect.php");

	$sql = "update Servicios set Active='1' where idServicio='$idServicio'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }else{
    	echo "Servicio eliminado correctamente!";
    }

	$con->close();
?>