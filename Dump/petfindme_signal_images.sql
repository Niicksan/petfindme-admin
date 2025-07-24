-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: 127.0.0.1    Database: petfindme
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `signal_images`
--

DROP TABLE IF EXISTS `signal_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `signal_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `signal_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `path` varchar(255) DEFAULT NULL,
  `size` int DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `path` (`path`),
  KEY `signal_images_path` (`path`),
  KEY `signal_id` (`signal_id`),
  CONSTRAINT `signal_images_ibfk_1` FOREIGN KEY (`signal_id`) REFERENCES `signals` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `signal_images`
--

LOCK TABLES `signal_images` WRITE;
/*!40000 ALTER TABLE `signal_images` DISABLE KEYS */;
INSERT INTO `signal_images` VALUES (1,NULL,'2024-04-23 19:41:53','2024-04-23 19:41:53',NULL,NULL,NULL),(2,4,'2024-08-31 12:54:02','2024-08-31 12:54:02','static/images/signals/2024/08/31/172510884255798.jpeg',197932,NULL),(3,4,'2024-08-31 12:54:02','2024-08-31 12:54:02','static/images/signals/2024/08/31/172510884256282.jpeg',109054,NULL),(4,1,'2024-08-31 14:22:08','2024-08-31 14:22:08','static/images/signals/2024/08/31/17251141284795.jpeg',62384,NULL),(5,1,'2024-08-31 14:22:08','2024-08-31 14:22:08','static/images/signals/2024/08/31/172511412848424.jpeg',30282,NULL),(6,2,'2024-08-31 14:24:26','2024-08-31 14:24:26','static/images/signals/2024/08/31/172511426647890.jpeg',115532,NULL),(7,2,'2024-08-31 14:24:26','2024-08-31 14:24:26','static/images/signals/2024/08/31/172511426648157.jpeg',70236,NULL),(8,3,'2024-08-31 14:32:33','2024-08-31 14:32:33','static/images/signals/2024/08/31/172511475366921.jpeg',146161,NULL),(9,3,'2024-08-31 14:32:33','2024-08-31 14:32:33','static/images/signals/2024/08/31/172511475367315.png',131105,NULL);
/*!40000 ALTER TABLE `signal_images` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-21 11:27:06
