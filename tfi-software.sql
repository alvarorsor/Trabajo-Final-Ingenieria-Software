-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: tfi-software
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `tfi-software`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `tfi-software` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `tfi-software`;

--
-- Table structure for table `administrativos`
--

DROP TABLE IF EXISTS `administrativos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrativos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `legajo` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `legajo` (`legajo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrativos`
--

LOCK TABLES `administrativos` WRITE;
/*!40000 ALTER TABLE `administrativos` DISABLE KEYS */;
/*!40000 ALTER TABLE `administrativos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articulos`
--

DROP TABLE IF EXISTS `articulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` int NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `costo` decimal(10,0) NOT NULL,
  `margen_ganancia` decimal(10,0) NOT NULL,
  `neto_gravado` decimal(10,0) DEFAULT NULL,
  `precio_venta` decimal(10,0) DEFAULT NULL,
  `IVA` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `marcaId` int NOT NULL,
  `categoriaId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`),
  UNIQUE KEY `descripcion` (`descripcion`),
  KEY `Articulos_marcaId_foreign_idx` (`marcaId`),
  KEY `Articulos_categoriaId_foreign_idx` (`categoriaId`),
  CONSTRAINT `Articulos_categoriaId_foreign_idx` FOREIGN KEY (`categoriaId`) REFERENCES `categorias` (`id`),
  CONSTRAINT `Articulos_marcaId_foreign_idx` FOREIGN KEY (`marcaId`) REFERENCES `marcas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulos`
--

LOCK TABLES `articulos` WRITE;
/*!40000 ALTER TABLE `articulos` DISABLE KEYS */;
INSERT INTO `articulos` VALUES (1,1,'Camisa',100,20,120,145,25,'2024-03-15 11:39:39','2024-03-15 11:39:39',1,1),(2,2,'Pantalón',200,30,260,315,55,'2024-03-15 11:39:39','2024-03-15 11:39:39',2,1),(3,3,'Zapatillas deportivas',150,25,188,227,39,'2024-03-15 11:39:39','2024-03-15 11:39:39',1,2),(4,4,'Vestido',300,40,420,508,88,'2024-03-15 11:39:39','2024-03-15 11:39:39',2,2),(5,5,'Abrigo',250,35,338,409,71,'2024-03-15 11:39:39','2024-03-15 11:39:39',1,3);
/*!40000 ALTER TABLE `articulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `descripcion` (`descripcion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'calzado','2024-03-15 11:18:47','2024-03-15 11:18:47'),(2,'camisas','2024-03-15 11:18:47','2024-03-15 11:18:47'),(3,'pantalones','2024-03-15 11:18:47','2024-03-15 11:18:47');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `domicilio` varchar(255) NOT NULL,
  `CUIT` bigint NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `condicionTributariaId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CUIT` (`CUIT`),
  UNIQUE KEY `CUIT_2` (`CUIT`),
  KEY `Clientes_condicionTributariaId_foreign_idx` (`condicionTributariaId`),
  CONSTRAINT `Clientes_condicionTributariaId_foreign_idx` FOREIGN KEY (`condicionTributariaId`) REFERENCES `condicionestributarias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Cliente 1','Apellido 1','Domicilio 1',12345678901,'2024-03-15 11:18:47','2024-03-15 11:18:47',1),(2,'Cliente 2','Apellido 2','Domicilio 2',12345678902,'2024-03-15 11:18:47','2024-03-15 11:18:47',2),(3,'Cliente 3','Apellido 3','Domicilio 3',12345678903,'2024-03-15 11:18:47','2024-03-15 11:18:47',3),(4,'Cliente 4','Apellido 4','Domicilio 4',12345678904,'2024-03-15 11:18:47','2024-03-15 11:18:47',4),(5,'Cliente 5','Apellido 5','Domicilio 5',12345678905,'2024-03-15 11:18:47','2024-03-15 11:18:47',5);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colores`
--

DROP TABLE IF EXISTS `colores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `descripcion` (`descripcion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colores`
--

LOCK TABLES `colores` WRITE;
/*!40000 ALTER TABLE `colores` DISABLE KEYS */;
INSERT INTO `colores` VALUES (1,'Rojo','2024-03-15 11:18:47','2024-03-15 11:18:47'),(2,'Azul','2024-03-15 11:18:47','2024-03-15 11:18:47'),(3,'Verde','2024-03-15 11:18:47','2024-03-15 11:18:47'),(4,'Negro','2024-03-15 11:18:47','2024-03-15 11:18:47'),(5,'Blanco','2024-03-15 11:18:47','2024-03-15 11:18:47');
/*!40000 ALTER TABLE `colores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `condicionestributarias`
--

DROP TABLE IF EXISTS `condicionestributarias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `condicionestributarias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `condicionestributarias`
--

LOCK TABLES `condicionestributarias` WRITE;
/*!40000 ALTER TABLE `condicionestributarias` DISABLE KEYS */;
INSERT INTO `condicionestributarias` VALUES (1,'RESPONSABLE INSCRIPTO','2024-03-15 11:18:47','2024-03-15 11:18:47'),(2,'MONOTRIBUTO','2024-03-15 11:18:47','2024-03-15 11:18:47'),(3,'EXENTO','2024-03-15 11:18:47','2024-03-15 11:18:47'),(4,'NO RESPONSABLE','2024-03-15 11:18:47','2024-03-15 11:18:47'),(5,'CONSUMIDOR FINAL','2024-03-15 11:18:47','2024-03-15 11:18:47');
/*!40000 ALTER TABLE `condicionestributarias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devoluciones`
--

DROP TABLE IF EXISTS `devoluciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devoluciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `estado` varchar(255) DEFAULT 'EN PROCESO',
  `total` decimal(10,0) DEFAULT NULL,
  `tipoComprobante` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `clienteId` int DEFAULT NULL,
  `pagoId` int DEFAULT NULL,
  `nroComprobante` varchar(255) DEFAULT NULL,
  `vendedorId` int DEFAULT NULL,
  `sucursalId` int DEFAULT NULL,
  `PDVId` int DEFAULT NULL,
  `condicionEmpresa` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Devoluciones_clienteId_foreign_idx` (`clienteId`),
  KEY `Devoluciones_pagoId_foreign_idx` (`pagoId`),
  KEY `Devoluciones_vendedorId_foreign_idx` (`vendedorId`),
  KEY `Devoluciones_sucursalId_foreign_idx` (`sucursalId`),
  KEY `Devoluciones_PDVId_foreign_idx` (`PDVId`),
  CONSTRAINT `Devoluciones_clienteId_foreign_idx` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`),
  CONSTRAINT `Devoluciones_pagoId_foreign_idx` FOREIGN KEY (`pagoId`) REFERENCES `pagos` (`id`),
  CONSTRAINT `Devoluciones_PDVId_foreign_idx` FOREIGN KEY (`PDVId`) REFERENCES `puntosdeventa` (`id`),
  CONSTRAINT `Devoluciones_sucursalId_foreign_idx` FOREIGN KEY (`sucursalId`) REFERENCES `sucursales` (`id`),
  CONSTRAINT `Devoluciones_vendedorId_foreign_idx` FOREIGN KEY (`vendedorId`) REFERENCES `vendedores` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devoluciones`
--

LOCK TABLES `devoluciones` WRITE;
/*!40000 ALTER TABLE `devoluciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `devoluciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lineasdearticulos`
--

DROP TABLE IF EXISTS `lineasdearticulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lineasdearticulos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `subTotal` decimal(10,0) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `articuloId` int NOT NULL,
  `colorId` int NOT NULL,
  `talleId` int NOT NULL,
  `ventaId` int DEFAULT NULL,
  `devolucionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lineasDeArticulos_articuloId_foreign_idx` (`articuloId`),
  KEY `lineasDeArticulos_colorId_foreign_idx` (`colorId`),
  KEY `lineasDeArticulos_talleId_foreign_idx` (`talleId`),
  KEY `lineasDeArticulos_ventaId_foreign_idx` (`ventaId`),
  KEY `lineasDeArticulos_devolucionId_foreign_idx` (`devolucionId`),
  CONSTRAINT `lineasDeArticulos_articuloId_foreign_idx` FOREIGN KEY (`articuloId`) REFERENCES `articulos` (`id`),
  CONSTRAINT `lineasDeArticulos_colorId_foreign_idx` FOREIGN KEY (`colorId`) REFERENCES `colores` (`id`),
  CONSTRAINT `lineasDeArticulos_devolucionId_foreign_idx` FOREIGN KEY (`devolucionId`) REFERENCES `devoluciones` (`id`),
  CONSTRAINT `lineasDeArticulos_talleId_foreign_idx` FOREIGN KEY (`talleId`) REFERENCES `talles` (`id`),
  CONSTRAINT `lineasDeArticulos_ventaId_foreign_idx` FOREIGN KEY (`ventaId`) REFERENCES `ventas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lineasdearticulos`
--

LOCK TABLES `lineasdearticulos` WRITE;
/*!40000 ALTER TABLE `lineasdearticulos` DISABLE KEYS */;
/*!40000 ALTER TABLE `lineasdearticulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `descripcion` (`descripcion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'Nike','2024-03-15 11:18:47','2024-03-15 11:18:47'),(2,'Adidas','2024-03-15 11:18:47','2024-03-15 11:18:47'),(3,'Gucci','2024-03-15 11:18:47','2024-03-15 11:18:47'),(4,'H&M','2024-03-15 11:18:47','2024-03-15 11:18:47'),(5,'Zara','2024-03-15 11:18:47','2024-03-15 11:18:47');
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `monto` decimal(10,0) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagostarjetas`
--

DROP TABLE IF EXISTS `pagostarjetas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagostarjetas` (
  `id` int NOT NULL,
  `site_transaction_id` int DEFAULT NULL,
  `card_brand` varchar(255) DEFAULT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagostarjetas`
--

LOCK TABLES `pagostarjetas` WRITE;
/*!40000 ALTER TABLE `pagostarjetas` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagostarjetas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puntosdeventa`
--

DROP TABLE IF EXISTS `puntosdeventa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puntosdeventa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `sucursalId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero` (`numero`),
  KEY `PuntosDeVenta_sucursalId_foreign_idx` (`sucursalId`),
  CONSTRAINT `PuntosDeVenta_sucursalId_foreign_idx` FOREIGN KEY (`sucursalId`) REFERENCES `sucursales` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puntosdeventa`
--

LOCK TABLES `puntosdeventa` WRITE;
/*!40000 ALTER TABLE `puntosdeventa` DISABLE KEYS */;
/*!40000 ALTER TABLE `puntosdeventa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20240123192836-create-articulos.js'),('20240123193133-create-marcas.js'),('20240123193249-create-categorias.js'),('20240123193359-add-foreign-keys-to-articulo.js'),('20240124161254-create-colores.js'),('20240124161406-create-talles.js'),('20240124161523-create-tipo-talles.js'),('20240124173127-add-foreing-key-to-talles.js'),('20240126173418-create-stocks.js'),('20240126173503-add-foreing-key-to-stocks.js'),('20240126175343-create-clientes.js'),('20240126175912-create-condiciones-tributarias.js'),('20240126180941-add-foreing-key-to-clientes.js'),('20240126183131-modificar-cuit-column-cliente.js'),('20240126202907-create-lineas-de-articulos.js'),('20240126203036-add-foreing-key-to-lineasDeVentas.js'),('20240126214815-create-ventas.js'),('20240127002809-add-foreing-key-to-ventas.js'),('20240127003153-create-pagos.js'),('20240127003308-add-foreing-key-to-ventas-pagos.js'),('20240127011923-add-foreing-key-to-ventas-2.js'),('20240127012636-change-column-cliente-pago-in-ventas.js'),('20240127021328-change-column-total-estado-ventas.js'),('20240127152259-add-foreing-key-to-lineaDeArticulos-ventas.js'),('20240128181307-create-usuarios.js'),('20240201173022-add-colums-to-users.js'),('20240201173334-add-colums-to-users-2.js'),('20240202040749-create-devoluciones.js'),('20240202041311-add-foreing-ket-to-devoluciones.js'),('20240202041544-add-column-to-devoluciones-lineasdearticulos.js'),('20240202214146-add-column-to-devolucion-defaultvalue.js'),('20240202215233-add-column-to-ventas-defaultvalue.js'),('20240202220130-create-sucursales.js'),('20240202220308-add-column-to-stocks-sucursales.js'),('20240202225015-create-vendedores.js'),('20240202225429-create-puntos-de-venta.js'),('20240202225515-add-foreing-key-to-pdv-sucursales.js'),('20240202225804-add-foreing-key-to-vendedores-pdv.js'),('20240202230206-create-administrativos.js'),('20240202230937-add-foreing-key-to-usuarios-2.js'),('20240203010253-delete-column-role.js'),('20240203010446-delete-column-2.js'),('20240203011811-change-column-sucursales.js'),('20240206190548-change-column-in-usuarios-administrativo.js'),('20240206220725-add-colums-in-ventas.js'),('20240208145234-add-colums-in-devoluciones.js'),('20240212171657-create-pagos-tarjetas.js'),('20240212195547-change-foreingkey-pagostarjetas.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stocks`
--

DROP TABLE IF EXISTS `stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `colorId` int NOT NULL,
  `talleId` int NOT NULL,
  `articuloId` int NOT NULL,
  `sucursalId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Stocks_colorId_foreign_idx` (`colorId`),
  KEY `Stocks_talleId_foreign_idx` (`talleId`),
  KEY `Stocks_articuloId_foreign_idx` (`articuloId`),
  KEY `Stocks_sucursalId_foreign_idx` (`sucursalId`),
  CONSTRAINT `Stocks_articuloId_foreign_idx` FOREIGN KEY (`articuloId`) REFERENCES `articulos` (`id`),
  CONSTRAINT `Stocks_colorId_foreign_idx` FOREIGN KEY (`colorId`) REFERENCES `colores` (`id`),
  CONSTRAINT `Stocks_sucursalId_foreign_idx` FOREIGN KEY (`sucursalId`) REFERENCES `sucursales` (`id`),
  CONSTRAINT `Stocks_talleId_foreign_idx` FOREIGN KEY (`talleId`) REFERENCES `talles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocks`
--

LOCK TABLES `stocks` WRITE;
/*!40000 ALTER TABLE `stocks` DISABLE KEYS */;
INSERT INTO `stocks` VALUES (1,10,'2024-03-15 11:54:02','2024-03-15 11:54:02',1,5,1,1),(2,5,'2024-03-15 11:54:02','2024-03-15 11:54:02',2,5,5,1),(3,15,'2024-03-15 11:54:02','2024-03-15 11:54:02',3,2,2,2),(4,8,'2024-03-15 11:54:02','2024-03-15 11:54:02',1,5,2,2),(5,12,'2024-03-15 11:54:02','2024-03-15 11:54:02',2,4,4,1),(6,20,'2024-03-15 11:54:02','2024-03-15 11:54:02',3,4,4,2),(7,3,'2024-03-15 11:54:02','2024-03-15 11:54:02',1,4,1,2),(8,7,'2024-03-15 11:54:02','2024-03-15 11:54:02',2,5,3,1),(9,9,'2024-03-15 11:54:02','2024-03-15 11:54:02',3,5,4,1),(10,6,'2024-03-15 11:54:02','2024-03-15 11:54:02',1,2,5,2),(11,18,'2024-03-15 11:54:02','2024-03-15 11:54:02',2,5,4,1),(12,4,'2024-03-15 11:54:02','2024-03-15 11:54:02',3,3,2,1),(13,11,'2024-03-15 11:54:02','2024-03-15 11:54:02',1,2,3,2),(14,17,'2024-03-15 11:54:02','2024-03-15 11:54:02',2,4,2,2),(15,13,'2024-03-15 11:54:02','2024-03-15 11:54:02',3,2,5,1),(16,2,'2024-03-15 11:54:02','2024-03-15 11:54:02',1,2,4,2),(17,16,'2024-03-15 11:54:02','2024-03-15 11:54:02',2,5,1,2),(18,8,'2024-03-15 11:54:02','2024-03-15 11:54:02',3,3,3,1),(19,9,'2024-03-15 11:54:02','2024-03-15 11:54:02',1,5,3,1),(20,5,'2024-03-15 11:54:02','2024-03-15 11:54:02',2,2,2,2);
/*!40000 ALTER TABLE `stocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sucursales`
--

DROP TABLE IF EXISTS `sucursales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sucursales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `direccion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursales`
--

LOCK TABLES `sucursales` WRITE;
/*!40000 ALTER TABLE `sucursales` DISABLE KEYS */;
INSERT INTO `sucursales` VALUES (1,'2024-03-15 11:22:58','2024-03-15 11:22:58','Sucursal 1'),(2,'2024-03-15 11:49:44','2024-03-15 11:49:44','Sucursal 2');
/*!40000 ALTER TABLE `sucursales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `talles`
--

DROP TABLE IF EXISTS `talles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `talles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tipoTalleId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `descripcion` (`descripcion`),
  KEY `Talles_tipoTalleId_foreign_idx` (`tipoTalleId`),
  CONSTRAINT `Talles_tipoTalleId_foreign_idx` FOREIGN KEY (`tipoTalleId`) REFERENCES `tipotalles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `talles`
--

LOCK TABLES `talles` WRITE;
/*!40000 ALTER TABLE `talles` DISABLE KEYS */;
INSERT INTO `talles` VALUES (1,'XS','2024-03-15 11:24:04','2024-03-15 11:24:04',1),(2,'S','2024-03-15 11:24:04','2024-03-15 11:24:04',1),(3,'M','2024-03-15 11:24:04','2024-03-15 11:24:04',1),(4,'L','2024-03-15 11:24:04','2024-03-15 11:24:04',1),(5,'XL','2024-03-15 11:24:04','2024-03-15 11:24:04',1);
/*!40000 ALTER TABLE `talles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipotalles`
--

DROP TABLE IF EXISTS `tipotalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipotalles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipotalles`
--

LOCK TABLES `tipotalles` WRITE;
/*!40000 ALTER TABLE `tipotalles` DISABLE KEYS */;
INSERT INTO `tipotalles` VALUES (1,'Tipo Talle 1','2024-03-15 11:18:47','2024-03-15 11:18:47');
/*!40000 ALTER TABLE `tipotalles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `vendedorId` int DEFAULT NULL,
  `administrativoId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `username_2` (`username`),
  KEY `Usuarios_vendedorId_foreign_idx` (`vendedorId`),
  KEY `Usuarios_administrativoId_foreign_idx` (`administrativoId`),
  CONSTRAINT `Usuarios_administrativoId_foreign_idx` FOREIGN KEY (`administrativoId`) REFERENCES `administrativos` (`id`),
  CONSTRAINT `Usuarios_vendedorId_foreign_idx` FOREIGN KEY (`vendedorId`) REFERENCES `vendedores` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendedores`
--

DROP TABLE IF EXISTS `vendedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendedores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `legajo` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `puntoDeVentaId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `legajo` (`legajo`),
  KEY `Vendedores_puntoDeVentaId_foreign_idx` (`puntoDeVentaId`),
  CONSTRAINT `Vendedores_puntoDeVentaId_foreign_idx` FOREIGN KEY (`puntoDeVentaId`) REFERENCES `puntosdeventa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendedores`
--

LOCK TABLES `vendedores` WRITE;
/*!40000 ALTER TABLE `vendedores` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `estado` varchar(255) DEFAULT 'EN PROCESO',
  `total` decimal(10,0) DEFAULT '0',
  `tipoComprobante` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `clienteId` int DEFAULT NULL,
  `pagoId` int DEFAULT NULL,
  `nroComprobante` varchar(255) DEFAULT NULL,
  `vendedorId` int DEFAULT NULL,
  `sucursalId` int DEFAULT NULL,
  `PDVId` int DEFAULT NULL,
  `condicionEmpresa` varchar(255) DEFAULT NULL,
  `pagoTarjetaId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `clienteId` (`clienteId`),
  KEY `pagoId` (`pagoId`),
  KEY `Ventas_vendedorId_foreign_idx` (`vendedorId`),
  KEY `Ventas_sucursalId_foreign_idx` (`sucursalId`),
  KEY `Ventas_PDVId_foreign_idx` (`PDVId`),
  KEY `Ventas_pagoTarjetaId_foreign_idx` (`pagoTarjetaId`),
  CONSTRAINT `Ventas_clienteId_foreign_idx` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`),
  CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`),
  CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`pagoId`) REFERENCES `pagos` (`id`),
  CONSTRAINT `ventas_ibfk_3` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`),
  CONSTRAINT `ventas_ibfk_4` FOREIGN KEY (`pagoId`) REFERENCES `pagos` (`id`),
  CONSTRAINT `Ventas_pagoId_foreign_idx` FOREIGN KEY (`pagoId`) REFERENCES `pagos` (`id`),
  CONSTRAINT `Ventas_pagoTarjetaId_foreign_idx` FOREIGN KEY (`pagoTarjetaId`) REFERENCES `pagostarjetas` (`id`),
  CONSTRAINT `Ventas_PDVId_foreign_idx` FOREIGN KEY (`PDVId`) REFERENCES `puntosdeventa` (`id`),
  CONSTRAINT `Ventas_sucursalId_foreign_idx` FOREIGN KEY (`sucursalId`) REFERENCES `sucursales` (`id`),
  CONSTRAINT `Ventas_vendedorId_foreign_idx` FOREIGN KEY (`vendedorId`) REFERENCES `vendedores` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-15 12:12:47
