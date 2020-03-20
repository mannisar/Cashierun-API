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
(1,'Salman Isar','mannisar@cashierun.id','82633f24af19a80a103bba787394cf1006e4148815c1f3ecb9a244bda3c7240a232bc8875fbc83ca34146a91361934b7ff0eb7de53df9d06276f166acc928c73','cddca84ba0d75e75c5',1,'http://192.168.1.17:3004/upload/Ava-Man.png','2020-03-20 08:29:08','2020-03-20 08:34:40'),
(2,'Dwi Cahyaningsih','dwi@cashierun.id','946ed2a11748e6ffe524dbbfdcc05d6c07bfaed6624e499facb9a0e9583d36f3c89472668254c26a63bfa8d29659e47e06456dff0b08c1fc1b6cb7cba0f12d46','5c42a8a3f0d0643061',1,'http://192.168.1.17:3004/upload/Ava-Woman.png','2020-03-20 08:30:16','2020-03-20 08:35:08'),
(3,'admin','admin@cashierun.id','45271808ce3c520fc266131fa60cef1797d6b858231a631b0a950db9c59a410e329766b1b6f67a9aec32dabad137758ef5c0479dff56110ef2b20975e1715001','dee1639bdf56e09a98',2,'http://192.168.1.17:3004/upload/Ava-Admin.png','2020-03-20 08:31:13','2020-03-20 08:31:13'),
(4,'cashier','cashier@cashierun.id','2b7b4f90f4daaf9b3a75ac677b504abb3347f01a99239062921fa9dceece115e9c3173ebc68f228b89e2edc9e813e5e5ea969513f8a06f9948a08f222e97c9c8','256eaabbe553015c5f',3,'http://192.168.1.17:3004/upload/Ava-Cashier.png','2020-03-20 08:31:47','2020-03-20 08:31:47');

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Data for the table `category` */

insert  into `category`(`id`,`name`) values 
(1,'Food'),
(2,'Drink'),
(3,'Cake');

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) COLLATE latin1_general_ci NOT NULL,
  `description` text COLLATE latin1_general_ci NOT NULL,
  `price` varchar(15) COLLATE latin1_general_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `image` varchar(55) COLLATE latin1_general_ci NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Data for the table `product` */

insert  into `product`(`id`,`name`,`description`,`price`,`quantity`,`id_category`,`image`,`date_added`,`date_updated`) values 
(1,'Red Valvet Latte','Janji Jiwa','23500',78,2,'http://192.168.1.17:3004/upload/Red-Valvet-Late.jpg','2020-03-20 09:24:13','2020-03-20 09:24:13'),
(2,'Espresso','Kulo','13000',45,2,'http://192.168.1.17:3004/upload/Espresso.jpg','2020-03-20 09:24:53','2020-03-20 09:24:53'),
(3,'Capuccino','Lain Hati','21000',20,2,'http://192.168.1.17:3004/upload/Capuccino.jpg','2020-03-20 09:25:26','2020-03-20 09:25:26'),
(4,'Coffe Latte','Starbucks','54000',5,2,'http://192.168.1.17:3004/upload/Coffe-Late.jpg','2020-03-20 09:26:11','2020-03-20 09:26:11');

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
('MKKS291495510',1,175000,'2020-03-20 16:17:16');

/*Table structure for table `purchase_detail` */

DROP TABLE IF EXISTS `purchase_detail`;

CREATE TABLE `purchase_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_purchase` varchar(55) COLLATE latin1_general_ci NOT NULL,
  `id_product` int(11) NOT NULL,
  `price` int(15) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

/*Data for the table `purchase_detail` */

insert  into `purchase_detail`(`id`,`id_purchase`,`id_product`,`price`,`quantity`) values 
(1,'MKKS291495510',1,5000,2),
(2,'MKKS291495510',2,7000,5);

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
