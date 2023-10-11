-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-10-2023 a las 21:45:30
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

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
  `rg_cliente` varchar(100) NOT NULL DEFAULT '0',
  `dir_cliente` varchar(100) DEFAULT NULL,
  `tel_cliente` varchar(45) DEFAULT NULL,
  `email_cliente` varchar(45) DEFAULT NULL,
  `ciudad_cliente` varchar(45) DEFAULT NULL,
  `pais_cliente` varchar(45) DEFAULT NULL,
  `fechnac` date DEFAULT NULL,
  `categoria` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nom_cliente`, `dni_cliente`, `rg_cliente`, `dir_cliente`, `tel_cliente`, `email_cliente`, `ciudad_cliente`, `pais_cliente`, `fechnac`, `categoria`) VALUES
(4, 'Jose Alex', '1234567890', '0', 'Zona ruta 146', '987654321', 'alex@mail.com', 'San luis', 'Argentina', '1997-02-13', 'Propietario'),
(5, 'Kumiko Lee', '95739584', '0', 'Jkoslay 3456', '9649275044', 'kumiko@mail.com', 'Los Molles', 'Argentina', '1995-06-15', 'Propietario'),
(6, 'Jose Alex', '93749268', '0', 'Zona ruta 146', '7456340922', 'alex@mail.com', 'San luis', 'Argentina', '1999-11-28', 'Propietario'),
(7, 'Zelada Sara', '38927503', '0', 'Trapiche sin numero', '7345986533', 'zelada@mail.com', 'Trapiche', 'Argentina', '1976-04-30', 'Inquilino'),
(8, 'Luis Lemos', '23456782', '0', 'Las artes 32', '987654321', 'lemos@gmail.com', 'Merlo', 'Argentina', '1999-10-20', 'Propietario'),
(9, 'Zavala Nery', '20476937', '0', 'Volcan 500', '3850284933', 'zavala@mail.com', 'Volcan', 'Argentina', '1973-06-06', 'Locatario'),
(10, 'Gonzalez Juan', '23710155', '0', 'San Martin', '333333333333', 'gj@gmail.com', 'gchu', 'Argentina', '2001-02-14', 'Propietario'),
(11, 'Juan', '1542871', '454545', 'Maipu 160', '2525252525', 'da@gmail.com', 'Gchu', 'Argentina', '1970-01-12', 'Locatario'),
(12, 'Esteban', '52525252', '2222', '9 de julio 20', '25252', 'este@gmail.com', 'San Luis', 'Argentina', '1999-02-15', 'Propietario'),
(13, 'Seba', '1111111', '11111', 'Andrade 741', '11111111', 'and@gmail.com', 'Gchu', 'Argentina', '2000-12-14', 'Propietario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contrato`
--

