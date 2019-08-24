-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: timetable
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `class` (
  `cid` int(11) NOT NULL,
  `dept` varchar(6) NOT NULL,
  `year_of_study` varchar(15) NOT NULL,
  `division` varchar(2) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'SSH','FY','A'),(2,'SSH','FY','B'),(3,'SSH','FY','C'),(4,'SSH','FY','D'),(5,'SSH','FY','E'),(6,'SSH','FY','F'),(7,'SSH','FY','G'),(8,'SSH','FY','H'),(9,'SSH','FY','I'),(10,'SSH','FY','J'),(11,'COMPS','SY','A'),(12,'COMPS','SY','B'),(13,'COMPS','TY','A'),(14,'COMPS','TY','B'),(15,'COMPS','LY','A'),(16,'COMPS','LY','B'),(17,'IT','SY','A'),(18,'IT','SY','B'),(19,'IT','TY','A'),(20,'IT','TY','B'),(21,'IT','LY','A'),(22,'IT','LY','B'),(23,'EXTC','SY','A'),(24,'EXTC','SY','B'),(25,'EXTC','TY','A'),(26,'EXTC','TY','B'),(27,'EXTC','LY','A'),(28,'EXTC','LY','B'),(29,'ETRX','SY','A'),(30,'ETRX','SY','B'),(31,'ETRX','TY','A'),(32,'ETRX','TY','B'),(33,'ETRX','LY','A'),(34,'ETRX','LY','B'),(35,'MECH','SY','A'),(36,'MECH','SY','B'),(37,'MECH','TY','A'),(38,'MECH','TY','B'),(39,'MECH','LY','A'),(40,'MECH','LY','B');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-15 19:23:57
