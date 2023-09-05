<?php
	$data = json_decode(file_get_contents("php://input"));
	$id = $data->{"id"};

	//echo $id;
	
	include("../conect.php");

	$sql = "select Resultado.Fecha, Resultado.Observacion, Resultado.Indicaciones, Consultas.idConsulta, Consultas.Motivo from Resultado inner join Consultas on Resultado.Consultas_idConsulta=Consultas.idConsulta where Consultas.Pacientes_idPaciente='$id'";
	$results = $con->query($sql);

	$rawdata = array();

	$i = 0;

	while ($row = mysqli_fetch_array($results)) {
		$rawdata[$i] = $row;
		$i++;

	}


	$con->close();

	$myArray = $rawdata;
	echo json_encode($myArray, JSON_UNESCAPED_UNICODE);
?>