CREATE TABLE `contrato` (
  `id_contrato` int(11) NOT NULL,
  `tipo_operacion` varchar(45) DEFAULT NULL,
  `fecha_ing` date DEFAULT NULL,
  `fecha_salida` date NOT NULL,
  `fecha_contrato` date NOT NULL,
  `cant_dias` int(11) NOT NULL,
  `valor_total` int(11) NOT NULL,
  `monto_reserva` int(11) NOT NULL,
  `fecha_reserva` date NOT NULL,
  `datos_envio` varchar(250) NOT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `inmueble_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contrato`
--

INSERT INTO `contrato` (`id_contrato`, `tipo_operacion`, `fecha_ing`, `fecha_salida`, `fecha_contrato`, `cant_dias`, `valor_total`, `monto_reserva`, `fecha_reserva`, `datos_envio`, `cliente_id`, `inmueble_id`) VALUES
(1, 'S/D', '2023-10-23', '2023-10-30', '2023-10-03', 7, 5600170, 10000, '2023-10-03', '6565656', 38927503, 10);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id_empleado`, `nom_empleado`, `dni_empleado`, `tel_empleado`, `dir_empleado`, `email_empleado`, `nom_puesto`) VALUES
(1, 'Virginia Nazzas', 22345678, 2147483647, 'Gualeguaychu 1010', 'nazzas@mail.com', 'Jardineria'),
(2, 'Dalila Hu', 34569302, 2147483647, 'Gualeguaychu 2345', 'hu@mail.com', 'Piletero'),
(3, 'Juan', 33333333, 2147483647, 'A25 de Mayo 555', 'gj@gmail.com', 'Administracion'),
(4, 'Pedro', 9999999, 2147483647, '25 de mayo 231', 'nd@gmail.com', 'Piletero'),
(5, 'Pedro', 9999999, 2147483647, '25 de mayo 231', 'pp@gmail.com', 'Maestranza');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotos_prop`
--

CREATE TABLE `fotos_prop` (
  `id_foto` int(11) NOT NULL,
  `image` varchar(50) NOT NULL,
  `inmueble_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `fotos_prop`
--

INSERT INTO `fotos_prop` (`id_foto`, `image`, `inmueble_id`) VALUES
(7, 'img/853e36efd3c24798ad4e4c7b597ce02a.jpg', 10),
(8, 'img/16b9aa720fdf401b843bd76d00c18090.jpg', 10),
(9, 'webapp/static/assets/img/f3ddbd2d246c4f2c9268dfc84', 19);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmueble`
--

CREATE TABLE `inmueble` (
  `id_inmueble` int(11) NOT NULL,
  `dir_inmueble` varchar(100) DEFAULT NULL,
  `ciudad_inmueble` varchar(100) NOT NULL DEFAULT 's/d',
  `num_apto` int(11) NOT NULL DEFAULT 0,
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
  `clave_puerta_ingreso2` varchar(50) NOT NULL DEFAULT 's/d',
  `clave_wifi` varchar(50) NOT NULL,
  `tipo_servicio` varchar(45) DEFAULT 'S/D',
  `cliente_id` int(11) DEFAULT NULL,
  `valor_inmueble` int(11) DEFAULT NULL,
  `exclusividad` tinyint(1) NOT NULL DEFAULT 0,
  `habitac_maxima` int(11) NOT NULL DEFAULT 0,
  `estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inmueble`
--

INSERT INTO `inmueble` (`id_inmueble`, `dir_inmueble`, `ciudad_inmueble`, `num_apto`, `tipo_inmueble`, `tipo_operacion`, `sup_total`, `sup_cubierta`, `sup_semicub`, `cant_plantas`, `cant_dormitorios`, `cant_banos`, `cochera`, `cod_referencia`, `condicion`, `expensas`, `descripcion`, `clave_puerta_ingreso`, `clave_puerta_ingreso2`, `clave_wifi`, `tipo_servicio`, `cliente_id`, `valor_inmueble`, `exclusividad`, `habitac_maxima`, `estado`) VALUES
(10, 'Rawson 34', 's/d', 10, 'Dpto', 'Venta', 500, 250, 50, 3, 2, 2, 1, '12345', 'Muy buena', 1, 'Excelente Ubicacion centrica', '9090', 's/d', '909090', 'Mucama', 5, 800000, 1, 0, 1),
(11, 'Maipu 181', 's/d', 0, 'Casa', 'Alquiler temporario', 680, 400, 20, 1, 3, 2, 0, '1810', 'Muy buena', 0, 'Casa con akjsakjskajak', '4545', 's/d', '45456', 'SD', 4, 1200, 0, 0, 1),
(12, 'Rioja 775', 's/d', 0, 'Casa', 'Alquiler temporario', 200, 150, 1, 2, 3, 2, 1, '7750', 'Muy buena', 0, 'Casa planta alta', '1111', 's/d', '1111', 'Mucama', 8, 600, 1, 0, 1),
(13, 'Andr 500', 'Gchu', 2, 'Apto', 'Alquiler temporario', 2, 2, 2, 2, 2, 2, 1, '222', 'Buena', 0, 'Cccc', 'w', 'w', 'w', 'SD', 13, 232323, 0, 1, 1),
(18, 'Bolivar 34', 'Gchu', 22, 'Apto', 'Alquiler temporario', 2, 2, 2, 2, 2, 2, 0, '222', 'Buena', 0, 'Sffff', 'w', '2', '2', 'SD', 10, 23232, 1, 2, 1),
(19, 'Juny 1000', 'Gchu', 1, 'Casa', 'Venta', 35, 35, 35, 1, 2, 2, 0, '666', 'Buena', 0, 'Enfrente al mar', '1111', '2', '45456', 'Ropa de cama', 5, 32505, 1, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id_servicio` int(11) NOT NULL,
  `tipo_servicio` varchar(45) DEFAULT NULL,
  `valor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  ADD KEY `id_cliente` (`cliente_id`),
  ADD KEY `inmueble_id` (`inmueble_id`);

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
  ADD KEY `id_cliente` (`cliente_id`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id_servicio`),
  ADD KEY `tipo_servicio` (`tipo_servicio`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `contrato`
--
ALTER TABLE `contrato`
  MODIFY `id_contrato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `fotos_prop`
--
ALTER TABLE `fotos_prop`
  MODIFY `id_foto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  MODIFY `id_inmueble` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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
