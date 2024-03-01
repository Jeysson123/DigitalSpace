-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 01, 2024 at 04:54 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `transport`
--

-- --------------------------------------------------------

--
-- Table structure for table `maritime`
--

CREATE TABLE `maritime` (
  `id` bigint(20) NOT NULL,
  `bodega_entrega` varchar(255) DEFAULT NULL,
  `cantidad_producto` int(11) DEFAULT NULL,
  `fecha_entrega` date DEFAULT NULL,
  `fecha_registro` date DEFAULT NULL,
  `numero_flota` varchar(255) DEFAULT NULL,
  `numero_guia` int(11) DEFAULT NULL,
  `precio_envio` double DEFAULT NULL,
  `tipo_producto` varchar(255) DEFAULT NULL,
  `client_id` bigint(20) DEFAULT NULL,
  `descuento` double DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `maritime`
--

INSERT INTO `maritime` (`id`, `bodega_entrega`, `cantidad_producto`, `fecha_entrega`, `fecha_registro`, `numero_flota`, `numero_guia`, `precio_envio`, `tipo_producto`, `client_id`, `descuento`) VALUES
(16, '10000', 12, '2024-02-29', '2024-02-29', 'ABC123A', 1234567890, 1211, 'XBOX', NULL, 36.33);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `maritime`
--
ALTER TABLE `maritime`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKcbtvokpdmexifora50nybvq8t` (`client_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `maritime`
--
ALTER TABLE `maritime`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
