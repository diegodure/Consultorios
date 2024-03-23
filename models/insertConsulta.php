<?php
  $data = json_decode(file_get_contents("php://input"));
  include("../conect.php");

  $paciente = $data->{"idPaciente"};
  $profesional = $data->{"profesional"};
  $servicio = $data->{"servicio"};
  $fecha = $data->{"fecha"};
  if(!empty($data->{"fecha2"})){
    $fecha2 = $data->{"fecha2"};
  }else{
    $fecha2 = "";
  }
  $motivo = $data->{"motivo"};
  if(!empty($data->{"observacion"})){
    $observacion = $data->{"observacion"};
  }else{
    $observacion = "";
  }
  
  $sql = "insert into Consultas (idConsulta, Servicios_idServicio, Fecha, Fecha2, Pacientes_idPaciente, Motivo, Observacion, color, Estados_idEstado, Usuarios_idUsuario) values (null, '$servicio', '$fecha', '$fecha2', '$paciente', '$motivo', '$observacion', '#3788d8', '1','$profesional')";
  $results = $con->query($sql);

  if(!$results){ 
      echo "error";
    }
    else{
      echo "Consulta registrada correctamente!";
    }

  $con->close();
?>