-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2021 at 01:05 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zwallet`
--

-- --------------------------------------------------------

--
-- Table structure for table `active_token`
--

CREATE TABLE `active_token` (
  `id` int(11) NOT NULL,
  `token` text NOT NULL,
  `time_issued` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `active_token`
--

INSERT INTO `active_token` (`id`, `token`, `time_issued`) VALUES
(32, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsInVzZXJJZCI6MiwiYXV0aExldmVsIjoyLCJpYXQiOjE2MzQ3MDUxMDksImV4cCI6MTYzNTMwOTkwOSwiaXNzIjoiendhbGxldCJ9.WTEH0He-s4XQeE0klhcQNxruiITqvJsw4HcH6FqXw6U', '2021-10-20 11:45:09'),
(33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOm51bGwsImxhc3ROYW1lIjpudWxsLCJ1c2VySWQiOjEsImF1dGhMZXZlbCI6MSwiaWF0IjoxNjM0NzA1NjkwLCJleHAiOjE2MzUzMTA0OTAsImlzcyI6Inp3YWxsZXQifQ.KAV3hF5AzaRLW889bLXUfINN2WXsHhForbfGK2REwLQ', '2021-10-20 11:54:50'),
(34, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsInVzZXJJZCI6MiwiYXV0aExldmVsIjoyLCJpYXQiOjE2MzQ3MDU3MTQsImV4cCI6MTYzNTMxMDUxNCwiaXNzIjoiendhbGxldCJ9.tcEHkTFP4zwfDq9i9qTXbO486JRlgJJIOTd4MuMyFxQ', '2021-10-20 11:55:14'),
(35, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsInVzZXJJZCI6MiwiYXV0aExldmVsIjoyLCJpYXQiOjE2MzQ3MDYwMTksImV4cCI6MTYzNTMxMDgxOSwiaXNzIjoiendhbGxldCJ9.vq_zbUHDv97QwafBeW1mIjcsSSU5kpkNIdMvvMlkGJg', '2021-10-20 12:00:19'),
(36, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsInVzZXJJZCI6MiwiYXV0aExldmVsIjoyLCJpYXQiOjE2MzQ3MDczNDQsImV4cCI6MTYzNTMxMjE0NCwiaXNzIjoiendhbGxldCJ9.8eNm_TljNHsKCRCZ9Lx0igk8XbwovQyLDIXLsvwTAqk', '2021-10-20 12:22:24'),
(37, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsInVzZXJJZCI6MiwiYXV0aExldmVsIjoyLCJpYXQiOjE2MzQ3MTUxODAsImV4cCI6MTYzNTMxOTk4MCwiaXNzIjoiendhbGxldCJ9.rzpXyHrmN7Q_ylVbmK6DuloUQxIWsaQgEzXPvOmGUmo', '2021-10-20 14:33:00'),
(38, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsInVzZXJJZCI6MiwiYXV0aExldmVsIjoyLCJpYXQiOjE2MzQ3MjI4OTgsImV4cCI6MTYzNTMyNzY5OCwiaXNzIjoiendhbGxldCJ9.wm8MSbb8SxANRXJ-BGn3oopW0WMfXotwmVTBuRNQEKg', '2021-10-20 16:41:38'),
(39, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsInVzZXJJZCI6MiwiYXV0aExldmVsIjoyLCJpYXQiOjE2MzQ3MjI5OTQsImV4cCI6MTYzNTMyNzc5NCwiaXNzIjoiendhbGxldCJ9.MTYreBramvxGftjP8wBPoBvpJEhG8iLZYe-z3T0mG00', '2021-10-20 16:43:14'),
(40, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsInVzZXJJZCI6MiwiYXV0aExldmVsIjoyLCJpYXQiOjE2MzQ3MjM1ODYsImV4cCI6MTYzNTMyODM4NiwiaXNzIjoiendhbGxldCJ9.SL9ae37giUN4tDMaw9rLaw4bXpZmiukPvXAcEVUVJfc', '2021-10-20 16:53:06'),
(41, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsInVzZXJJZCI6MywiYXV0aExldmVsIjoyLCJpYXQiOjE2MzQ3NDkxNzUsImV4cCI6MTYzNTM1Mzk3NSwiaXNzIjoiendhbGxldCJ9.U4mTREXZajKKrdE_25g3tGvEKKck0ZjiZzoEn9XW-zo', '2021-10-20 23:59:35'),
(42, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsInVzZXJJZCI6MywiYXV0aExldmVsIjoyLCJpYXQiOjE2MzQ3NDk1MDgsImV4cCI6MTYzNTM1NDMwOCwiaXNzIjoiendhbGxldCJ9.98ehyZCa7ATJF4YwQ0XrQvdie8et54_2sz6oQZ_sRcg', '2021-10-21 00:05:08'),
(43, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsInVzZXJJZCI6MywiYXV0aExldmVsIjoyLCJpYXQiOjE2MzQ3NDk1OTksImV4cCI6MTYzNTM1NDM5OSwiaXNzIjoiendhbGxldCJ9.lUKNvb_zsahN8DpymJ_Cz5_mUrlrDuc3gvA6oM1q9GE', '2021-10-21 00:06:39'),
(44, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsInVzZXJJZCI6MiwiYXV0aExldmVsIjoyLCJpYXQiOjE2MzQ3NDk3NTYsImV4cCI6MTYzNTM1NDU1NiwiaXNzIjoiendhbGxldCJ9.UlryJQs2oWpWiTuDnrr3WHuvRRqtsqmDpLwDi275jkA', '2021-10-21 00:09:16'),
(45, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOm51bGwsImxhc3ROYW1lIjpudWxsLCJ1c2VySWQiOjE0LCJhdXRoTGV2ZWwiOjIsImlhdCI6MTYzNDc4MTYwOSwiZXhwIjoxNjM1Mzg2NDA5LCJpc3MiOiJ6d2FsbGV0In0.j4KYvQvs8UYoWBRQygaqdrBEQP0WJNTbOZIwGNxaJ2I', '2021-10-21 09:00:09'),
(46, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOm51bGwsImxhc3ROYW1lIjpudWxsLCJ1c2VySWQiOjE0LCJhdXRoTGV2ZWwiOjIsImlhdCI6MTYzNDc4MTkxMSwiZXhwIjoxNjM1Mzg2NzExLCJpc3MiOiJ6d2FsbGV0In0.KOvdbNM8XZHzrvKjDa3pM5aSsyHMGgk7RISwCeiPXa0', '2021-10-21 09:05:11'),
(47, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOm51bGwsImxhc3ROYW1lIjpudWxsLCJ1c2VySWQiOjE0LCJhdXRoTGV2ZWwiOjIsImlhdCI6MTYzNDc4MjcwMSwiZXhwIjoxNjM1Mzg3NTAxLCJpc3MiOiJ6d2FsbGV0In0.82EjotT9MQ3HS6XaNf1rFgD0XZR7iFvRGZGHBpfcOjw', '2021-10-21 09:18:21'),
(48, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJudWxsIiwibGFzdE5hbWUiOiJudWxsIiwidXNlcklkIjoxNCwiYXV0aExldmVsIjoyLCJpYXQiOjE2MzQ3ODMxMDUsImV4cCI6MTYzNTM4NzkwNSwiaXNzIjoiendhbGxldCJ9.BHy7Y-Lf4tLw1vehcug-7xV7TnUEcvB7Vc5dnvWNGUQ', '2021-10-21 09:25:05'),
(50, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsInVzZXJJZCI6MywiYXV0aExldmVsIjoyLCJpYXQiOjE2MzQ3OTE0MTIsImV4cCI6MTYzNTM5NjIxMiwiaXNzIjoiendhbGxldCJ9.0ibHuytW45SY4yKU_N3gWwZWdXFdWvo3LW5SB6gYoOA', '2021-10-21 11:43:32');

-- --------------------------------------------------------

--
-- Table structure for table `forgot_password`
--

CREATE TABLE `forgot_password` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `code` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `forgot_password`
--

INSERT INTO `forgot_password` (`id`, `email`, `code`) VALUES
(16, 'candrametal@gmail.com', '169160');

-- --------------------------------------------------------

--
-- Table structure for table `role_types`
--

CREATE TABLE `role_types` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role_types`
--

