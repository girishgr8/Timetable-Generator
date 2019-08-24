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
-- Temporary view structure for view `subjectfordeptsem`
--

DROP TABLE IF EXISTS `subjectfordeptsem`;
/*!50001 DROP VIEW IF EXISTS `subjectfordeptsem`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `subjectfordeptsem` AS SELECT 
 1 AS `subjid`,
 1 AS `subj_name`,
 1 AS `dept`,
 1 AS `sem`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `electivelabslot`
--

DROP TABLE IF EXISTS `electivelabslot`;
/*!50001 DROP VIEW IF EXISTS `electivelabslot`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `electivelabslot` AS SELECT 
 1 AS `cid`,
 1 AS `bid`,
 1 AS `fid`,
 1 AS `dept`,
 1 AS `year_of_study`,
 1 AS `division`,
 1 AS `room_no`,
 1 AS `subjid`,
 1 AS `subj_name`,
 1 AS `weekday`,
 1 AS `start_time`,
 1 AS `end_time`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `batchtutorialslot`
--

DROP TABLE IF EXISTS `batchtutorialslot`;
/*!50001 DROP VIEW IF EXISTS `batchtutorialslot`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `batchtutorialslot` AS SELECT 
 1 AS `cid`,
 1 AS `bid`,
 1 AS `fid`,
 1 AS `dept`,
 1 AS `year_of_study`,
 1 AS `division`,
 1 AS `room_no`,
 1 AS `subjid`,
 1 AS `subj_name`,
 1 AS `weekday`,
 1 AS `start_time`,
 1 AS `end_time`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `projectassignedslot`
--

DROP TABLE IF EXISTS `projectassignedslot`;
/*!50001 DROP VIEW IF EXISTS `projectassignedslot`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `projectassignedslot` AS SELECT 
 1 AS `cid`,
 1 AS `dept`,
 1 AS `fid`,
 1 AS `subjid`,
 1 AS `year_of_study`,
 1 AS `division`,
 1 AS `room_no`,
 1 AS `weekday`,
 1 AS `start_time`,
 1 AS `end_time`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `classlectureslot`
--

DROP TABLE IF EXISTS `classlectureslot`;
/*!50001 DROP VIEW IF EXISTS `classlectureslot`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `classlectureslot` AS SELECT 
 1 AS `cid`,
 1 AS `fid`,
 1 AS `dept`,
 1 AS `year_of_study`,
 1 AS `division`,
 1 AS `room_no`,
 1 AS `subjid`,
 1 AS `subj_name`,
 1 AS `weekday`,
 1 AS `start_time`,
 1 AS `end_time`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `roomassignedslot`
--

DROP TABLE IF EXISTS `roomassignedslot`;
/*!50001 DROP VIEW IF EXISTS `roomassignedslot`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `roomassignedslot` AS SELECT 
 1 AS `room_no`,
 1 AS `fid`,
 1 AS `dept`,
 1 AS `year_of_study`,
 1 AS `division`,
 1 AS `bid`,
 1 AS `flag`,
 1 AS `subjid`,
 1 AS `weekday`,
 1 AS `start_time`,
 1 AS `end_time`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `auditslot`
--

DROP TABLE IF EXISTS `auditslot`;
/*!50001 DROP VIEW IF EXISTS `auditslot`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `auditslot` AS SELECT 
 1 AS `cid`,
 1 AS `fid`,
 1 AS `dept`,
 1 AS `year_of_study`,
 1 AS `division`,
 1 AS `room_no`,
 1 AS `subjid`,
 1 AS `subj_name`,
 1 AS `weekday`,
 1 AS `start_time`,
 1 AS `end_time`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `electivelectureslot`
--

DROP TABLE IF EXISTS `electivelectureslot`;
/*!50001 DROP VIEW IF EXISTS `electivelectureslot`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `electivelectureslot` AS SELECT 
 1 AS `cid`,
 1 AS `fid`,
 1 AS `dept`,
 1 AS `year_of_study`,
 1 AS `division`,
 1 AS `room_no`,
 1 AS `subjid`,
 1 AS `subj_name`,
 1 AS `weekday`,
 1 AS `start_time`,
 1 AS `end_time`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `facsubjteaching`
--

DROP TABLE IF EXISTS `facsubjteaching`;
/*!50001 DROP VIEW IF EXISTS `facsubjteaching`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `facsubjteaching` AS SELECT 
 1 AS `fid`,
 1 AS `fac_name`,
 1 AS `fac_dept`,
 1 AS `subjForDept`,
 1 AS `subj_name`,
 1 AS `sem`,
 1 AS `lab`,
 1 AS `lec`,
 1 AS `tut`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `batchlabslot`
--

DROP TABLE IF EXISTS `batchlabslot`;
/*!50001 DROP VIEW IF EXISTS `batchlabslot`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `batchlabslot` AS SELECT 
 1 AS `cid`,
 1 AS `bid`,
 1 AS `fid`,
 1 AS `dept`,
 1 AS `year_of_study`,
 1 AS `division`,
 1 AS `room_no`,
 1 AS `subjid`,
 1 AS `subj_name`,
 1 AS `weekday`,
 1 AS `start_time`,
 1 AS `end_time`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `facultyassignedslot`
--

DROP TABLE IF EXISTS `facultyassignedslot`;
/*!50001 DROP VIEW IF EXISTS `facultyassignedslot`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `facultyassignedslot` AS SELECT 
 1 AS `fid`,
 1 AS `fac_name`,
 1 AS `class_dept`,
 1 AS `year_of_study`,
 1 AS `division`,
 1 AS `bid`,
 1 AS `subjid`,
 1 AS `subj_name`,
 1 AS `room_no`,
 1 AS `weekday`,
 1 AS `start_time`,
 1 AS `end_time`,
 1 AS `slotType`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `subjectfordeptsem`
--

/*!50001 DROP VIEW IF EXISTS `subjectfordeptsem`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `subjectfordeptsem` AS select `subject`.`subjid` AS `subjid`,`subject`.`subj_name` AS `subj_name`,`subj_dept_sem`.`dept` AS `dept`,`subj_dept_sem`.`sem` AS `sem` from (`subject` join `subj_dept_sem` on((`subject`.`subjid` = `subj_dept_sem`.`subjid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `electivelabslot`
--

/*!50001 DROP VIEW IF EXISTS `electivelabslot`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `electivelabslot` AS select `class`.`cid` AS `cid`,`slot`.`bid` AS `bid`,`slot`.`fid` AS `fid`,`class`.`dept` AS `dept`,`class`.`year_of_study` AS `year_of_study`,`class`.`division` AS `division`,`slot`.`room_no` AS `room_no`,`subject`.`subjid` AS `subjid`,`subject`.`subj_name` AS `subj_name`,`slot`.`weekday` AS `weekday`,`slot`.`start_time` AS `start_time`,`slot`.`end_time` AS `end_time` from (((`class` join `slot` on(((`slot`.`cid` = `class`.`cid`) and (`slot`.`flag` = 'ele-lab')))) join `subject` on((`subject`.`subjid` = `slot`.`subjid`))) join `faculty` on((`slot`.`fid` = `faculty`.`fid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `batchtutorialslot`
--

/*!50001 DROP VIEW IF EXISTS `batchtutorialslot`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `batchtutorialslot` AS select `class`.`cid` AS `cid`,`slot`.`bid` AS `bid`,`slot`.`fid` AS `fid`,`class`.`dept` AS `dept`,`class`.`year_of_study` AS `year_of_study`,`class`.`division` AS `division`,`slot`.`room_no` AS `room_no`,`subject`.`subjid` AS `subjid`,`subject`.`subj_name` AS `subj_name`,`slot`.`weekday` AS `weekday`,`slot`.`start_time` AS `start_time`,`slot`.`end_time` AS `end_time` from (((`class` join `slot` on(((`slot`.`cid` = `class`.`cid`) and (`slot`.`flag` = 'tut')))) join `subject` on((`subject`.`subjid` = `slot`.`subjid`))) join `faculty` on((`slot`.`fid` = `faculty`.`fid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `projectassignedslot`
--

/*!50001 DROP VIEW IF EXISTS `projectassignedslot`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `projectassignedslot` AS select `class`.`cid` AS `cid`,`class`.`dept` AS `dept`,`slot`.`fid` AS `fid`,`slot`.`subjid` AS `subjid`,`class`.`year_of_study` AS `year_of_study`,`class`.`division` AS `division`,`slot`.`room_no` AS `room_no`,`slot`.`weekday` AS `weekday`,`slot`.`start_time` AS `start_time`,`slot`.`end_time` AS `end_time` from (`class` join `slot` on((`slot`.`cid` = `class`.`cid`))) where (`slot`.`flag` = 'proj') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `classlectureslot`
--

/*!50001 DROP VIEW IF EXISTS `classlectureslot`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `classlectureslot` AS select `class`.`cid` AS `cid`,`slot`.`fid` AS `fid`,`class`.`dept` AS `dept`,`class`.`year_of_study` AS `year_of_study`,`class`.`division` AS `division`,`slot`.`room_no` AS `room_no`,`subject`.`subjid` AS `subjid`,`subject`.`subj_name` AS `subj_name`,`slot`.`weekday` AS `weekday`,`slot`.`start_time` AS `start_time`,`slot`.`end_time` AS `end_time` from ((`class` join `slot` on(((`slot`.`cid` = `class`.`cid`) and (`slot`.`flag` = 'lec')))) join `subject` on((`subject`.`subjid` = `slot`.`subjid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `roomassignedslot`
--

/*!50001 DROP VIEW IF EXISTS `roomassignedslot`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `roomassignedslot` AS select `slot`.`room_no` AS `room_no`,`slot`.`fid` AS `fid`,`class`.`dept` AS `dept`,`class`.`year_of_study` AS `year_of_study`,`class`.`division` AS `division`,`slot`.`bid` AS `bid`,`slot`.`flag` AS `flag`,`subject`.`subjid` AS `subjid`,`slot`.`weekday` AS `weekday`,`slot`.`start_time` AS `start_time`,`slot`.`end_time` AS `end_time` from (((`class` join `slot` on((`slot`.`cid` = `class`.`cid`))) join `subject` on((`subject`.`subjid` = `slot`.`subjid`))) join `faculty` on((`slot`.`fid` = `faculty`.`fid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `auditslot`
--

/*!50001 DROP VIEW IF EXISTS `auditslot`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `auditslot` AS select `class`.`cid` AS `cid`,`slot`.`fid` AS `fid`,`class`.`dept` AS `dept`,`class`.`year_of_study` AS `year_of_study`,`class`.`division` AS `division`,`slot`.`room_no` AS `room_no`,`subject`.`subjid` AS `subjid`,`subject`.`subj_name` AS `subj_name`,`slot`.`weekday` AS `weekday`,`slot`.`start_time` AS `start_time`,`slot`.`end_time` AS `end_time` from ((`class` join `slot` on(((`slot`.`cid` = `class`.`cid`) and (`slot`.`flag` = 'ac')))) join `subject` on((`subject`.`subjid` = `slot`.`subjid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `electivelectureslot`
--

/*!50001 DROP VIEW IF EXISTS `electivelectureslot`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `electivelectureslot` AS select `class`.`cid` AS `cid`,`slot`.`fid` AS `fid`,`class`.`dept` AS `dept`,`class`.`year_of_study` AS `year_of_study`,`class`.`division` AS `division`,`slot`.`room_no` AS `room_no`,`subject`.`subjid` AS `subjid`,`subject`.`subj_name` AS `subj_name`,`slot`.`weekday` AS `weekday`,`slot`.`start_time` AS `start_time`,`slot`.`end_time` AS `end_time` from ((`class` join `slot` on(((`slot`.`cid` = `class`.`cid`) and (`slot`.`flag` = 'ele-lec')))) join `subject` on((`subject`.`subjid` = `slot`.`subjid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `facsubjteaching`
--

/*!50001 DROP VIEW IF EXISTS `facsubjteaching`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `facsubjteaching` AS select `faculty`.`fid` AS `fid`,`faculty`.`fac_name` AS `fac_name`,`faculty`.`dept` AS `fac_dept`,`subj_dept_sem`.`dept` AS `subjForDept`,`subject`.`subj_name` AS `subj_name`,`subj_dept_sem`.`sem` AS `sem`,`subj_dept_sem`.`lab` AS `lab`,`subj_dept_sem`.`lec` AS `lec`,`subj_dept_sem`.`tut` AS `tut` from (((`faculty` join `teaches` on((`faculty`.`fid` = `teaches`.`fid`))) join `subject` on((`teaches`.`subjid` = `subject`.`subjid`))) join `subj_dept_sem` on((`subj_dept_sem`.`subjid` = `subject`.`subjid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `batchlabslot`
--

/*!50001 DROP VIEW IF EXISTS `batchlabslot`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `batchlabslot` AS select `class`.`cid` AS `cid`,`slot`.`bid` AS `bid`,`slot`.`fid` AS `fid`,`class`.`dept` AS `dept`,`class`.`year_of_study` AS `year_of_study`,`class`.`division` AS `division`,`slot`.`room_no` AS `room_no`,`subject`.`subjid` AS `subjid`,`subject`.`subj_name` AS `subj_name`,`slot`.`weekday` AS `weekday`,`slot`.`start_time` AS `start_time`,`slot`.`end_time` AS `end_time` from (((`class` join `slot` on(((`slot`.`cid` = `class`.`cid`) and (`slot`.`flag` = 'lab')))) join `subject` on((`subject`.`subjid` = `slot`.`subjid`))) join `faculty` on((`slot`.`fid` = `faculty`.`fid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `facultyassignedslot`
--

/*!50001 DROP VIEW IF EXISTS `facultyassignedslot`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `facultyassignedslot` AS select `faculty`.`fid` AS `fid`,`faculty`.`fac_name` AS `fac_name`,`class`.`dept` AS `class_dept`,`class`.`year_of_study` AS `year_of_study`,`class`.`division` AS `division`,`slot`.`bid` AS `bid`,`subject`.`subjid` AS `subjid`,`subject`.`subj_name` AS `subj_name`,`slot`.`room_no` AS `room_no`,`slot`.`weekday` AS `weekday`,`slot`.`start_time` AS `start_time`,`slot`.`end_time` AS `end_time`,`slot`.`flag` AS `slotType` from (((`faculty` join `slot` on((`faculty`.`fid` = `slot`.`fid`))) join `subject` on((`subject`.`subjid` = `slot`.`subjid`))) join `class` on((`class`.`cid` = `slot`.`cid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Dumping routines for database 'timetable'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-12 23:15:19
