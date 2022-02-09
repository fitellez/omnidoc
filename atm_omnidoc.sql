-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-02-2022 a las 05:33:50
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `atm_omnidoc`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client`
--

CREATE TABLE `client` (
  `id_client` int(11) NOT NULL,
  `id_debit` int(11) NOT NULL,
  `id_credit` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `number_client` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `client`
--

INSERT INTO `client` (`id_client`, `id_debit`, `id_credit`, `name`, `number_client`) VALUES
(1, 3, 3, 'Fidel', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `credit`
--

CREATE TABLE `credit` (
  `id_credit` int(11) NOT NULL,
  `number_card` int(11) NOT NULL,
  `limit_credit` int(11) NOT NULL,
  `balance` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `credit`
--

INSERT INTO `credit` (`id_credit`, `number_card`, `limit_credit`, `balance`) VALUES
(3, 2147483647, 1000, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `debit`
--

CREATE TABLE `debit` (
  `id_debit` int(11) NOT NULL,
  `number_card` int(11) NOT NULL,
  `balance` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `debit`
--

INSERT INTO `debit` (`id_debit`, `number_card`, `balance`) VALUES
(3, 1030391419, 900);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id_client`),
  ADD KEY `credit_FK` (`id_credit`),
  ADD KEY `debit_FK` (`id_debit`);

--
-- Indices de la tabla `credit`
--
ALTER TABLE `credit`
  ADD PRIMARY KEY (`id_credit`);

--
-- Indices de la tabla `debit`
--
ALTER TABLE `debit`
  ADD PRIMARY KEY (`id_debit`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `client`
--
ALTER TABLE `client`
  MODIFY `id_client` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `credit`
--
ALTER TABLE `credit`
  MODIFY `id_credit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `debit`
--
ALTER TABLE `debit`
  MODIFY `id_debit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `credit_FK` FOREIGN KEY (`id_credit`) REFERENCES `credit` (`id_credit`),
  ADD CONSTRAINT `debit_FK` FOREIGN KEY (`id_debit`) REFERENCES `debit` (`id_debit`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
