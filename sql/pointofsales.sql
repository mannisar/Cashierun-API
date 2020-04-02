/*
SQLyog Professional v12.5.1 (64 bit)
MySQL - 10.4.11-MariaDB : Database - pointofsales
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`pointofsales` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `pointofsales`;

/*Table structure for table `account` */

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) COLLATE latin1_general_ci NOT NULL,
  `email` varchar(25) COLLATE latin1_general_ci NOT NULL,
  `password` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `salt` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `id_role` int(11) NOT NULL,
  `image` varchar(55) COLLATE latin1_general_ci NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Data for the table `account` */

insert  into `account`(`id`,`name`,`email`,`password`,`salt`,`id_role`,`image`,`date_added`,`date_updated`) values 
(1,'Salman Isar','mannisar@cashierun.id','5247562b6e3309b2214d10531c6ec2c266d2cf4f3420930478fe8eda11125293e94b35d9bb84f71b4fd6841345aac2e5e0b2f17d5d89fd4d34343c137d397377','624a8011a202734cc1',1,'http://localhost:3004/upload/Ava-Man.png','2020-03-20 08:29:08','2020-03-31 13:27:23'),
(2,'Dwi Cahyaningsih','dwi@cashierun.id','946ed2a11748e6ffe524dbbfdcc05d6c07bfaed6624e499facb9a0e9583d36f3c89472668254c26a63bfa8d29659e47e06456dff0b08c1fc1b6cb7cba0f12d46','5c42a8a3f0d0643061',1,'http://localhost:3004/upload/Ava-Woman.png','2020-03-20 08:30:16','2020-03-20 08:35:08'),
(3,'admin','admin@cashierun.id','45271808ce3c520fc266131fa60cef1797d6b858231a631b0a950db9c59a410e329766b1b6f67a9aec32dabad137758ef5c0479dff56110ef2b20975e1715001','dee1639bdf56e09a98',2,'http://localhost:3004/upload/Ava-Admin.png','2020-03-20 08:31:13','2020-03-20 08:31:13'),
(4,'cashier','cashier@cashierun.id','f6bd2ed5030b6c1f5bbd921322fc4e48b2097323a6ad1f57db9556001db11dfd8528858985a4a995df65b2a3710c473c1965486949b2da00856b4cf443c4bf68','6697dc6282112bd061',3,'http://localhost:3004/upload/Ava-Cashier.png','2020-03-20 08:31:47','2020-03-21 01:09:17');

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Data for the table `category` */

insert  into `category`(`id`,`name`) values 
(1,'Food'),
(2,'Drink'),
(3,'Cake'),
(4,'Fruit'),
(5,'Herbs');

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) COLLATE latin1_general_ci NOT NULL,
  `description` text COLLATE latin1_general_ci NOT NULL,
  `price` int(25) NOT NULL,
  `available` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `image` varchar(55) COLLATE latin1_general_ci NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Data for the table `product` */

insert  into `product`(`id`,`name`,`description`,`price`,`available`,`id_category`,`image`,`date_added`,`date_updated`) values 
(1,'Red Valvet Latte','Janji Jiwa',23500,54,2,'http://localhost:3004/upload/Red-Valvet-Late.jpg','2020-03-20 09:24:13','2020-04-02 10:05:08'),
(2,'Espresso','Kulo',13000,28,2,'http://localhost:3004/upload/Espresso.jpg','2020-03-20 09:24:53','2020-03-24 13:31:46'),
(3,'Capuccino','Lain Hati',21000,86,2,'http://localhost:3004/upload/Capuccino.jpg','2020-03-20 09:25:26','2020-03-28 20:25:36'),
(4,'Coffe Latte','Starbucks',54000,39,2,'http://localhost:3004/upload/Coffe-Late.jpg','2020-03-20 09:26:11','2020-03-28 20:25:41'),
(5,'Chicken Katsu','Pochajjang',99001,49,1,'http://localhost:3004/upload/Chicken-Katsu.jpg','2020-03-21 00:23:54','2020-03-21 00:25:43'),
(6,'Wiener Schnitzel','Martabak Bangka',16000,8,1,'http://localhost:3004/upload/Wiener-Schnitzel.jpg','2020-03-31 08:19:22','2020-03-31 14:01:19'),
(7,'Salmon Truffle','Italian Food',115000,24,1,'http://localhost:3004/upload/SalmonTruffle.jpg','2020-03-31 08:28:55','2020-03-31 08:28:55'),
(8,'Pisang Tanduk','Kebon Sendiriii',20000,12,4,'http://localhost:3004/upload/Pisang-Value.jpg','2020-03-31 10:54:56','2020-03-31 13:52:27'),
(9,'Choco Rhum','Talas Bogor',55000,25,3,'http://localhost:3004/upload/ChocoRhum.jpg','2020-03-31 13:46:29','2020-03-31 13:48:20'),
(10,'Black Forest','Birth Day Cake',5000,125,3,'http://localhost:3004/upload/BlackForest.png','2020-03-31 13:51:54','2020-03-31 13:51:54'),
(11,'Fresh Plum','-',2500,14,4,'http://localhost:3004/upload/Fresh-Plum.jpg','2020-03-31 13:53:45','2020-03-31 13:53:45'),
(12,'Kunyit','Bumbu Dapur',4500,7,5,'http://localhost:3004/upload/Kunyit-Value.jpg','2020-03-31 13:55:19','2020-03-31 13:55:19'),
(13,'Lemon','RRQ-LEMON',7500,15,4,'http://localhost:3004/upload/Lemon.jpg','2020-03-31 13:55:56','2020-03-31 13:55:56');

