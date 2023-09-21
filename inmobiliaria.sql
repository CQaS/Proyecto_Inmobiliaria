-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-09-2023 a las 19:36:32
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inmobiliaria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nom_cliente` varchar(70) DEFAULT NULL,
  `dni_cliente` varchar(45) DEFAULT NULL,
  `dir_cliente` varchar(100) DEFAULT NULL,
  `tel_cliente` varchar(45) DEFAULT NULL,
  `email_cliente` varchar(45) DEFAULT NULL,
  `ciudad_cliente` varchar(45) DEFAULT NULL,
  `pais_cliente` varchar(45) DEFAULT NULL,
  `fechnac` date DEFAULT NULL,
  `categoria` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nom_cliente`, `dni_cliente`, `dir_cliente`, `tel_cliente`, `email_cliente`, `ciudad_cliente`, `pais_cliente`, `fechnac`, `categoria`) VALUES
(4, 'Jose Alex', '1234567890', 'Zona ruta 146', '987654321', 'alex@mail.com', 'San luis', 'Argentina', '1997-02-13', 'Propietario'),
(5, 'Kumiko Lee', '95739584', 'Jkoslay 3456', '9649275044', 'kumiko@mail.com', 'Los Molles', 'Argentina', '1995-06-15', 'Propietario'),
(6, 'Jose Alex', '93749268', 'Zona ruta 146', '7456340922', 'alex@mail.com', 'San luis', 'Argentina', '1999-11-28', 'Propietario'),
(7, 'Zelada Sara', '38927503', 'Trapiche sin numero', '7345986533', 'zelada@mail.com', 'Trapiche', 'Argentina', '1976-04-30', 'Inquilino'),
(8, 'Luis Lemos', '23456782', 'Las artes 32', '987654321', 'lemos@gmail.com', 'Merlo', 'Argentina', '1999-10-20', 'Propietario'),
(9, 'Zavala Nery', '20476937', 'Volcan 500', '3850284933', 'zavala@mail.com', 'Volcan', 'Argentina', '1973-06-06', 'Locatario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contrato`
--

CREATE TABLE `contrato` (
  `id_contrato` int(11) NOT NULL,
  `tipo_operacion` varchar(45) DEFAULT NULL,
  `fecha_ing` date DEFAULT NULL,
  `fecha_salida` date NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `valor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id_empleado` int(11) NOT NULL,
  `nom_empleado` varchar(70) DEFAULT NULL,
  `dni_empleado` int(11) NOT NULL,
  `tel_empleado` int(11) NOT NULL,
  `dir_empleado` varchar(100) NOT NULL,
  `email_empleado` varchar(45) NOT NULL,
  `nom_puesto` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id_empleado`, `nom_empleado`, `dni_empleado`, `tel_empleado`, `dir_empleado`, `email_empleado`, `nom_puesto`) VALUES
(1, 'Virginia Nazzas', 22345678, 2147483647, 'Gualeguaychu 1010', 'nazzas@mail.com', 'Jardineria'),
(2, 'Dalila Hu', 34569302, 2147483647, 'Gualeguaychu 2345', 'hu@mail.com', 'Piletero');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotos_prop`
--

CREATE TABLE `fotos_prop` (
  `id_foto` int(11) NOT NULL,
  `image` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `inmueble_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `fotos_prop`
--

INSERT INTO `fotos_prop` (`id_foto`, `image`, `inmueble_id`) VALUES
(7, 'img/853e36efd3c24798ad4e4c7b597ce02a.jpg', 10),
(8, 'img/16b9aa720fdf401b843bd76d00c18090.jpg', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmueble`
--

CREATE TABLE `inmueble` (
  `id_inmueble` int(11) NOT NULL,
  `dir_inmueble` varchar(100) DEFAULT NULL,
  `tipo_inmueble` varchar(25) DEFAULT NULL,
  `tipo_operacion` varchar(45) DEFAULT NULL,
  `sup_total` int(11) DEFAULT NULL,
  `sup_cubierta` int(11) DEFAULT NULL,
  `sup_semicub` int(11) DEFAULT NULL,
  `cant_plantas` int(11) DEFAULT NULL,
  `cant_dormitorios` int(11) DEFAULT NULL,
  `cant_banos` int(11) DEFAULT NULL,
  `cochera` tinyint(1) NOT NULL DEFAULT 0,
  `cod_referencia` varchar(50) DEFAULT NULL,
  `condicion` varchar(50) NOT NULL,
  `expensas` tinyint(1) NOT NULL DEFAULT 0,
  `descripcion` varchar(200) DEFAULT NULL,
  `clave_puerta_ingreso` varchar(50) NOT NULL,
  `clave_wifi` varchar(50) NOT NULL,
  `tipo_servicio` varchar(45) DEFAULT 'S/D',
  `cliente_id` int(11) DEFAULT NULL,
  `valor_inmueble` int(11) DEFAULT NULL,
  `exclusividad` tinyint(1) NOT NULL DEFAULT 0,
  `estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `inmueble`
--

INSERT INTO `inmueble` (`id_inmueble`, `dir_inmueble`, `tipo_inmueble`, `tipo_operacion`, `sup_total`, `sup_cubierta`, `sup_semicub`, `cant_plantas`, `cant_dormitorios`, `cant_banos`, `cochera`, `cod_referencia`, `condicion`, `expensas`, `descripcion`, `clave_puerta_ingreso`, `clave_wifi`, `tipo_servicio`, `cliente_id`, `valor_inmueble`, `exclusividad`, `estado`) VALUES
(10, 'Rawson 34', 'Dpto', 'Venta', 500, 250, 50, 3, 2, 2, 1, '12345', 'Muy buena', 1, 'Excelente Ubicacion centrica', '9090', '909090', 'Mucama', 5, 800000, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id_servicio` int(11) NOT NULL,
  `tipo_servicio` varchar(45) DEFAULT NULL,
  `valor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `contrato`
--
ALTER TABLE `contrato`
  ADD PRIMARY KEY (`id_contrato`),
  ADD UNIQUE KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id_empleado`);

--
-- Indices de la tabla `fotos_prop`
--
ALTER TABLE `fotos_prop`
  ADD PRIMARY KEY (`id_foto`);

--
-- Indices de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  ADD PRIMARY KEY (`id_inmueble`),
  ADD UNIQUE KEY `id_cliente` (`cliente_id`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id_servicio`),
  ADD UNIQUE KEY `tipo_servicio` (`tipo_servicio`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `contrato`
--
ALTER TABLE `contrato`
  MODIFY `id_contrato` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `fotos_prop`
--
ALTER TABLE `fotos_prop`
  MODIFY `id_foto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  MODIFY `id_inmueble` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id_servicio` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `inmueble`
--
ALTER TABLE `inmueble`
  ADD CONSTRAINT `inmueble_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id_cliente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
