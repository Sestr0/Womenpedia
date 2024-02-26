-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2024 at 04:03 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_storica`
--

CREATE TABLE `data_storica` (
  `ID` int(11) NOT NULL,
  `Data` varchar(30) DEFAULT NULL,
  `Evento` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `data_storica`
--

INSERT INTO `data_storica` (`ID`, `Data`, `Evento`) VALUES
(1, '2007-01-04', 'Nancy Pelosi è la prima donna eletta alla carica di presidente della Camera dei rappresentanti degli Stati Uniti d\'America'),
(2, '1897-01-01', 'Nasce Ana Aslan, biologa rumena.'),
(3, '1992-01-02', 'Muore Grace Murray Hopper, matematica, informatica, militare statunitense.'),
(4, '????-01-03', 'Aretha Franklin è la prima donna inserita nella Rock and Roll Hall of Fame'),
(5, '1972-10-17', 'Madre Teresa nobel per la fisica.'),
(6, '2006-01-16', 'Ellen Johnson Sirleaf giura come presidente della Liberia: è la prima donna eletta a diventare un capo di Stato in Africa.'),
(7, '1925-01-05', 'Nellie Tayloe Ross prima presidentessa del Wyoming\r\n'),
(8, '1907-01-06', 'Maria Montessori apre la sua prima scuola e centro di cura per la classe operaia a Roma'),
(9, '1412-01-06', 'Nasce Giovanna D\'Arco, rivoluzionaria e patriota francese.'),
(10, '1932-01-12', 'Hattie W. Caraway diventa la prima donna eletta al Senato degli Stati Uniti\r\n'),
(11, '1985-01-14', 'Martina Navrátilová vince il suo 100º torneo di tennis\r\n'),
(12, '1931-01-23', 'Anna Pavlovna Pavlova morte.'),
(13, '1931-01-11', 'Amelia Earhart è la prima donna a volare in solitaria dalle Hawaii alla California\r\n'),
(14, '1929-06-12', 'Nasce Anna Frank\r\n'),
(15, '1949-01-07', 'morte Flora McKinnon Drummond\r\n'),
(16, '2009-01-22', 'Hillary Clinton viene confermata dal Senato degli Stati Uniti come Segretario di Stato'),
(17, '1971-02-07', 'Le donne ottengono il diritto di voto in Svizzera'),
(18, '1966-01-19', 'Indira Gandhi viene eletta primo ministro dell\'India'),
(19, '2022-09-28', 'Samantha Cristoforetti è diventata la prima astronauta donna europea a diventare comandante della ISS'),
(20, '1893-09-28', 'Nuova Zelanda primo paese ad adottare il suffraggio universale.'),
(21, '1962-04-08', 'sophia loren è la prima italiana a vincere un oscar per un film italiano'),
(22, '1892-03-16', 'viene pubblicato il primo volume de \"il mattino\" fondato da matilde serao'),
(23, '1856-02-26', 'Nasce Sofia Bisi Albini, scrittrice e saggista italiana, storica femminista, modernista e vicina al movimento di Montessori.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_storica`
--
ALTER TABLE `data_storica`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_storica`
--
ALTER TABLE `data_storica`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
