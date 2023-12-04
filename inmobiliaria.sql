-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-12-2023 a las 23:01:24
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

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
-- Estructura de tabla para la tabla `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add user', 7, 'add_user'),
(26, 'Can change user', 7, 'change_user'),
(27, 'Can delete user', 7, 'delete_user'),
(28, 'Can view user', 7, 'view_user'),
(29, 'Can add inmueble', 8, 'add_inmueble'),
(30, 'Can change inmueble', 8, 'change_inmueble'),
(31, 'Can delete inmueble', 8, 'delete_inmueble'),
(32, 'Can view inmueble', 8, 'view_inmueble'),
(33, 'Can add fotos', 9, 'add_fotos'),
(34, 'Can change fotos', 9, 'change_fotos'),
(35, 'Can delete fotos', 9, 'delete_fotos'),
(36, 'Can view fotos', 9, 'view_fotos'),
(37, 'Can add clientes', 10, 'add_clientes'),
(38, 'Can change clientes', 10, 'change_clientes'),
(39, 'Can delete clientes', 10, 'delete_clientes'),
(40, 'Can view clientes', 10, 'view_clientes'),
(41, 'Can add empleados', 11, 'add_empleados'),
(42, 'Can change empleados', 11, 'change_empleados'),
(43, 'Can delete empleados', 11, 'delete_empleados'),
(44, 'Can view empleados', 11, 'view_empleados'),
(45, 'Can add contrato', 12, 'add_contrato'),
(46, 'Can change contrato', 12, 'change_contrato'),
(47, 'Can delete contrato', 12, 'delete_contrato'),
(48, 'Can view contrato', 12, 'view_contrato');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$600000$KTStVKJ3Mc6C4nwNQ8wo0Q$Hv07KmW8DVS6eaWURyV5hdvHz3Fm5G8qHtga8UdJ/Jw=', NULL, 1, 'vnazzar', '', '', 'vnazzar@hotmail.com', 1, 1, '2023-11-14 18:32:19.230345'),
(2, 'pbkdf2_sha256$600000$Cxm0df7Kx49bH7qiiq3VQh$u6mmG2U9GFEwspD9TRP3zrOeEYxb9xKrdD+h4phrWMI=', '2023-11-30 13:44:50.466142', 1, 'mvnazzar', '', '', 'vnnaaa@hotmail.com', 1, 1, '2023-11-17 16:42:41.519525');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Estructura de tabla para la tabla `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(10, 'service', 'clientes'),
(12, 'service', 'contrato'),
(11, 'service', 'empleados'),
(9, 'service', 'fotos'),
(8, 'service', 'inmueble'),
(6, 'sessions', 'session'),
(7, 'webapp', 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2023-11-11 19:34:28.005908'),
(2, 'auth', '0001_initial', '2023-11-11 19:34:28.216915'),
(3, 'admin', '0001_initial', '2023-11-11 19:34:28.270920'),
(4, 'admin', '0002_logentry_remove_auto_add', '2023-11-11 19:34:28.280919'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2023-11-11 19:34:28.289929'),
(6, 'contenttypes', '0002_remove_content_type_name', '2023-11-11 19:34:28.339946'),
(7, 'auth', '0002_alter_permission_name_max_length', '2023-11-11 19:34:28.372909'),
(8, 'auth', '0003_alter_user_email_max_length', '2023-11-11 19:34:28.386909'),
(9, 'auth', '0004_alter_user_username_opts', '2023-11-11 19:34:28.395909'),
(10, 'auth', '0005_alter_user_last_login_null', '2023-11-11 19:34:28.418928'),
(11, 'auth', '0006_require_contenttypes_0002', '2023-11-11 19:34:28.420909'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2023-11-11 19:34:28.429944'),
(13, 'auth', '0008_alter_user_username_max_length', '2023-11-11 19:34:28.441909'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2023-11-11 19:34:28.455922'),
(15, 'auth', '0010_alter_group_name_max_length', '2023-11-11 19:34:28.468909'),
(16, 'auth', '0011_update_proxy_permissions', '2023-11-11 19:34:28.482936'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2023-11-11 19:34:28.494911'),
(18, 'sessions', '0001_initial', '2023-11-11 19:34:28.511917');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('cgrr06n4vpg0ykfww11dmdqewc0e0fco', '.eJxVjDsOwjAQBe_iGlnrTeQPJT1nsHb9wQFkS3FSIe4OllJA-2bmvYSnfSt-72n1SxRngeL0uzGFR6oDxDvVW5Oh1W1dWA5FHrTLa4vpeTncv4NCvYxaMyq0rHhWqA0aUDkaJALrOGtnsgnJgZ1ynOCrAOkUAs1RGcgpgHh_AM5eN7w:1r5UzB:pxoMIvnLJKAPXBwb2uGbgJDH3-nI-zzIRdarJsmqyfM', '2023-12-05 17:56:33.664488'),
('cgt9dxxdh5lr4qkyvhkstc0ddeyuw5jx', '.eJxVjDsOwjAQBe_iGlnrTeQPJT1nsHb9wQFkS3FSIe4OllJA-2bmvYSnfSt-72n1SxRngeL0uzGFR6oDxDvVW5Oh1W1dWA5FHrTLa4vpeTncv4NCvYxaMyq0rHhWqA0aUDkaJALrOGtnsgnJgZ1ynOCrAOkUAs1RGcgpgHh_AM5eN7w:1r5tRn:L8UgIUC5EtWg1Vlguc3OLoWy2gV_TD5c0xhrtN9x9jU', '2023-12-06 20:03:43.740763'),
('u6fzf0u27zjct8utum9wrcqbwweqm9dq', '.eJxVjDsOwjAQBe_iGlnrTeQPJT1nsHb9wQFkS3FSIe4OllJA-2bmvYSnfSt-72n1SxRngeL0uzGFR6oDxDvVW5Oh1W1dWA5FHrTLa4vpeTncv4NCvYxaMyq0rHhWqA0aUDkaJALrOGtnsgnJgZ1ynOCrAOkUAs1RGcgpgHh_AM5eN7w:1r4QO3:jYdl0LLxkNOWq6hwui5eTVIJLaz9y2xlwFK8spgUuRU', '2023-12-02 18:49:47.536487'),
('xjarq8t7l29c4evtqej2nxtq4l3pqq0i', '.eJxVjDsOwjAQBe_iGlnrTeQPJT1nsHb9wQFkS3FSIe4OllJA-2bmvYSnfSt-72n1SxRngeL0uzGFR6oDxDvVW5Oh1W1dWA5FHrTLa4vpeTncv4NCvYxaMyq0rHhWqA0aUDkaJALrOGtnsgnJgZ1ynOCrAOkUAs1RGcgpgHh_AM5eN7w:1r8hLW:H3q6iwkOpYNSX0PZJ6k4QfPB73jCY0XRslhS-zA1TY0', '2023-12-14 13:44:50.468143');

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
  `image` varchar(250) NOT NULL,
  `inmueble_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `fotos_prop`
--

INSERT INTO `fotos_prop` (`id_foto`, `image`, `inmueble_id`) VALUES
(14, 'webapp/static/assets/img/8ba06c5c724148b4ba7c7fe63523ef10.jpg', 22),
(15, 'webapp/static/assets/img/ea7328bf1f2f45a799f452cb7ac7952a.jpg', 22),
(16, 'webapp/static/assets/img/c2f4f127192a44e2b46afd853c03de9c.jpg', 23),
(17, 'webapp/static/assets/img/15d1bf76a8ed4359ad8e4670ceebaf73.jpg', 24),
(18, 'webapp/static/assets/img/111b9d26d690493ba38e2cc0c69110de.jpg', 25),
(19, 'webapp/static/assets/img/c735f56141c54cb2ba87c2ab003ea2a9.jpg', 26),
(20, 'webapp/static/assets/img/43c13b7f540d4777a769a781fb2b0ede.jpg', 27),
(21, 'webapp/static/assets/img/79b2ca95679c4164bf0d0c09d151dd23.jpg', 27),
(22, 'webapp/static/assets/img/597f877a0b7440f896c87e53ac498cec.jpeg', 28),
(23, 'webapp/static/assets/img/53fb56a93e79471ca7609f8b19493681.jpg', 28),
(24, 'webapp/static/assets/img/611a82fbe66b40babb147b56d3ab324f.jpg', 29),
(25, 'webapp/static/assets/img/fb76e83a50444963a91cbfe0285b5767.jpg', 29),
(26, 'webapp/static/assets/img/0682b9edb0034e118ac93df3bcc3a0f1.jpg', 29),
(27, 'webapp/static/assets/img/256e180df186452f893e25cf6626ad04.jpg', 29),
(28, 'webapp/static/assets/img/297677040a534935982cc3f96a28c26a.jpg', 29),
(29, 'webapp/static/assets/img/a95d6146d4eb432ab5989927e05c9ea5.jpg', 29),
(30, 'webapp/static/assets/img/ec8c0c1f4b8b4932bba60ff9d45460aa.jpg', 29),
(31, 'webapp/static/assets/img/df54f6c51478423aae51a3b5eb164a67.jpeg', 29),
(32, 'webapp/static/assets/img/b778d808b63745aea1db9d607167b7f6.jpeg', 29),
(33, 'webapp/static/assets/img/397a4d9623af4559b44acfb9f0b55ada.jpg', 30),
(34, 'webapp/static/assets/img/71f6d8c2f14945728949a22e756cf32d.jpg', 31),
(35, 'webapp/static/assets/img/66cbff7af40947748760ccc82c03b9fe.jpg', 31),
(36, 'webapp/static/assets/img/2eeb41e4fe484f158acaac89301de298.jpg', 31),
(37, 'webapp/static/assets/img/0b69b2e4e50443fa969781dd576b32c3.jpg', 32),
(38, 'webapp/static/assets/img/7591e35c546d438f95e3fec90f29d9c9.jpeg', 32),
(39, 'webapp/static/assets/img/698cfef338ba4e318790014998dd9bf9.jpeg', 32),
(40, 'webapp/static/assets/img/8b5a606819a14bba93c321de260bbb07.jpeg', 33),
(41, 'webapp/static/assets/img/d8d6fedb740e4dae9c5c6f2545a1270f.jpg', 34),
(42, 'webapp/static/assets/img/558d59bfd1f2463e970b5f5c0090727b.jpg', 34),
(43, 'webapp/static/assets/img/06178cf4f4fb4cbb90720a6cb36d08f2.jpg', 34),
(44, 'webapp/static/assets/img/a9c88e6f45ac47128e790ca2aee88e68.jpg', 35),
(45, 'webapp/static/assets/img/b91868e6413845cf92b318cedd698870.jpg', 36),
(46, 'webapp/static/assets/img/c86bc86e01e54554b278997c0c86558c.jpeg', 37),
(47, 'webapp/static/assets/img/4bc9142fe8054a189d21ba276c84b5fc.jpg', 38);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmueble`
--

CREATE TABLE `inmueble` (
  `id_inmueble` int(11) NOT NULL,
  `dir_inmueble` varchar(100) DEFAULT NULL,
  `bloco_inmueble` varchar(100) NOT NULL,
  `barrio_inmueble` varchar(100) NOT NULL,
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
  `cochera_rotativa` tinyint(4) NOT NULL,
  `cod_referencia` varchar(50) DEFAULT NULL,
  `condicion` varchar(50) NOT NULL,
  `expensas` tinyint(1) NOT NULL DEFAULT 0,
  `descripcion` varchar(200) DEFAULT NULL,
  `clave_puerta_ingreso` varchar(50) NOT NULL,
  `clave_puerta_ingreso2` varchar(50) NOT NULL DEFAULT 's/d',
  `clave_wifi` varchar(50) NOT NULL,
  `nombre_red` varchar(100) NOT NULL,
  `tipo_servicio` varchar(45) DEFAULT 'S/D',
  `cliente_id` int(11) DEFAULT NULL,
  `valor_inmueble` int(11) DEFAULT NULL,
  `exclusividad` tinyint(1) NOT NULL DEFAULT 0,
  `habitac_maxima` int(11) NOT NULL DEFAULT 0,
  `estado` int(11) DEFAULT 1,
  `latitud` varchar(100) NOT NULL DEFAULT '0.00000000000000',
  `longitud` varchar(100) NOT NULL DEFAULT '0.00000000000000'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inmueble`
--

INSERT INTO `inmueble` (`id_inmueble`, `dir_inmueble`, `bloco_inmueble`, `barrio_inmueble`, `ciudad_inmueble`, `num_apto`, `tipo_inmueble`, `tipo_operacion`, `sup_total`, `sup_cubierta`, `sup_semicub`, `cant_plantas`, `cant_dormitorios`, `cant_banos`, `cochera`, `cochera_rotativa`, `cod_referencia`, `condicion`, `expensas`, `descripcion`, `clave_puerta_ingreso`, `clave_puerta_ingreso2`, `clave_wifi`, `nombre_red`, `tipo_servicio`, `cliente_id`, `valor_inmueble`, `exclusividad`, `habitac_maxima`, `estado`, `latitud`, `longitud`) VALUES
(30, 'Espana 25', '', '', 'Gchu', 10, 'Casa', 'Alquiler temporario', 150, 10, 10, 2, 2, 2, 1, 0, '2344', 'Muy buena', 0, 'Prueba', 'q', 'q', 'q', '', 'Ropa de cama', 6, 100000, 1, 2, 1, '-33.020098342812894', '-58.519648205001445'),
(31, 'Urquiza 1070', '', '', 'Gchu', 0, 'Casa', 'Alquiler temporario', 150, 70, 0, 2, 2, 2, 0, 0, '369', 'Muy buena', 0, 'Estamos probando', 'q', 'q', 'q', '', 'Ropa de cama, Mucama', 4, 852366, 1, 4, 1, '-33.01577567702897', '-58.51965308189392'),
(32, 'España 420', '', '', 'Gchu', 105, 'Apart', 'Alquiler temporario', 120, 0, 0, 2, 2, 1, 0, 0, '587', 'Muy buena', 0, 'Esta es otra propiedad de prueba', 'q', 'q', 'q', '', 'WI-FI, Ropa de cama', 4, 5874695, 1, 5, 1, '-33.02151932708696', '-58.51924636117475'),
(33, 'Ruta 14 km 250', '', '', 'Gchu', 0, 'Otros', 'Venta', 40000, 0, 0, 0, 0, 0, 0, 0, '2574', 'Muy buena', 0, 'Campo', '0', '0', '0', '', 'SD', 12, 250000, 1, 0, 1, '-33.00772738521005', '-58.55207269603853'),
(34, 'Magnasco 643', '', '', 'Gualeguaychu', 0, 'Casa', 'Venta', 200, 120, 0, 1, 2, 1, 1, 0, '643', 'Buena', 0, 'Casucha', '0', '0', '0', '', 'SD', 12, 120000, 1, 4, 1, '-33.02336338830253', '-58.49745707018884'),
(35, 'Ayacucho 120', '', '', 'Gualeguaychu', 10, 'Departamento', 'Venta', 44444, 44, 44, 4, 1, 1, 0, 0, 'jkjkj', 'Muy buena', 0, 'probando', '0', '0', '0', '', 'SD', 10, 1000000, 1, 10, 1, '-27.15982337628752', '-48.5075014570202'),
(36, 'Luis N Palma 1965', '', '', 'Gualeguaychu', 0, 'Oficina', 'Alquiler permanente', 120, 100, 0, 1, 0, 1, 1, 0, '1965', 'Buena', 0, 'Oficina', '2020', '0', 'Oficina21', '', 'WI-FI', 13, 80000, 0, 0, 1, '-27.15982337628752', '-48.5075014570202'),
(37, 'Galarza 776', '', '', 'Concepcion del Uruguay', 0, 'Otros', 'Alquiler permanente', 100, 90, 0, 1, 0, 1, 0, 0, '776', 'Buena', 0, 'Heladeria Bahillo', '0', '0', '0', '', 'WI-FI', 12, 120000, 1, 0, 1, '-27.15982337628752', '-48.5075014570202'),
(38, 'Luis N Palma 1965', '', '', 'Gualeguaychu', 0, 'Oficina', 'Alquiler permanente', 2222222, 2222, 0, 1, 0, 1, 1, 0, '1965', 'Muy buena', 0, 'Probando estab la ganza', '0', '0', '0', '', 'Piscinas', 12, 120000, 1, 0, 1, '-27.15982337628752', '-48.5075014570202');

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
-- Indices de la tabla `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indices de la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indices de la tabla `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indices de la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

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
-- Indices de la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indices de la tabla `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indices de la tabla `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

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
-- AUTO_INCREMENT de la tabla `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT de la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `fotos_prop`
--
ALTER TABLE `fotos_prop`
  MODIFY `id_foto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  MODIFY `id_inmueble` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id_servicio` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Filtros para la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Filtros para la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `inmueble`
--
ALTER TABLE `inmueble`
  ADD CONSTRAINT `inmueble_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id_cliente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
