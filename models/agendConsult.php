<?php
	include("../conect.php");

	$sql = "select Consultas.idConsulta as idConsulta,Consultas.Motivo, Consultas.Fecha as start, Consultas.Fecha2 as end,Consultas.color, Consultas.Observacion, Pacientes.Nombres as title, Pacientes.Apellidos as pacienteApellido, Pacientes.Ci, Pacientes.idPaciente as idPaciente, Profesionales.Nombres, Profesionales.idProfesionale, Profesionales.Apellidos as profesionalApellido, Estados.Nombre as Estado, Estados.idEstado as idEstado, Servicios.Nombre as nombreServicio, Servicios.idServicio as idServicio from Consultas inner join Pacientes on Consultas.Pacientes_idPaciente=Pacientes.idPaciente inner join Profesionales on Consultas.Profesionales_idProfesionale=Profesionales.idProfesionale inner join Estados on Consultas.Estados_idEstado=Estados.idEstado inner join Servicios on Consultas.Servicios_idServicio=Servicios.idServicio";

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