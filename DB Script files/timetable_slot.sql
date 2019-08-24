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
-- Table structure for table `slot`
--

DROP TABLE IF EXISTS `slot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `slot` (
  `slot_id` int(11) NOT NULL,
  `bid` int(11) DEFAULT NULL,
  `cid` int(11) NOT NULL,
  `fid` varchar(4) NOT NULL,
  `subjid` varchar(4) NOT NULL,
  `room_no` varchar(5) DEFAULT NULL,
  `weekday` varchar(10) DEFAULT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `flag` varchar(3) NOT NULL,
  PRIMARY KEY (`slot_id`),
  KEY `bid` (`bid`),
  KEY `cid` (`cid`),
  KEY `fid` (`fid`),
  KEY `subjid` (`subjid`),
  CONSTRAINT `slot_ibfk_1` FOREIGN KEY (`bid`) REFERENCES `batch` (`bid`),
  CONSTRAINT `slot_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `class` (`cid`),
  CONSTRAINT `slot_ibfk_3` FOREIGN KEY (`fid`) REFERENCES `faculty` (`fid`),
  CONSTRAINT `slot_ibfk_4` FOREIGN KEY (`subjid`) REFERENCES `subject` (`subjid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slot`
--

LOCK TABLES `slot` WRITE;
/*!40000 ALTER TABLE `slot` DISABLE KEYS */;
INSERT INTO `slot` VALUES (1,1,11,'VPV','DBMS','B116','Monday','10:30:00','12:30:00','lab'),(2,NULL,13,'SNM','OS','B301','Monday','11:30:00','12:30:00','lec'),(3,NULL,11,'MMK','MP','B301','Monday','01:15:00','02:15:00','lec');
/*!40000 ALTER TABLE `slot` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-15 19:23:59
