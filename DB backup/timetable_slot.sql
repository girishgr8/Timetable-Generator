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
  `fid` varchar(4) DEFAULT NULL,
  `subjid` varchar(12) NOT NULL,
  `room_no` varchar(5) DEFAULT NULL,
  `weekday` varchar(10) DEFAULT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `flag` varchar(12) NOT NULL,
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
INSERT INTO `slot` VALUES (1,NULL,13,'RAN','SE','B205','Monday','10:30:00','11:30:00','lec'),(2,NULL,13,'RNP','TCS','B205','Monday','11:30:00','12:30:00','lec'),(3,1,13,'GSS','DN','B217','Monday','01:15:00','03:15:00','lab'),(4,2,13,'JVJ','ADBMS','B116','Monday','01:15:00','03:15:00','lab'),(5,3,13,'PMB','SE','B210B','Monday','01:15:00','03:15:00','lab'),(6,4,13,'BDA','WT','B115','Monday','01:15:00','03:15:00','lab'),(7,NULL,13,'AAG','ADBMS','B205','Monday','03:15:00','04:15:00','lec'),(8,NULL,13,'AAG','ADBMS','B205','Tuesday','11:30:00','12:30:00','lec'),(9,1,13,'BHN','ADBMS','B116','Tuesday','01:15:00','03:15:00','lab'),(10,2,13,'RAN','SE','B109','Tuesday','01:15:00','03:15:00','lab'),(11,3,13,'VPV','WT','B115','Tuesday','01:15:00','03:15:00','lab'),(12,4,13,'PSP','OS','B216','Tuesday','01:15:00','03:15:00','lab'),(13,1,13,'RNP','TCS','B205','Tuesday','03:15:00','04:15:00','tut'),(14,1,13,'BDA','WT','B115','Tuesday','04:15:00','05:15:00','tut'),(15,2,13,'BNP','DN','B217','Tuesday','03:15:00','05:15:00','lab'),(16,3,13,'AAG','ADBMS','B116','Tuesday','03:15:00','05:15:00','lab'),(17,4,13,'BDA','WT','B115','Tuesday','03:15:00','04:15:00','tut'),(18,4,13,'RNP','TCS','B205','Tuesday','04:15:00','05:15:00','tut'),(19,NULL,13,'AAG','ADBMS','B205','Friday','01:15:00','02:15:00','lec'),(20,NULL,13,'RNP','TCS','B205','Wednesday','03:15:00','04:15:00','lec'),(21,1,13,'PSP','OS','B216','Friday','03:15:00','05:15:00','lab'),(22,2,13,'RNP','TCS','B205','Friday','03:15:00','04:15:00','tut'),(24,3,13,'SCP','WT','B115','Friday','03:15:00','04:15:00','tut'),(25,3,13,'RNP','TCS','B205','Friday','03:15:00','04:15:00','tut'),(26,4,13,'PJS','DN','B217','Friday','03:15:00','05:15:00','lab'),(27,NULL,13,'PSP','OS','B205','Wednesday','10:30:00','11:30:00','lec'),(28,NULL,13,'PSP','OS','B205','Thursday','10:30:00','11:30:00','lec'),(29,NULL,13,'PSP','OS','B205','Friday','10:30:00','11:30:00','lec'),(30,NULL,13,'RAN','SE','B205','Wednesday','11:30:00','12:30:00','lec'),(31,NULL,13,'RAN','SE','B205','Friday','02:15:00','03:15:00','lec'),(32,NULL,13,'RNP','TCS','B205','Thursday','03:15:00','04:15:00','lec'),(33,3,13,'PSP','OS','B216','Wednesday','01:15:00','03:15:00','lab'),(34,2,13,'PSP','OS','B216','Thursday','01:15:00','03:15:00','lab'),(35,NULL,13,'GSS','DN','B205','Wednesday','04:15:00','05:15:00','lec'),(36,NULL,13,'GSS','DN','B205','Thursday','11:30:00','12:30:00','lec'),(37,NULL,13,'GSS','DN','B205','Friday','11:30:00','12:30:00','lec'),(38,3,13,'GSS','DN','B217','Thursday','01:15:00','03:15:00','lab'),(39,4,13,'RAN','SE','B109','Thursday','01:15:00','03:15:00','lab'),(40,1,13,'PMB','SE','B109','Wednesday','01:15:00','03:15:00','lab'),(41,2,13,'VPV','WT','B115','Wednesday','01:15:00','03:15:00','lab'),(42,4,13,'AAG','ADBMS','B116','Wednesday','01:15:00','03:15:00','lab'),(43,1,13,'BDA','WT','B115','Thursday','01:15:00','03:15:00','lab'),(44,NULL,14,'SDC','TCS','B301','Monday','10:30:00','11:30:00','lec'),(45,NULL,14,'SDC','TCS','B301','Wednesday','03:15:00','04:15:00','lec'),(46,NULL,14,'SDC','TCS','B301','Thursday','03:15:00','04:15:00','lec'),(47,NULL,14,'PMB','SE','B301','Monday','11:30:00','12:30:00','lec'),(48,NULL,14,'PMB','SE','B301','Thursday','02:15:00','03:15:00','lec'),(49,NULL,14,'PMB','SE','B301','Tuesday','04:15:00','05:15:00','lec'),(50,3,14,'PMB','SE','B210A','Tuesday','10:30:00','12:30:00','lab'),(51,NULL,14,'BHN','ADBMS','B301','Monday','01:15:00','02:15:00','lec'),(52,1,14,'ASC','OS','B216','Tuesday','10:30:00','12:30:00','lab'),(53,2,14,'JVJ','ADBMS','B116','Tuesday','10:30:00','12:30:00','lab'),(54,2,14,'GSS','DN','B217','Monday','03:15:00','05:15:00','lab'),(55,1,14,'SCP','WT','B115','Monday','03:15:00','04:15:00','tut'),(56,1,14,'BNP','TCS','B301','Monday','03:15:00','04:15:00','tut'),(57,3,14,'RRP','OS','B216','Monday','03:15:00','05:15:00','lab'),(58,4,14,'RNP','TCS','B301','Monday','03:15:00','04:15:00','tut'),(61,NULL,14,'BHN','ADBMS','B301','Wednesday','01:15:00','02:15:00','lec'),(62,NULL,14,'BHN','ADBMS','B301','Tuesday','03:15:00','04:15:00','lec'),(63,NULL,13,'SCP','A-DAUT','B209','Wednesday','09:30:00','10:30:00','ac'),(64,NULL,13,'SCP','A-DAUT','B209','Thursday','09:30:00','10:30:00','ac'),(65,NULL,15,'MMK','IOT','B203','Wednesday','10:30:00','11:30:00','ele-lec'),(66,NULL,15,'SNM','CSM','B201','Wednesday','10:30:00','11:30:00','ele-lec'),(67,NULL,15,'SNM','CSM','B201','Thursday','10:30:00','11:30:00','ele-lec'),(68,NULL,15,'SNM','CSM','B201','Friday','10:30:00','11:30:00','ele-lec'),(69,NULL,15,'MMK','IOT','B207','Wednesday','03:15:00','05:15:00','ele-lab'),(70,NULL,15,'MMK','CSM','B102','Wednesday','03:15:00','05:15:00','ele-lab'),(71,NULL,15,'MMK','CSM','B102','Thursday','03:15:00','05:15:00','ele-lab'),(72,NULL,15,'SDC','DWM','B201','Thursday','01:15:00','02:15:00','lec'),(73,NULL,15,'','PROJECT-I','B201','Tuesday','10:30:00','11:30:00','proj'),(74,NULL,15,'ASC','PROJECT-I','B102','Monday','10:30:00','11:30:00','proj'),(76,NULL,15,'ASC','PROJECT-I','B102','Monday','11:30:00','12:30:00','proj'),(77,NULL,15,'','PROJECT-I','B106','Tuesday','11:30:00','12:30:00','proj'),(78,NULL,14,'SCP','A-DAUT','B209','Wednesday','09:30:00','10:30:00','ac'),(79,NULL,14,'SCP','A-DAUT','B209','Thursday','09:30:00','10:30:00','ac'),(80,4,14,'SCP','WT','B115','Monday','04:15:00','05:15:00','tut'),(81,2,13,'VPV','WT','B115','Friday','04:15:00','05:15:00','tut'),(82,4,14,'PJS','DN','B217','Tuesday','10:30:00','12:30:00','lab'),(83,4,14,'RRP','OS','B216','Wednesday','10:30:00','12:30:00','lab'),(85,1,14,'PMB','SE','B210A','Wednesday','10:30:00','12:30:00','lab'),(86,3,14,'VPV','WT','B115','Wednesday','10:30:00','11:30:00','tut'),(87,3,14,'SDC','TCS','B301','Wednesday','11:30:00','12:30:00','tut'),(88,1,14,'PJS','DN','B217','Thursday','10:30:00','12:30:00','lab'),(89,2,14,'PYB','WT','B115','Thursday','10:30:00','11:30:00','tut'),(90,NULL,13,'BDA','A-BDASpark','B107','Wednesday','09:30:00','10:30:00','ac'),(91,2,14,'ASC','SE','B209','Wednesday','10:30:00','12:30:00','lab'),(92,NULL,15,'MMK','IOT','B203','Thursday','10:30:00','11:30:00','ele-lec'),(93,NULL,15,'MMK','IOT','B203','Friday','10:30:00','11:30:00','ele-lec'),(94,NULL,16,'','PROJECT-I','B107','Monday','10:30:00','11:30:00','proj'),(95,NULL,16,'BHN','PROJECT-I','B102','Tuesday','10:30:00','11:30:00','proj'),(96,NULL,16,'','PROJECT-I','B101','Monday','11:30:00','12:30:00','proj'),(97,NULL,16,'','PROJECT-I','B101','Tuesday','11:30:00','12:30:00','proj');
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

-- Dump completed on 2019-08-12 23:15:16
