<?php

    $data = json_decode(file_get_contents("php://input"));
    $fecha1 = $data->{"fecha1"};
    $fecha2 = $data->{"fecha2"};

    include("../conect.php");

    $sql ="select Consultas.idConsulta, Consultas.Motivo, Resultado.Fecha, Resultado.Indicaciones, Estados.idEstado, Estados.Nombre, Servicios.Nombre as Servicio_nombre, Servicios.Costo as Servicio_costo, Profesionales.Nombres as Profesional_nombre, Profesionales.Apellidos as Profesional_apellido from Resultado inner join Consultas on Resultado.Consultas_idConsulta=Consultas.idConsulta inner join Estados on Consultas.Estados_idEstado=Estados.idEstado inner join Servicios on Consultas.Servicios_idServicio=Servicios.idServicio inner join Profesionales on Consultas.Profesionales_idProfesionale=Profesionales.idProfesionale where Consultas.Fecha >= '$fecha1' and Consultas.Fecha <= '$fecha2'";

    $results = $con->query($sql);

    $rawdata = array();

    $i = 0;

    while($row = mysqli_fetch_array($results)){
        $rawdata[$i] = $row;
        $i++;

    }

    $con->close();

    $myArray = $rawdata;
    echo json_encode($myArray, JSON_UNESCAPED_UNICODE);
?>