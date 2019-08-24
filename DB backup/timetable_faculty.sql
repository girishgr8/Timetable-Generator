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
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `faculty` (
  `fid` varchar(4) NOT NULL,
  `fac_name` varchar(200) NOT NULL,
  `dept` varchar(5) NOT NULL,
  `max_work_hrs` int(11) DEFAULT '20',
  `worked_for_hrs` int(11) DEFAULT '0',
  PRIMARY KEY (`fid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES ('','','',0,0),('AAG','Archana Gupta','COMPS',16,0),('ARJ','Anooja Joy','IT',16,0),('ASC','Anjali Chachra','COMPS',15,0),('ASD','Algonda Desai','SSH',15,0),('BDA','Babaso Aldar','COMPS',16,0),('BHN','Bharati H N','COMPS',16,0),('BNP','Bhakti Palkar','COMPS',16,0),('GSS','Gopal Sonune','COMPS',16,0),('JVJ','Jyoti Joglekar','COMPS',16,0),('MMK','Manasi Kambli','COMPS',17,0),('PJS','Prasanna Shette','COMPS',16,0),('PMB','Poonam Bhogale','COMPS',16,0),('PSP','Suchita Patil','COMPS',16,0),('PYB','Pradnya Bhangale','COMPS',16,0),('RAN','Rohini Nair','COMPS',16,0),('RBS','Ravindra Salvi','SSH',17,0),('RNP','Rajani Pamnani','COMPS',16,0),('RRP','Ruchika Patil','COMPS',16,0),('SCP','Swapnil Pawar','COMPS',16,0),('SDC','Shweta Chachra','COMPS',16,0),('SIP','Sheetal Pereira','COMPS',16,0),('SNM','Swati Mali','COMPS',18,0),('UBJ','Uday Joshi','COMPS',16,0),('VPV','Vaibhav Vasani','COMPS',17,0);
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-12 23:15:13
