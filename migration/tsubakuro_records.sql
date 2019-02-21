-- MySQL dump 10.13  Distrib 8.0.13, for macos10.14 (x86_64)
--
-- Host: localhost    Database: tsubakuro
-- ------------------------------------------------------
-- Server version	8.0.12

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
-- Table structure for table `records`
--

DROP TABLE IF EXISTS `records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL,
  `registerer_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `result` int(11) NOT NULL,
  `extends` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `player_id` (`player_id`),
  KEY `registerer_id` (`registerer_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `records_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `records_ibfk_2` FOREIGN KEY (`registerer_id`) REFERENCES `users` (`id`),
  CONSTRAINT `records_ibfk_3` FOREIGN KEY (`item_id`) REFERENCES `recorditems` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `records`
--

LOCK TABLES `records` WRITE;
/*!40000 ALTER TABLE `records` DISABLE KEYS */;
INSERT INTO `records` VALUES (1,1,1,1,'2019-01-31 15:00:00',130000,'{\"rate\": 25, \"type\": \"normal\"}','2019-02-21 20:12:17','2019-02-21 20:12:17'),(2,1,1,1,'2019-02-01 15:00:00',120100,'{\"rate\": 20, \"type\": \"normal\"}','2019-02-21 20:12:33','2019-02-21 20:12:33'),(3,1,1,1,'2019-02-02 15:00:00',116000,'{\"rate\": 20, \"type\": \"normal\"}','2019-02-21 20:12:46','2019-02-21 20:12:46'),(4,1,1,1,'2019-02-04 15:00:00',112400,'{\"rate\": 20, \"type\": \"normal\"}','2019-02-21 20:13:03','2019-02-21 20:13:03'),(5,1,1,1,'2019-02-05 15:00:00',109900,'{\"rate\": 20, \"type\": \"normal\"}','2019-02-21 20:13:18','2019-02-21 20:13:18'),(6,1,1,1,'2019-02-07 15:00:00',107000,'{\"rate\": 20, \"type\": \"normal\"}','2019-02-21 20:13:31','2019-02-21 20:13:31');
/*!40000 ALTER TABLE `records` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-22  6:05:23
