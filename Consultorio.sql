-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 23-03-2024 a las 17:36:15
-- Versión del servidor: 8.0.28
-- Versión de PHP: 8.0.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Consultorio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Consultas`
--

CREATE TABLE `Consultas` (
  `idConsulta` int NOT NULL,
  `Servicios_idServicio` int NOT NULL,
  `Fecha` datetime NOT NULL,
  `Pacientes_idPaciente` int NOT NULL,
  `Motivo` varchar(45) NOT NULL,
  `Observacion` text,
  `Estados_idEstado` int NOT NULL,
  `Fecha2` datetime DEFAULT NULL,
  `color` varchar(45) NOT NULL,
  `Usuarios_idUsuario` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Consultas`
--

INSERT INTO `Consultas` (`idConsulta`, `Servicios_idServicio`, `Fecha`, `Pacientes_idPaciente`, `Motivo`, `Observacion`, `Estados_idEstado`, `Fecha2`, `color`, `Usuarios_idUsuario`) VALUES
(8, 3, '2024-03-27 17:30:00', 3, 'chequeo de rutina', '', 1, '2024-03-27 18:00:00', '#3788d8', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Estados`
--

CREATE TABLE `Estados` (
  `idEstado` int NOT NULL,
  `Nombre` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Estados`
--

INSERT INTO `Estados` (`idEstado`, `Nombre`) VALUES
(1, 'Pendiente'),
(2, 'Realizada'),
(3, 'Cancelada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Generos`
--

CREATE TABLE `Generos` (
  `idGenero` int NOT NULL,
  `Nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Generos`
--

INSERT INTO `Generos` (`idGenero`, `Nombre`) VALUES
(3, 'Masculino'),
(4, 'Femenino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Pacientes`
--

CREATE TABLE `Pacientes` (
  `idPaciente` int NOT NULL,
  `Nombres` varchar(45) NOT NULL,
  `Apellidos` varchar(45) NOT NULL,
  `Ci` varchar(20) NOT NULL,
  `Ciudad` varchar(30) DEFAULT NULL,
  `Barrio` varchar(30) DEFAULT NULL,
  `Telefono` varchar(45) DEFAULT NULL,
  `Generos_idGenero` int NOT NULL,
  `Descripcion` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Pacientes`
--

INSERT INTO `Pacientes` (`idPaciente`, `Nombres`, `Apellidos`, `Ci`, `Ciudad`, `Barrio`, `Telefono`, `Generos_idGenero`, `Descripcion`) VALUES
(3, 'Juan', 'Perez', '15645', '', '', '084521', 3, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Profesionales`
--

CREATE TABLE `Profesionales` (
  `idProfesionale` int NOT NULL,
  `Nombres` varchar(30) NOT NULL,
  `Apellidos` varchar(45) NOT NULL,
  `Ci` varchar(30) NOT NULL,
  `Telefono` varchar(45) NOT NULL,
  `Active` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Resultado`
--

CREATE TABLE `Resultado` (
  `Consultas_idConsulta` int NOT NULL,
  `Fecha` date NOT NULL,
  `Imagen` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Observacion` text,
  `Indicaciones` text NOT NULL,
  `Receta` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Analisis` text,
  `Siguiente_Consulta` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Roles`
--

CREATE TABLE `Roles` (
  `idRol` int NOT NULL,
  `Nombre` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Roles`
--

INSERT INTO `Roles` (`idRol`, `Nombre`) VALUES
(1, 'Administrador'),
(2, 'Profesional'),
(3, 'Recepcionista');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Servicios`
--

CREATE TABLE `Servicios` (
  `idServicio` int NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Descripcion` varchar(45) DEFAULT NULL,
  `Costo` int NOT NULL,
  `Active` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Servicios`
--

INSERT INTO `Servicios` (`idServicio`, `Nombre`, `Descripcion`, `Costo`, `Active`) VALUES
(3, 'Consulta', 'general', 120000, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios`
--

CREATE TABLE `Usuarios` (
  `idUsuario` int NOT NULL,
  `Nombres` varchar(45) NOT NULL,
  `Apellidos` varchar(45) NOT NULL,
  `User` varchar(15) NOT NULL,
  `Pass` varchar(15) NOT NULL,
  `Roles_idRol` int NOT NULL,
  `Ci` varchar(45) NOT NULL,
  `Telefono` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Usuarios`
--

INSERT INTO `Usuarios` (`idUsuario`, `Nombres`, `Apellidos`, `User`, `Pass`, `Roles_idRol`, `Ci`, `Telefono`) VALUES
(5, 'Admin', 'Admin', 'admin', '12345', 1, '45454564', '056456'),
(6, 'Profesional', 'profesional', 'profesional', '12345', 2, '445', '5412'),
(7, 'Recepcionista', 'recepcionista', 'recepcionista', '12345', 3, '5414514', '5132');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Consultas`
--
ALTER TABLE `Consultas`
  ADD PRIMARY KEY (`idConsulta`),
  ADD KEY `fk_Consultas_Servicios1_idx` (`Servicios_idServicio`),
  ADD KEY `fk_Consultas_Pacientes1_idx` (`Pacientes_idPaciente`),
  ADD KEY `fk_Consultas_Estados1_idx` (`Estados_idEstado`),
  ADD KEY `fk_Consultas_Usuarios1_idx` (`Usuarios_idUsuario`);

--
-- Indices de la tabla `Estados`
--
ALTER TABLE `Estados`
  ADD PRIMARY KEY (`idEstado`);

--
-- Indices de la tabla `Generos`
--
ALTER TABLE `Generos`
  ADD PRIMARY KEY (`idGenero`);

--
-- Indices de la tabla `Pacientes`
--
ALTER TABLE `Pacientes`
  ADD PRIMARY KEY (`idPaciente`),
  ADD KEY `fk_Pacientes_Generos_idx` (`Generos_idGenero`);

--
-- Indices de la tabla `Profesionales`
--
ALTER TABLE `Profesionales`
  ADD PRIMARY KEY (`idProfesionale`);

--
-- Indices de la tabla `Resultado`
--
ALTER TABLE `Resultado`
  ADD KEY `fk_table1_Consultas1_idx` (`Consultas_idConsulta`);

--
-- Indices de la tabla `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `Servicios`
--
ALTER TABLE `Servicios`
  ADD PRIMARY KEY (`idServicio`);

--
-- Indices de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `fk_Usuarios_Roles1_idx` (`Roles_idRol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Consultas`
--
ALTER TABLE `Consultas`
  MODIFY `idConsulta` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `Estados`
--
ALTER TABLE `Estados`
  MODIFY `idEstado` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `Generos`
--
ALTER TABLE `Generos`
  MODIFY `idGenero` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `Pacientes`
--
ALTER TABLE `Pacientes`
  MODIFY `idPaciente` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Profesionales`
--
ALTER TABLE `Profesionales`
  MODIFY `idProfesionale` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `Roles`
--
ALTER TABLE `Roles`
  MODIFY `idRol` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `Servicios`
--
ALTER TABLE `Servicios`
  MODIFY `idServicio` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `idUsuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Consultas`
--
ALTER TABLE `Consultas`
  ADD CONSTRAINT `fk_Consultas_Estados1` FOREIGN KEY (`Estados_idEstado`) REFERENCES `Estados` (`idEstado`),
  ADD CONSTRAINT `fk_Consultas_Pacientes1` FOREIGN KEY (`Pacientes_idPaciente`) REFERENCES `Pacientes` (`idPaciente`),
  ADD CONSTRAINT `fk_Consultas_Servicios1` FOREIGN KEY (`Servicios_idServicio`) REFERENCES `Servicios` (`idServicio`),
  ADD CONSTRAINT `fk_Consultas_Usuarios1` FOREIGN KEY (`Usuarios_idUsuario`) REFERENCES `Usuarios` (`idUsuario`);

--
-- Filtros para la tabla `Pacientes`
--
ALTER TABLE `Pacientes`
  ADD CONSTRAINT `fk_Pacientes_Generos` FOREIGN KEY (`Generos_idGenero`) REFERENCES `Generos` (`idGenero`);

--
-- Filtros para la tabla `Resultado`
--
ALTER TABLE `Resultado`
  ADD CONSTRAINT `fk_table1_Consultas1` FOREIGN KEY (`Consultas_idConsulta`) REFERENCES `Consultas` (`idConsulta`);

--
-- Filtros para la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD CONSTRAINT `fk_Usuarios_Roles1` FOREIGN KEY (`Roles_idRol`) REFERENCES `Roles` (`idRol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
