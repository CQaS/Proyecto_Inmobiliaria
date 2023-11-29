-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-11-2023 a las 21:03:49
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
(1, 'pbkdf2_sha256$600000$CBYlvxWep727xeh3wLglPT$vtWAA5tu/CYRHyYESOvaJlI9w7jdIQAV0+Q9LEIbSgE=', '2023-11-24 20:54:07.161379', 1, 'dhubalde', '', '', 'dalilahubalde@hotmail.com', 1, 1, '2023-11-14 18:50:25.682772');

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
(13, 'Seba', '1111111', '11111', 'Andrade 741', '11111111', 'and@gmail.com', 'Gchu', 'Argentina', '2000-12-14', 'Propietario'),
(14, 'Dumon Nina', '666666666', '0', 'Churruarin 100', '45454545', 'nd@gmail.com', 'Gchu', 'Argentina', '2001-10-03', 'Locatario'),
(15, 'Cecilia', '30060490', '0', 'JB Gonzalez 32', '1154326236', 'ce@hotmail.com', 'Caba', 'Argentina', '1986-01-02', 'Propietario'),
(16, 'Huba Cecilia', '32556630', '0', 'Belgrano 50', '963258100', 'ch@aol.com', 'gchu', 'Argentina', '1896-01-02', 'Locatario'),
(17, 'Patri Bruno', '30526598', '0', 'Rivadavia 5100', '3446635231', 'bp@hotmail.com', 'Gchu', 'Argentina', '1984-12-10', 'Locatario');

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
(1, 'contenttypes', '0001_initial', '2023-11-11 19:34:02.097955'),
(2, 'auth', '0001_initial', '2023-11-11 19:34:02.947732'),
(3, 'admin', '0001_initial', '2023-11-11 19:34:03.107615'),
(4, 'admin', '0002_logentry_remove_auto_add', '2023-11-11 19:34:03.118111'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2023-11-11 19:34:03.133337'),
(6, 'contenttypes', '0002_remove_content_type_name', '2023-11-11 19:34:03.219318'),
(7, 'auth', '0002_alter_permission_name_max_length', '2023-11-11 19:34:03.299017'),
(8, 'auth', '0003_alter_user_email_max_length', '2023-11-11 19:34:03.321057'),
(9, 'auth', '0004_alter_user_username_opts', '2023-11-11 19:34:03.330673'),
(10, 'auth', '0005_alter_user_last_login_null', '2023-11-11 19:34:03.387847'),
(11, 'auth', '0006_require_contenttypes_0002', '2023-11-11 19:34:03.393624'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2023-11-11 19:34:03.408796'),
(13, 'auth', '0008_alter_user_username_max_length', '2023-11-11 19:34:03.427736'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2023-11-11 19:34:03.454454'),
(15, 'auth', '0010_alter_group_name_max_length', '2023-11-11 19:34:03.480670'),
(16, 'auth', '0011_update_proxy_permissions', '2023-11-11 19:34:03.502587'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2023-11-11 19:34:03.542277'),
(18, 'sessions', '0001_initial', '2023-11-11 19:34:03.577881');

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
('etxjaacdp3g0dw0l9evx55gf6cc9cona', '.eJxVjDsOwjAQBe_iGlk2_mUp6TmDtfZucADZUpxUiLuTSCmgfTPz3iLiupS4dp7jROIitDj9bgnzk-sO6IH13mRudZmnJHdFHrTLWyN-XQ_376BgL1tttBqVNeyRM40ALg3og3JasSe0AdizC0SUCXhzjAWNgz4riyFxAvH5AvMTOJY:1r45h3:Y9C26aEFSJQYTvhZ2CwN_W73bDWVlE4Z64vcjI61SBM', '2023-12-01 20:44:01.310260'),
('ikxdwmju5j25ymx0cofvl0gcq96ykr11', '.eJxVjDsOwjAQBe_iGlk2_mUp6TmDtfZucADZUpxUiLuTSCmgfTPz3iLiupS4dp7jROIitDj9bgnzk-sO6IH13mRudZmnJHdFHrTLWyN-XQ_376BgL1tttBqVNeyRM40ALg3og3JasSe0AdizC0SUCXhzjAWNgz4riyFxAvH5AvMTOJY:1r6dBf:bSFNIMkk6ebcMMWstbtwMbY9Q1-WnSuZ30VXu_yWNvU', '2023-12-08 20:54:07.190435');

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
(5, 'Pedro', 9999999, 2147483647, '25 de mayo 231', 'pp@gmail.com', 'Maestranza'),
(6, 'Franchi', 28282828, 2147483647, 'Los Alerces 6', 'fra@gmail.com', 'Jardineria'),
(7, 'Lucia', 665655665, 2147483647, 'San Martin 1111', 'l@gmail.com', 'Piletero'),
(8, 'Caceres Matias', 29000325, 2147483647, 'Goldaracena 930', 'mc@gmail.com', 'Piletero'),
(9, 'Huba Benja', 40365630, 2147483647, 'Bravo 35', 'hb@hotmail.com', 'Administracion'),
(10, 'Patriarca Martina', 40386520, 2147483647, 'Bolivar y Maipu', 'mp@gmail.com', 'Jardineria');

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
(10, 'webapp/static/assets/img/bca4e4b6c3664607a72f253ddfd7e23a.jpg', 20),
(11, 'webapp/static/assets/img/78cad6d492f64e0fb065bec18c17d9a4.jpeg', 20),
(12, 'webapp/static/assets/img/d0ee47a5ab7c4d63a3c23d187fc37b2b.jpeg', 20),
(13, 'webapp/static/assets/img/026ca053b9404c5099a2618406044cb1.jpg', 21),
(14, 'webapp/static/assets/img/298abb54ae0b4b7e815bf6109d01462e.jpg', 22),
(15, 'webapp/static/assets/img/2e69f6280d32473da5271cdb39660633.jpg', 22),
(16, 'webapp/static/assets/img/dc41d80a0f314f60a2dcaee89d25cf11.jpg', 22),
(17, 'webapp/static/assets/img/ef04611fa5954aef820194abaf4aaeed.jpg', 22),
(18, 'webapp/static/assets/img/3cb2fac24e5348fb97e77a7a66afb9e6.jpg', 22),
(19, 'webapp/static/assets/img/24673e89beb141caa32f9bdb4c949235.jpg', 23),
(20, 'webapp/static/assets/img/f60e6b777a6b4fac9f85ab15cd0cf18c.jpg', 23),
(21, 'webapp/static/assets/img/364f2cfab80c4adb812270f3877c64e1.jpg', 24),
(22, 'webapp/static/assets/img/a77932cb58074099bdc03835e4ee0106.jpeg', 24),
(23, 'webapp/static/assets/img/22ae067ad8ff4d6d8e8d20cd1af19c9d.jpeg', 24),
(24, 'webapp/static/assets/img/22b50df0b3834388b48477b00fca5fa3.jpg', 24),
(25, 'webapp/static/assets/img/2212dfb712b84939ba6b45f2c1f9dee1.jpg', 24),
(26, 'webapp/static/assets/img/94849b0c96034df78aca2506d563d39d.jpg', 25),
(27, 'webapp/static/assets/img/eeb386bb244e435b9c219127dbc3c9c1.jpg', 25),
(28, 'webapp/static/assets/img/992339f58a4743258dbf9d1f95a8135a.jpg', 26),
(29, 'webapp/static/assets/img/2e41b31446ca4b41b5665dd8c32f55cc.jpg', 27),
(30, 'webapp/static/assets/img/8a2307d25a5148a6999ecb4b5902c1cf.jpeg', 28),
(31, 'webapp/static/assets/img/83af16397e7e454c9c16a648ed691a08.jpg', 29),
(32, 'webapp/static/assets/img/d3619ed4ff8b46dd9a75ff937c374c1b.jpeg', 30),
(33, 'webapp/static/assets/img/759b82b1e1aa48979058f12b5e8b07c7.jpeg', 30),
(34, 'webapp/static/assets/img/26a0ea6daa8d4a3aa0e278a09b46d3ec.jpeg', 30),
(35, 'webapp/static/assets/img/cf3835a03caa4c5391cd51f21f27a565.jpeg', 31),
(36, 'webapp/static/assets/img/bafa14bfb95a449caa2e54586cab6438.jpeg', 31),
(37, 'webapp/static/assets/img/691c2b853fbb442a93f1b14008990677.jpg', 32),
(38, 'webapp/static/assets/img/0c5394ccaf134bdd8b6e0d28a05284a9.jpg', 32),
(39, 'webapp/static/assets/img/25eec2d5a61142b3a1de8847bbf869f0.jpg', 32),
(40, 'webapp/static/assets/img/8d3be5342597437c825ac8629409a68b.jpg', 33),
(41, 'webapp/static/assets/img/457c2194912040ada1963d2964b64e4e.jpg', 33),
(42, 'webapp/static/assets/img/70258f23ac1f4a5d98c10fbc299480fb.jpg', 33),
(43, 'webapp/static/assets/img/97361b17491747468dcfd9592d1572c2.jpg', 34),
(44, 'webapp/static/assets/img/03fe1f7578dc40f4ba9d338ffbbe5794.jpg', 34),
(45, 'webapp/static/assets/img/0b1be85d4e894596a561dd756d7d2b17.jpg', 34),
(46, 'webapp/static/assets/img/104695b3812042ba80cccf04bfb0d2b9.jpg', 35),
(47, 'webapp/static/assets/img/9676d24822e64e198da2fb81d74a5970.jpg', 36),
(48, 'webapp/static/assets/img/3ab58cb19e774ab4834ad79b3f996fe6.jpg', 37),
(49, 'webapp/static/assets/img/d8f6992635a248baa4c2be620ea5e57d.jpg', 37),
(50, 'webapp/static/assets/img/7cfd2ebd8da34d169b527c9620aa2570.jpeg', 37),
(51, 'webapp/static/assets/img/ff1b259bd96d4e4babaf51eab0c60443.jpeg', 37),
(52, 'webapp/static/assets/img/bdaca6cfbbad438f97ee3aaf46901309.jpg', 38),
(53, 'webapp/static/assets/img/785618c51a4441a8a4db132ee555976f.jpeg', 38),
(54, 'webapp/static/assets/img/0556a3c45c534ace9c10e50dde6ab7b1.jpg', 38),
(55, 'webapp/static/assets/img/0db2c4a8fe864cd5859904554a4761dd.jpg', 39),
(56, 'webapp/static/assets/img/918eec1abd2143ff963eb77ec8ce7160.jpg', 40),
(57, 'webapp/static/assets/img/5b0c9a4c31af441e8d1b1cf7458fe491.jpg', 41);

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
  `cochera_rotativa` tinyint(4) DEFAULT NULL,
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
(25, 'Maipu 160 ', '', '', 'Gualeguaychu', 2, 'Departamento', 'Alquiler permanente', 60, 58, 2, 1, 1, 1, 1, NULL, '6666666', 'Muy buena', 1, 'Casa 1 plantas frente al norte', '2705', '2705', '2705', '', 'WI-FI', 8, 100000, 1, 2, 1, '0.00000000000000', '0.00000000000000'),
(26, 'Artigas 152', '', '', 'Concepción del Uruguay', 5, 'Departamento', 'Alquiler permanente', 100, 80, 20, 1, 2, 1, 1, NULL, '167522', 'Muy buena', 1, 'Departamento', '6', '6', '7202', '', 'WI-FI, Ropa de cama', 15, 150, 1, 4, 1, '-33.018649682813226', '-58.536057472229004'),
(27, 'Magnasco 643', '', '', 'Gualeguaychu', 2, 'Casa', 'Venta', 300, 100, 10, 1, 2, 1, 0, NULL, '987456', 'Buena', 0, 'Casa', '65', '065', '065', '', 'SD', 13, 100000, 1, 4, 1, '-33.01211015057216', '-58.515232801437385'),
(28, 'Magnasco 1152', '', '', 'Gualeguaychu', 0, 'Oficina', 'Venta', 40000, 0, 0, 0, 0, 0, 0, NULL, '1152', 'Muy buena', 0, 'Quinta para loteo', '0', '0', '0', '', 'SD', 15, 800000, 1, 0, 1, '-33.02183422931766', '-58.582878112792976'),
(29, 'Rioja 775', '', '', 'Gualeguaychu', 0, 'Casa', 'Alquiler permanente', 200, 120, 0, 2, 3, 2, 1, NULL, '775', 'Muy buena', 0, 'Casa planta alta', '0', '0', '14523', '', 'WI-FI', 15, 120000, 1, 6, 1, '-33.01220011776397', '-58.51510405540467'),
(30, 'Magnasco y Federacion', '', '', 'Gualeguaychu', 0, 'Otros', 'Venta', 12000, 0, 0, 0, 0, 0, 0, NULL, '32', 'Buena', 0, 'terreno para loteo', '0', '0', '0', '', 'SD', 13, 250000, 1, 0, 1, '-33.01304777289296', '-58.51415991783143'),
(31, 'San Martin 3000', '', '', 'Gualeguaychu', 0, 'Otros', 'Venta', 300, 0, 0, 0, 0, 0, 0, NULL, '3000', 'Buena', 0, 'Terreno en barrio residencial', '0', '0', '0', '', 'SD', 12, 80000, 1, 0, 1, '-33.024903969276224', '-58.56472492218018'),
(32, 'Ituzaingo 932', '', '', 'Gualeguaychu', 0, 'Departamento', 'Venta', 80, 80, 0, 1, 2, 1, 1, NULL, '932', 'Buena', 1, 'Departamento a estrenar', '0', '0', '1111', '', 'WI-FI', 5, 65000, 1, 4, 1, '-33.012903826725676', '-58.51514697074891'),
(33, 'Ituzaingo 932', '', '', 'Caba', 0, 'Departamento', 'Venta', 80, 80, 0, 1, 2, 1, 1, NULL, '932', 'Buena', 1, 'Departamento a estrenar', '0', '0', '1111', '', 'WI-FI', 5, 65000, 1, 4, 1, '-33.012903826725676', '-58.51514697074891'),
(34, 'French 2868, CABA', '', '', 'CABA', 0, 'Departamento', 'Venta', 80, 80, 0, 1, 2, 1, 1, NULL, '932', 'Buena', 1, 'Departamento a estrenar', '0', '0', '1111', '', 'WI-FI', 5, 65000, 1, 4, 1, '-33.012903826725676', '-58.51514697074891'),
(35, 'Urquiza 2000', '', '', 'Colon', 0, 'Oficina', 'Alquiler permanente', 200, 200, 0, 1, 0, 1, 0, NULL, '2000', 'Buena', 0, 'Galpon', '0', '0', '0', '', 'SD', 8, 150000, 0, 0, 1, '-33.01330523071073', '-58.5106971859932'),
(36, 'Luis N Palma 1965', '', '', 'Gualeguachu', 0, 'Oficina', 'Alquiler permanente', 120, 100, 0, 1, 0, 1, 1, NULL, '1968', 'Regular', 0, 'Oficina', '2020', '0', 'Oficina21', '', 'WI-FI', 13, 80000, 0, 0, 1, '-27.15982337628752', '-48.5075014570202'),
(37, 'Luis N Palma 1675', '', '', 'Gualeguachu', 0, 'Casa', 'Venta', 200, 100, 0, 2, 4, 3, 1, NULL, '167588', 'Muy buena', 0, 'Casa 1 plantas frente al norte', '0', '0', '0202020', '', 'WI-FI, Piscinas', 15, 350000, 1, 8, 1, '-27.15982337628752', '-48.5075014570202'),
(38, 'Rua Parati 379', '', '', 'Bombinhas', 0, 'Complejo', 'Alquiler temporario', 45, 0, 0, 1, 1, 1, 0, NULL, '37901', 'Muy buena', 0, 'Pousada suite lateral', '0', '0', 'Bellu379', '', 'WI-FI, Ropa de cama, Mucama', 10, 130, 1, 6, 1, '-27.15982337628752', '-48.5075014570202'),
(39, 'Urquiza 560', '', '', 'Gualeguaychu', 20, 'Complejo', 'Alquiler temporario', 200, 120, 0, 1, 0, 1, 0, NULL, '560', 'Buena', 0, 'Casa 1 plantas frente al norte', 'ww', '0', '0', '', 'WI-FI', 12, 120000, 0, 5, 1, '-27.15982337628752', '-48.5075014570202'),
(40, '25 de Mayo 801', '', '', 'Gualeguaychu', 20, 'Otros', 'Alquiler permanente', 200, 120, 0, 2, 0, 3, 0, NULL, '801', 'Muy buena', 0, 'Local comercial en pleno centro de la ciudad', '2424', '0', 'momentos-felices', '', 'WI-FI', 12, 150000, 1, 50, 1, '-27.15982337628752', '-48.5075014570202'),
(41, '25 de Mayo 809', '', '', 'Paraná', 20, 'Otros', 'Alquiler permanente', 200, 120, 0, 1, 0, 1, 0, NULL, '809-01', 'Buena', 0, 'Depósito de mercaderia', '2020', '0', 'momentos20', '', 'WI-FI', 4, 50000, 1, 0, 1, '-27.15982337628752', '-48.5075014570202');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `fotos_prop`
--
ALTER TABLE `fotos_prop`
  MODIFY `id_foto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  MODIFY `id_inmueble` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

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
