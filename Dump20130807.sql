CREATE DATABASE  IF NOT EXISTS `yummy` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `yummy`;
-- MySQL dump 10.13  Distrib 5.5.31, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: yummy
-- ------------------------------------------------------
-- Server version	5.5.31-0ubuntu0.12.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Food`
--

DROP TABLE IF EXISTS `Food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Food` (
  `idFood` int(11) NOT NULL AUTO_INCREMENT,
  `FoodName` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FoodDesc` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FoodImg` mediumtext COLLATE utf8_unicode_ci COMMENT 'Image url uses varchar maxinum length. ',
  `FoodPrice` decimal(10,3) DEFAULT NULL COMMENT 'Price is more suitable to use decimal than float or double for calculation. \n\nDecimal(10, 3) is from -99999999.999 to 9999999.999.',
  `isAvailable` enum('disabled','use') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'use' COMMENT 'If food is unavailable now, we still need to save the history food to keep orders and menus history consistent. \n\nTinyint datatype: tinyint(1) is true, tinyint(0) is false.\n',
  `VendorId` int(11) DEFAULT NULL,
  PRIMARY KEY (`idFood`),
  UNIQUE KEY `idFood_UNIQUE` (`idFood`),
  KEY `fk_Food_VendorId` (`VendorId`),
  CONSTRAINT `fk_Food_VendorId` FOREIGN KEY (`VendorId`) REFERENCES `Vendor` (`idVendor`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Food`
--

LOCK TABLES `Food` WRITE;
/*!40000 ALTER TABLE `Food` DISABLE KEYS */;
INSERT INTO `Food` VALUES (1,'宫爆鸡丁','',NULL,15.000,'use',1),(5,'鱼香茄子','','',11.000,'use',1),(6,'气锅鸡',NULL,NULL,65.000,'use',2),(7,'蓝莓山药',NULL,NULL,12.000,'disabled',2);
/*!40000 ALTER TABLE `Food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Menu`
--

DROP TABLE IF EXISTS `Menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Menu` (
  `idMenu` int(11) NOT NULL AUTO_INCREMENT,
  `Date` date NOT NULL COMMENT 'Menu is on this date.',
  `EndDate` datetime DEFAULT NULL COMMENT 'Menu is go offline on this time.',
  `Status` enum('saved','published') COLLATE utf8_unicode_ci DEFAULT 'saved',
  `FoodId` int(11) DEFAULT NULL,
  PRIMARY KEY (`idMenu`),
  UNIQUE KEY `idMenu_UNIQUE` (`idMenu`),
  KEY `fk_Menu_FoodId` (`FoodId`),
  CONSTRAINT `fk_Menu_FoodId` FOREIGN KEY (`FoodId`) REFERENCES `Food` (`idFood`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Menu`
--

LOCK TABLES `Menu` WRITE;
/*!40000 ALTER TABLE `Menu` DISABLE KEYS */;
INSERT INTO `Menu` VALUES (1,'2013-08-07','2013-09-01 00:00:00','saved',5),(2,'2013-08-07','2013-08-09 00:00:00','saved',6),(4,'2013-08-05','2013-08-06 00:00:00','published',5);
/*!40000 ALTER TABLE `Menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vendor`
--

DROP TABLE IF EXISTS `Vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Vendor` (
  `idVendor` int(11) NOT NULL AUTO_INCREMENT,
  `VendorName` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idVendor`),
  UNIQUE KEY `idVendor_UNIQUE` (`idVendor`),
  UNIQUE KEY `VendorName_UNIQUE` (`VendorName`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vendor`
--

LOCK TABLES `Vendor` WRITE;
/*!40000 ALTER TABLE `Vendor` DISABLE KEYS */;
INSERT INTO `Vendor` VALUES (5,'MC'),(3,'半亩地'),(4,'老娘舅'),(1,'航空餐'),(2,'过桥米线');
/*!40000 ALTER TABLE `Vendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Order`
--

DROP TABLE IF EXISTS `Order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Order` (
  `idOrder` int(11) NOT NULL AUTO_INCREMENT,
  `MenuId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL COMMENT 'Ordered by this user.',
  `OrderTime` datetime NOT NULL COMMENT 'This order is for this date.',
  PRIMARY KEY (`idOrder`),
  UNIQUE KEY `idOrder_UNIQUE` (`idOrder`),
  KEY `fk_Order_UserId` (`UserId`),
  KEY `fk_Order_MenuId` (`MenuId`),
  CONSTRAINT `fk_Order_MenuId` FOREIGN KEY (`MenuId`) REFERENCES `Menu` (`idMenu`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Order_UserId` FOREIGN KEY (`UserId`) REFERENCES `User` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order`
--

LOCK TABLES `Order` WRITE;
/*!40000 ALTER TABLE `Order` DISABLE KEYS */;
INSERT INTO `Order` VALUES (1,1,1,'2013-08-05 00:00:00'),(2,2,3,'2013-08-06 00:00:00'),(8,2,5,'2013-08-05 00:00:00'),(10,4,2,'2013-08-06 00:00:00');
/*!40000 ALTER TABLE `Order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Can be mstrID ',
  `UserName` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'User name',
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `idUser_UNIQUE` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'海涛'),(2,'大约翰'),(3,'老王'),(4,'元凯'),(5,'饭饭');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-08-07 17:51:41
