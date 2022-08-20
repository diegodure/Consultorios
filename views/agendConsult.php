<?php
  $data = json_decode(file_get_contents("php://input"));
  include("../conect.php");

  $paciente = $data->{"idPaciente"};
  $profesional = $data->{"profesional"};
  $servicio = $data->{"servicio"};
  $fecha = $data->{"fecha"};
  $time = $data->{"time"};
  $motivo = $data->{"motivo"};
  if(!empty($data->{"observacion"})){
    $observacion = $data->{"observacion"};
  }else{
    $observacion = "";
  }

  include("../conect.php");
        $sql = "insert into Consultas (idConsulta, Servicios_idServicio, Fecha, Hora, Pacientes_idPaciente, Motivo, Observacion Estados_idEstado, Profesionales_idProfesionale) values (null, '$servicio', '$fecha', '$time', '$paciente', '$motivo', '$observacion', 1)";
      $results = $con->query($sql);

  if(!$results){ 
      echo "error";
    }
    else{
      echo "Consulta registrada correctamente!";
    }

  $con->close();
?>