INSERT INTO `role_types` (`id`, `name`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(11) NOT NULL,
  `transaction_status_id` int(11) NOT NULL,
  `notes` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `sender_id`, `recipient_id`, `amount`, `timestamp`, `status`, `transaction_status_id`, `notes`) VALUES
(1, 1, 2, 20000, '2021-10-18 08:38:30', 1, 1, ''),
(2, 2, 3, 50000, '2021-10-10 08:16:22', 1, 2, ''),
(3, 2, 3, 50000, '2021-10-18 08:16:45', 1, 2, ''),
(4, 2, 3, 50000, '2021-10-18 08:18:46', 1, 2, ''),
(5, 2, 3, 50000, '2021-10-18 08:24:28', 1, 2, ''),
(6, 1, 3, 50000, '2021-10-19 13:29:46', 1, 2, ''),
(9, 1, 3, 100000, '2021-10-19 13:31:23', 1, 2, ''),
(32, 3, 2, 100000, '2021-10-19 13:55:13', 1, 3, ''),
(33, 1, 2, 120000, '2021-10-19 18:26:10', 1, 1, 'Top up'),
(34, 2, 3, 100000, '2021-10-19 19:18:58', 1, 3, ''),
(35, 1, 2, 25000, '2021-10-19 19:19:56', 1, 1, ''),
(36, 1, 2, 10000, '2021-10-19 19:21:29', 1, 1, ''),
(37, 1, 2, 10000, '2021-10-19 19:21:57', 1, 1, ''),
(38, 1, 2, 10000, '2021-10-19 19:26:51', 1, 1, ''),
(39, 1, 2, 10000, '2021-10-19 19:27:14', 1, 1, ''),
(40, 1, 2, 10000, '2021-10-19 19:29:52', 1, 1, ''),
(41, 1, 2, 10000, '2021-10-19 19:30:17', 1, 1, ''),
(42, 1, 2, 10000, '2021-10-19 19:32:35', 1, 1, ''),
(43, 1, 2, 10000, '2021-10-19 19:33:12', 1, 1, ''),
(44, 1, 2, 10000, '2021-10-19 19:33:31', 1, 1, ''),
(45, 1, 2, 10000, '2021-10-19 19:34:36', 1, 1, ''),
(46, 1, 2, 10000, '2021-10-19 19:35:06', 1, 1, ''),
(47, 1, 2, 10000, '2021-10-19 19:35:25', 1, 1, ''),
(48, 1, 2, 10000, '2021-10-19 19:36:08', 1, 1, ''),
(49, 1, 2, 10000, '2021-10-19 19:37:16', 1, 1, ''),
(50, 1, 2, 10000, '2021-10-19 19:37:32', 1, 1, ''),
(51, 1, 2, 10000, '2021-10-19 19:40:14', 1, 1, ''),
(52, 1, 2, 10000, '2021-10-19 19:40:51', 1, 1, ''),
(53, 1, 2, 10000, '2021-10-19 19:42:12', 1, 1, ''),
(54, 2, 3, 10000, '2021-10-19 19:42:34', 1, 3, ''),
(55, 1, 2, 50000, '2021-10-19 19:45:21', 1, 1, ''),
(56, 2, 3, 100000, '2021-10-20 05:20:03', 1, 3, 'Buy shoes'),
(57, 1, 2, 500000, '2021-10-20 05:23:24', 1, 1, ''),
(58, 2, 3, 20000, '2021-10-20 05:24:54', 1, 3, ''),
(59, 2, 7, 10000, '2021-10-20 05:25:31', 1, 3, ''),
(60, 2, 3, 10000, '2021-10-20 05:26:48', 1, 3, ''),
(61, 2, 3, 10000, '2021-10-20 07:36:38', 1, 3, ''),
(62, 2, 3, 10000, '2021-10-20 07:46:37', 1, 3, ''),
(63, 2, 7, 10000, '2021-10-20 07:48:26', 1, 3, ''),
(64, 2, 1, 10000, '2021-10-20 08:00:41', 1, 3, ''),
(65, 2, 3, 10000, '2021-10-20 08:15:17', 1, 3, ''),
(66, 1, 2, 30000, '2021-10-20 08:16:31', 1, 1, ''),
(80, 1, 2, 10000, '2021-10-20 09:43:18', 1, 1, ''),
(81, 1, 2, 10000, '2021-10-20 09:43:25', 1, 1, ''),
(82, 1, 14, 100000, '2021-10-21 02:03:16', 1, 1, ''),
(83, 14, 8, 22222, '2021-10-21 02:05:43', 1, 3, '');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_types`
--

CREATE TABLE `transaction_types` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction_types`
--

