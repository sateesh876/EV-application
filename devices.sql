-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2021 at 11:46 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `devices`
--

-- --------------------------------------------------------

--
-- Table structure for table `charging_history`
--

CREATE TABLE `charging_history` (
  `v_id` bigint(20) NOT NULL,
  `dev_id` bigint(20) NOT NULL,
  `station_id` bigint(20) NOT NULL,
  `chg_start` int(11) NOT NULL,
  `chg_end` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `his_id` int(11) NOT NULL,
  `payment_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `charging_status`
--

CREATE TABLE `charging_status` (
  `dev_id` bigint(20) NOT NULL,
  `u_id` bigint(20) NOT NULL,
  `chg_id` bigint(20) NOT NULL,
  `v_id` bigint(20) NOT NULL,
  `battery_prcnt` int(11) NOT NULL,
  `date_updated` datetime NOT NULL,
  `charging_or_using` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cstation_details`
--

CREATE TABLE `cstation_details` (
  `cstation_id` bigint(20) NOT NULL,
  `cstation_name` varchar(50) NOT NULL,
  `cs_latitude` varchar(50) NOT NULL,
  `cs_longitude` varchar(50) NOT NULL,
  `cs_address` varchar(50) NOT NULL,
  `cs_city` varchar(50) NOT NULL,
  `cs_district` varchar(50) NOT NULL,
  `cs_landmark` varchar(50) NOT NULL,
  `cs_pincode` int(11) NOT NULL,
  `cs_opentime` time NOT NULL,
  `cs_status` tinyint(1) NOT NULL,
  `cs_closetime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `devices_table`
--

CREATE TABLE `devices_table` (
  `dev_id` bigint(20) NOT NULL,
  `dev_name` varchar(30) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='application_running_device_details';

--
-- Dumping data for table `devices_table`
--

INSERT INTO `devices_table` (`dev_id`, `dev_name`, `start_time`, `end_time`) VALUES
(1, 'device1', '2021-01-12 16:08:59', '2021-01-27 16:08:59');

-- --------------------------------------------------------

--
-- Table structure for table `search_history`
--

CREATE TABLE `search_history` (
  `search_id` bigint(20) NOT NULL,
  `dev_id` bigint(20) NOT NULL,
  `search_string` varchar(50) NOT NULL,
  `search_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `u_id` bigint(20) NOT NULL,
  `u_name` varchar(50) NOT NULL,
  `dev_id` bigint(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `phone_number` bigint(20) NOT NULL,
  `date-of_birth` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_details`
--

CREATE TABLE `vehicle_details` (
  `v_id` bigint(20) NOT NULL,
  `v_name` varchar(50) NOT NULL,
  `v_number` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `charging_history`
--
ALTER TABLE `charging_history`
  ADD PRIMARY KEY (`his_id`),
  ADD KEY `v_id` (`v_id`),
  ADD KEY `dev_id` (`dev_id`),
  ADD KEY `station_id` (`station_id`);

--
-- Indexes for table `charging_status`
--
ALTER TABLE `charging_status`
  ADD PRIMARY KEY (`chg_id`),
  ADD KEY `v_id` (`v_id`),
  ADD KEY `dev_id` (`dev_id`),
  ADD KEY `u_id` (`u_id`);

--
-- Indexes for table `cstation_details`
--
ALTER TABLE `cstation_details`
  ADD PRIMARY KEY (`cstation_id`);

--
-- Indexes for table `devices_table`
--
ALTER TABLE `devices_table`
  ADD PRIMARY KEY (`dev_id`);

--
-- Indexes for table `search_history`
--
ALTER TABLE `search_history`
  ADD PRIMARY KEY (`search_id`),
  ADD KEY `dev_id` (`dev_id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`u_id`,`u_name`),
  ADD UNIQUE KEY `u_name` (`u_name`),
  ADD KEY `dev_id` (`dev_id`);

--
-- Indexes for table `vehicle_details`
--
ALTER TABLE `vehicle_details`
  ADD PRIMARY KEY (`v_id`,`v_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `charging_history`
--
ALTER TABLE `charging_history`
  MODIFY `his_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `charging_status`
--
ALTER TABLE `charging_status`
  MODIFY `chg_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cstation_details`
--
ALTER TABLE `cstation_details`
  MODIFY `cstation_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `devices_table`
--
ALTER TABLE `devices_table`
  MODIFY `dev_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `search_history`
--
ALTER TABLE `search_history`
  MODIFY `search_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `u_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vehicle_details`
--
ALTER TABLE `vehicle_details`
  MODIFY `v_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `charging_history`
--
ALTER TABLE `charging_history`
  ADD CONSTRAINT `charging_history_ibfk_1` FOREIGN KEY (`v_id`) REFERENCES `vehicle_details` (`v_id`),
  ADD CONSTRAINT `charging_history_ibfk_2` FOREIGN KEY (`dev_id`) REFERENCES `devices_table` (`dev_id`),
  ADD CONSTRAINT `charging_history_ibfk_3` FOREIGN KEY (`station_id`) REFERENCES `cstation_details` (`cstation_id`);

--
-- Constraints for table `charging_status`
--
ALTER TABLE `charging_status`
  ADD CONSTRAINT `charging_status_ibfk_1` FOREIGN KEY (`v_id`) REFERENCES `vehicle_details` (`v_id`),
  ADD CONSTRAINT `charging_status_ibfk_2` FOREIGN KEY (`dev_id`) REFERENCES `devices_table` (`dev_id`),
  ADD CONSTRAINT `charging_status_ibfk_3` FOREIGN KEY (`u_id`) REFERENCES `user_details` (`u_id`);

--
-- Constraints for table `search_history`
--
ALTER TABLE `search_history`
  ADD CONSTRAINT `search_history_ibfk_1` FOREIGN KEY (`dev_id`) REFERENCES `devices_table` (`dev_id`);

--
-- Constraints for table `user_details`
--
ALTER TABLE `user_details`
  ADD CONSTRAINT `user_details_ibfk_1` FOREIGN KEY (`dev_id`) REFERENCES `devices_table` (`dev_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
