<?php

	include("../conect.php");

	$sql = "select Servicios.idServicio, Servicios.Nombre, Servicios.Descripcion, Servicios.Costo from Servicios";
	
	$results = $con->query($sql);

	$rawdata = array();

	$i = 0;


	if (!$results) {
   		echo "error";
	}else{
		while ($row = mysqli_fetch_array($results)) {
			$rawdata[$i] = $row;
			$i++;

		}
		$myArray = $rawdata;
		echo json_encode($myArray, JSON_UNESCAPED_UNICODE);
	}
	$con->close();

?>