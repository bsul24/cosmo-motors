/*
CS340 Group 24
William Sullivan
Ever Sardoth
2/8/24
*/

-- MariaDB dump 10.19  Distrib 10.5.22-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_sulliwil
-- ------------------------------------------------------
-- Server version	10.6.16-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Customers`
--

-- Disable checks and commits
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phoneNumber` varchar(45) NOT NULL,
  PRIMARY KEY (`customerID`),
  UNIQUE KEY `customerID_UNIQUE` (`customerID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers` VALUES (1,'Hasan','Twelpert','hasstwp@nodomain.com','3237886436'),(2,'Rue','Hall','rrueh@nodomain.com','3458912367'),(3,'Hyolin','Kim',NULL,'3210934812');
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Dealerships`
--

DROP TABLE IF EXISTS `Dealerships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Dealerships` (
  `dealershipID` int(11) NOT NULL AUTO_INCREMENT,
  `dealershipName` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `phoneNumber` varchar(45) NOT NULL,
  PRIMARY KEY (`dealershipID`),
  UNIQUE KEY `dealershipID_UNIQUE` (`dealershipID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dealerships`
--

LOCK TABLES `Dealerships` WRITE;
/*!40000 ALTER TABLE `Dealerships` DISABLE KEYS */;
INSERT INTO `Dealerships` VALUES (2,'Kepler','FL','Miami','1545 Skips Lane','5203434821'),(3,'Gliese','TX','Dallas','1828 Carolyns Circle','2147689272'),(4,'Tau Ceti','CA','Los Angeles','3425 Brannon Street','2132841154');
/*!40000 ALTER TABLE `Dealerships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DealershipsHasSalespeople`
--

DROP TABLE IF EXISTS `DealershipsHasSalespeople`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DealershipsHasSalespeople` (
  `dealershipID` int(11) NOT NULL,
  `salespersonID` int(11) NOT NULL,
  PRIMARY KEY (`dealershipID`,`salespersonID`),
  KEY `fk_Dealerships_has_Salespeople_Salespeople1_idx` (`salespersonID`),
  KEY `fk_Dealerships_has_Salespeople_Dealerships1_idx` (`dealershipID`),
  CONSTRAINT `fk_Dealerships_has_Salespeople_Dealerships1` FOREIGN KEY (`dealershipID`) REFERENCES `Dealerships` (`dealershipID`) ON DELETE CASCADE,
  CONSTRAINT `fk_Dealerships_has_Salespeople_Salespeople1` FOREIGN KEY (`salespersonID`) REFERENCES `Salespeople` (`salespersonID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DealershipsHasSalespeople`
--

LOCK TABLES `DealershipsHasSalespeople` WRITE;
/*!40000 ALTER TABLE `DealershipsHasSalespeople` DISABLE KEYS */;
INSERT INTO `DealershipsHasSalespeople` VALUES (2,2),(3,1),(3,3),(4,1);
/*!40000 ALTER TABLE `DealershipsHasSalespeople` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sales`
--

DROP TABLE IF EXISTS `Sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sales` (
  `saleID` int(11) NOT NULL AUTO_INCREMENT,
  `saleDate` date NOT NULL,
  `customerID` int(11) NOT NULL,
  `salespersonID` int(11) NOT NULL,
  `dealershipID` int(11) NOT NULL,
  PRIMARY KEY (`saleID`),
  UNIQUE KEY `saleID_UNIQUE` (`saleID`),
  KEY `fk_Sales_Customers1_idx` (`customerID`),
  KEY `fk_Sales_Salespeople1_idx` (`salespersonID`),
  KEY `fk_Sales_Dealerships1_idx` (`dealershipID`),
  CONSTRAINT `fk_Sales_Customers1` FOREIGN KEY (`customerID`) REFERENCES `Customers` (`customerID`) ON DELETE RESTRICT,
  CONSTRAINT `fk_Sales_Dealerships1` FOREIGN KEY (`dealershipID`) REFERENCES `Dealerships` (`dealershipID`) ON DELETE RESTRICT,
  CONSTRAINT `fk_Sales_Salespeople1` FOREIGN KEY (`salespersonID`) REFERENCES `Salespeople` (`salespersonID`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sales`
--

LOCK TABLES `Sales` WRITE;
/*!40000 ALTER TABLE `Sales` DISABLE KEYS */;
INSERT INTO `Sales` VALUES (1,'2023-04-13',3,1,2),(2,'2020-09-03',1,3,2),(3,'2022-12-24',2,2,4);
/*!40000 ALTER TABLE `Sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Salespeople`
--

DROP TABLE IF EXISTS `Salespeople`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Salespeople` (
  `salespersonID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phoneNumber` varchar(45) NOT NULL,
  PRIMARY KEY (`salespersonID`),
  UNIQUE KEY `salespersonID_UNIQUE` (`salespersonID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Salespeople`
--

LOCK TABLES `Salespeople` WRITE;
/*!40000 ALTER TABLE `Salespeople` DISABLE KEYS */;
INSERT INTO `Salespeople` VALUES (1,'Phoebe','Smith','phoebe.smith@cosmomotors.com','3458219087'),(2,'Mauricio','Fernandes','mauricio.fernandes@cosmomotors.com','3458349011'),(3,'Qiang','Su','qiang.su@cosmomotors.com','3455437812');
/*!40000 ALTER TABLE `Salespeople` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vehicles`
--

DROP TABLE IF EXISTS `Vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Vehicles` (
  `vehicleID` int(11) NOT NULL AUTO_INCREMENT,
  `make` varchar(45) NOT NULL,
  `model` varchar(45) NOT NULL,
  `year` year(4) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `color` varchar(45) NOT NULL,
  `saleID` int(11) DEFAULT NULL,
  PRIMARY KEY (`vehicleID`),
  UNIQUE KEY `vehicleID_UNIQUE` (`vehicleID`),
  KEY `fk_Vehicles_Sales1_idx` (`saleID`),
  CONSTRAINT `fk_Vehicles_Sales1` FOREIGN KEY (`saleID`) REFERENCES `Sales` (`saleID`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vehicles`
--

LOCK TABLES `Vehicles` WRITE;
/*!40000 ALTER TABLE `Vehicles` DISABLE KEYS */;
INSERT INTO `Vehicles` VALUES (1,'Ford','Mustang',2023,87000.00,'Black',3),(2,'Toyota','4Runner',2021,98000.00,'Red',2),(3,'Ferrari','Roma',2024,134512.00,'Blue',1),(4,'Ford ','Focus',2024,89700.00,'Black',NULL);
/*!40000 ALTER TABLE `Vehicles` ENABLE KEYS */;
UNLOCK TABLES;

-- Enable checks and commits
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-08  9:00:28