/*Table structure for table `purchase` */

DROP TABLE IF EXISTS `purchase`;

CREATE TABLE `purchase` (
  `id` varchar(55) COLLATE latin1_general_ci NOT NULL,
  `id_account` int(11) NOT NULL,
  `total` int(25) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Data for the table `purchase` */

insert  into `purchase`(`id`,`id_account`,`total`,`date`) values 
('b6849f71-6b71-4745-9301-3a0458d03b2b',3,57500,'2020-04-02 11:25:33'),
('5ac4e3e4-15b2-4110-8653-d6279542b584',3,197001,'2020-04-02 09:08:28'),
('831cd67d-93ae-44a2-8bed-edb96c8ba0eb',1,16000,'2020-03-31 14:01:04'),
('db95abff-eca8-4aad-a516-148f4a53f5ce',4,36500,'2020-03-31 13:38:22'),
('5438dc78-9a5e-4d56-92f4-443d33fcdb6d',1,151500,'2020-03-31 13:37:55');

/*Table structure for table `purchase_detail` */

DROP TABLE IF EXISTS `purchase_detail`;

CREATE TABLE `purchase_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_purchase` varchar(55) COLLATE latin1_general_ci NOT NULL,
  `id_product` int(11) NOT NULL,
  `price` int(25) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Data for the table `purchase_detail` */

insert  into `purchase_detail`(`id`,`id_purchase`,`id_product`,`price`,`quantity`) values 
(1,'5438dc78-9a5e-4d56-92f4-443d33fcdb6d',2,13000,1),
(2,'5438dc78-9a5e-4d56-92f4-443d33fcdb6d',1,23500,1),
(3,'5438dc78-9a5e-4d56-92f4-443d33fcdb6d',7,115000,1),
(4,'db95abff-eca8-4aad-a516-148f4a53f5ce',1,23500,1),
(5,'db95abff-eca8-4aad-a516-148f4a53f5ce',2,13000,1),
(6,'831cd67d-93ae-44a2-8bed-edb96c8ba0eb',6,16000,1),
(7,'5ac4e3e4-15b2-4110-8653-d6279542b584',3,21000,1),
(8,'5ac4e3e4-15b2-4110-8653-d6279542b584',4,54000,1),
(9,'5ac4e3e4-15b2-4110-8653-d6279542b584',5,99001,1),
(10,'5ac4e3e4-15b2-4110-8653-d6279542b584',6,16000,1),
(11,'5ac4e3e4-15b2-4110-8653-d6279542b584',12,4500,1),
(12,'5ac4e3e4-15b2-4110-8653-d6279542b584',11,2500,1),
(13,'b6849f71-6b71-4745-9301-3a0458d03b2b',1,23500,1),
(14,'b6849f71-6b71-4745-9301-3a0458d03b2b',2,13000,1),
(15,'b6849f71-6b71-4745-9301-3a0458d03b2b',3,21000,1);

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Data for the table `role` */

insert  into `role`(`id`,`name`) values 
(1,'Super Admin'),
(2,'Admin'),
(3,'Cashier'),
(4,'Anonymous');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
