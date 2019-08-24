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
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `subject` (
  `subjid` varchar(10) NOT NULL,
  `subj_name` varchar(100) NOT NULL,
  PRIMARY KEY (`subjid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES ('A-BDASpark','Big Data Analysis with Spark'),('A-DAUT','Data Analysis Using Tableau'),('AC-I','Applied Chemistry I'),('AC-II','Applied Chemistry II'),('ADBMS','Advanced Database Management System'),('AM-I','Maths I'),('AM-II','Maths II'),('AM-III','Maths III'),('AM-IV','Maths IV'),('AOA','Analysis of Algorithms'),('AP-I','Physics I'),('AP-II','Physics II'),('BEEE','Basics of Electronics & Electrical Engineering'),('COA','Computer Organisation & Architecture'),('CS','Communication Skills'),('CSM','Computer Simulation and Modelling'),('DBMS','Database Management Systems'),('DCN','Data Communication and Networking'),('DD','Digital Design'),('DN','Data Networks'),('DS','Data Structures'),('DSGT','Discrete Structure & Graph Theory'),('DWM','Data warehousing & Mining'),('ED','Engineering Drawing'),('EVS','Environmental Studies'),('FCP','Fundamentals of Computer Programming'),('IOT','Internet Of Things'),('MP','Microprocessor'),('OOPM','Object Oriented Programming Methodology'),('OS','Operating Systems'),('PROJECT-I','Project-I'),('SE','Software Engineering'),('SL','System Lab'),('TCS','Theory of Computer Science'),('WT','Web Technology');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-12 23:15:15
