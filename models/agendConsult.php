<?php
	include("../conect.php");

	$sql = "select Consultas.Motivo as title, Consultas.Fecha as start, Pacientes.Nombres, Profesionales.Nombres from Consultas inner join Pacientes on Consultas.Pacientes_idPaciente=Pacientes.idPaciente inner join Profesionales on Consultas.Profesionales_idProfesionale=Profesionales.idProfesionale";

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