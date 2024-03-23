<?php
  $data = json_decode(file_get_contents("php://input"));
  include("../conect.php");

  $idConsulta = $data->{"idConsulta"};
  $paciente = $data->{"idPaciente"};
  $profesional = $data->{"profesional"};
  $servicio = $data->{"servicio"};
  $fecha = $data->{"fecha"};
  $estado = $data->{"estado"};
  $color = $data->{"color"};
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

  $sql = "update Consultas set Servicios_idServicio='$servicio', Fecha='$fecha', Fecha2='$fecha2', Pacientes_idPaciente='$paciente', Motivo='$motivo', Observacion='$observacion', color='$color', Estados_idEstado='$estado', Usuarios_idUsuario='$profesional' where idConsulta='$idConsulta'";
  $results = $con->query($sql);

  if(!$results){ 
    echo "error";
  }
  else{
    echo "Consulta modificada correctamente!";
  }

  $con->close();
?>