INSERT INTO `transaction_types` (`id`, `name`) VALUES
(1, 'Top Up'),
(2, 'Subscription'),
(3, 'Transfer');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `balance` int(11) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `pin_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL DEFAULT 2,
  `picture` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `first_name`, `last_name`, `balance`, `phone`, `pin_number`, `email`, `role_id`, `picture`) VALUES
(1, 'admin', '$2b$10$afQvVXrNLXgV3CaLrbfjoe2Z0lYg6iEL7gaxWsfx3CBwGxuXaIHT6', NULL, NULL, 999034999, '08123456789101112', '$2b$10$Ov8Ba8B29H9DiE/2JALE/.YY28XMBklpektKXC.aK5auJ2/KRM/4m', 'admin@mail.com', 1, ''),
(2, 'user123', '$2b$10$NjqYS4sXWKWnkJVckzHz9OmCf9By19f59/QEtwie7z8r9/YfGz32u', 'Test', 'User', 800000, '014141414', '$2b$10$qXMso0nFkJgvt92rmGTgmeJ3peZC5Qj5udgKgY.zS9CM51vI5DZgW', 'test1@gmail.com', 2, '/images/image-1634479462393-104549.png'),
(3, 'test2', '$2b$10$M1N/gmJZ/0EwI5SAuKmTNOlh6/IQWO1/q0e78Cg7uIykMVqCrS9M6', '', '', 293000, '0', '0', 'test2@gmail.com', 2, ''),
(7, 'test3', '$2b$10$yc2v0Zaz4Khwv0lsjqtif.3WgXcdd0Xl1CJY8/Dp0p2216.VgiDZi', NULL, NULL, 20000, '0', '$2b$10$yc2v0Zaz4Khwv0lsjqtif.mwSkjqzNJZIRIudgWwtw.hIJn3z.msm', 'test3@gmail.com', 2, ''),
(8, 'test4', '$2b$10$0w7dSi4Ee8YdeLBswzke/.9Uj14dmgcepxT.2S2sd2uGVw23JOsBW', NULL, NULL, 22222, '0', '$2b$10$0w7dSi4Ee8YdeLBswzke/.O.6ifllNcbucvfoFGamdTfxwNnDBhbO', 'test4@gmail.com', 2, ''),
(9, 'test5', '$2b$10$h36IRPfOkREWrME93A8IweVyGfkzbFPLbzL7Rw1qJjQHQj78F1JCC', NULL, NULL, NULL, '0', '$2b$10$h36IRPfOkREWrME93A8IweDdnbqciHAgmFhF5Y4pF77haXMYO4CtS', 'test5@gmail.com', 2, ''),
(10, 'test6', '$2b$10$kKOTdauMqEsMzUPCN8j9luC/hrELQ3rSDGaNgoRoCMlOj2OGdnPle', NULL, NULL, NULL, '0', '$2b$10$kKOTdauMqEsMzUPCN8j9lu2QV3HDSeCzhc1.yfSromvRoKW8nRW7C', 'test6@gmail.com', 2, ''),
(11, 'test7', '$2b$10$KuQYNgARl2QFaz1BmKmd1OALc.u3eqoR9CD1UZzgyEw2JoGXaL.3O', NULL, NULL, NULL, '0', '$2b$10$KuQYNgARl2QFaz1BmKmd1OyqyN1whkwuS.lKqLnJav3exp8WUgQli', 'test7@gmail.com', 2, ''),
(12, 'test8', '$2b$10$5f3UdBPsWc4uRsCzR5WfJ.LPKS7VurTIg9YMA6dJLRlIGv1vvLX3q', NULL, NULL, NULL, '0', '$2b$10$5f3UdBPsWc4uRsCzR5WfJ.5sVigImxRW0sd0K.fc7E6kmD4v.1zuG', 'test8@gmail.com', 2, ''),
(13, 'test9', '$2b$10$8fSKIBtn3wqa4nQKpW.YEuk0a1gdgF24j.LkqHhK1WhDp01RFwG/m', NULL, NULL, NULL, '0', '$2b$10$8fSKIBtn3wqa4nQKpW.YEun6ZnYVkGeccaLjHbj95XJHnDjgPHtBi', 'test9@gmail.com', 2, ''),
(14, 'candraside', '$2b$10$C.G4FQqAx3flAjsvBqSEK.kqYg9mqBgo7aRFi9EHkOVJuz3U4xmKC', 'null', 'null', 77778, '03425235', '$2b$10$lypl67aKpVFnzV7OJc/xIuCtd1MEARVGnzaYroHuEQsdlwZuV9Mr.', 'candrametal@gmail.com', 2, '/images/image-1634783285415-136710.jpg'),
(15, 'test53', '$2b$10$xN6XmZB7oQI1k5rF39zCq.p0jtcoq6pR22nuR2Kdr7n0PX0yvktsu', NULL, NULL, NULL, '', '$2b$10$xN6XmZB7oQI1k5rF39zCq.dDfvWaBskxtFHcVuqoQVwHkuECneD8q', 'candrametal5@gmail.com', 2, ''),
(16, 'test534', '$2b$10$otFK1h7vMZgoQ7OjulMyKOfABI/wY.UnToTpTwmzRccmvpBv/7DkG', NULL, NULL, NULL, '', '$2b$10$otFK1h7vMZgoQ7OjulMyKO/xl050ly6SS5BpfFpOpzs49iBkbNIke', 'candrametal54@gmail.com', 2, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `active_token`
--
ALTER TABLE `active_token`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forgot_password`
--
ALTER TABLE `forgot_password`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_types`
--
ALTER TABLE `role_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_status_id` (`transaction_status_id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `recipient_id` (`recipient_id`);

--
-- Indexes for table `transaction_types`
--
ALTER TABLE `transaction_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `active_token`
--
ALTER TABLE `active_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `forgot_password`
--
ALTER TABLE `forgot_password`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `role_types`
--
ALTER TABLE `role_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `transaction_types`
--
ALTER TABLE `transaction_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`recipient_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`transaction_status_id`) REFERENCES `transaction_types` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role_types` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
