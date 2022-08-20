<?php
	$data = json_decode(file_get_contents("php://input"));
	$idProfesional = $data->{"idProfesional"};
	
	include("../conect.php");

	$sql = "update Profesionales set Active='1' where idProfesionale='$idProfesional'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }else{
    	echo "Profesional eliminado correctamente!";
    }

	$con->close();
?>