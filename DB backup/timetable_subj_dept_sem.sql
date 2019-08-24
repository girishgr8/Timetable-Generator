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
-- Table structure for table `subj_dept_sem`
--

DROP TABLE IF EXISTS `subj_dept_sem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `subj_dept_sem` (
  `subjid` varchar(10) NOT NULL,
  `dept` varchar(5) DEFAULT NULL,
  `sem` int(11) DEFAULT NULL,
  `lec` int(11) DEFAULT '0',
  `lab` int(11) DEFAULT '0',
  `tut` int(11) DEFAULT '0',
  KEY `subjid` (`subjid`),
  CONSTRAINT `subj_dept_sem_ibfk_1` FOREIGN KEY (`subjid`) REFERENCES `subject` (`subjid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subj_dept_sem`
--

LOCK TABLES `subj_dept_sem` WRITE;
/*!40000 ALTER TABLE `subj_dept_sem` DISABLE KEYS */;
INSERT INTO `subj_dept_sem` VALUES ('DN','COMPS',5,3,2,0),('TCS','COMPS',5,3,0,1),('ADBMS','COMPS',5,3,2,0),('SE','COMPS',5,3,2,0),('WT','COMPS',5,0,2,1),('DBMS','COMPS',4,3,2,0),('AOA','COMPS',4,3,2,0),('DCN','COMPS',4,3,2,0),('AM-IV','COMPS',4,3,0,1),('MP','COMPS',4,3,0,1),('SL','COMPS',4,0,2,0),('AM-I','SSH',1,4,0,1),('AP-I','SSH',1,3,2,0),('AC-I','SSH',1,3,2,0),('AM-II','SSH',2,4,0,1),('AP-II','SSH',2,3,2,0),('AC-II','SSH',2,3,2,0),('AOA','IT',4,3,0,2),('DCN','IT',4,3,2,0),('AM-III','COMPS',3,3,0,1),('IOT','COMPS',7,3,1,0),('A-BDASpark','COMPS',5,2,0,0),('A-DAUT','COMPS',5,2,0,0),('PROJECT-I','COMPS',7,4,0,0),('PROJECT-I','ETRX',7,4,0,0),('PROJECT-I','EXTC',7,4,0,0),('PROJECT-I','MECH',7,4,0,0),('CSM','COMPS',7,3,1,0),('DWM','COMPS',7,3,1,0),('OS','COMPS',5,3,1,0);
/*!40000 ALTER TABLE `subj_dept_sem` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-12 23:15:14
