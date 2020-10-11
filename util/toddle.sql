-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 11, 2020 at 06:09 PM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `toddle`
--

-- --------------------------------------------------------

--
-- Table structure for table `survey`
--

DROP TABLE IF EXISTS `survey`;
CREATE TABLE IF NOT EXISTS `survey` (
  `survey_id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(1500) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  PRIMARY KEY (`survey_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `survey`
--

INSERT INTO `survey` (`survey_id`, `question`, `user_id`) VALUES
(1, 'one', 'zain'),
(2, 'one two', 'zain');

-- --------------------------------------------------------

--
-- Table structure for table `surveyanswer`
--

DROP TABLE IF EXISTS `surveyanswer`;
CREATE TABLE IF NOT EXISTS `surveyanswer` (
  `survey_id` int(11) NOT NULL,
  `answer` int(1) NOT NULL,
  `by_user_id` varchar(50) NOT NULL,
  `on_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `surveyanswer`
--

INSERT INTO `surveyanswer` (`survey_id`, `answer`, `by_user_id`, `on_date`) VALUES
(1, 0, 'zain', '2020-10-11 08:42:04'),
(2, 1, 'zain', '2020-10-11 08:42:04'),
(2, 1, 'zain', '2020-10-11 08:42:51'),
(1, 0, 'zain', '2020-10-11 08:42:51'),
(1, 0, 'zain', '2020-10-11 08:43:04'),
(2, 1, 'zain', '2020-10-11 08:43:04');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` varchar(30) NOT NULL,
  `password` varchar(150) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `password`) VALUES
('user1', 'password'),
('user2', 'password'),
('zain', 'password');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `survey`
--
ALTER TABLE `survey`
  ADD CONSTRAINT `survey_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
