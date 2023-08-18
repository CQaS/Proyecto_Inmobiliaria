CREATE DATABASE inmobiliaria;
USE INMOBILIARIA;

CREATE TABLE inmueble (
id_inmueble INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
dir_inmueble VARCHAR(100),
tipo_inmueble VARCHAR(25),
tipo_operacion VARCHAR(45),
sup_total INT, 
sup_cubierta INT, 
sup_semicub INT, 
cant_plantas INT, 
cant_dormitorios INT, 
cant_banos INT, 
cochera BOOLEAN,
antiguedad INT, 
condicion INT, 
expensas BOOLEAN,
descripcion VARCHAR(200),
tipo_servicio VARCHAR(45),
id_cliente INT,
imagen1 LONGBLOB,
imagen2 LONGBLOB,
imagen3 LONGBLOB
);

CREATE TABLE clientes (
id_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nom_cliente VARCHAR(70),
dni_cliente VARCHAR(45),
dir_cliente VARCHAR(100),
tel_cliente VARCHAR(45),
email_cliente VARCHAR(45),
ciudad_cliente VARCHAR(45),
pais_cliente VARCHAR(45),
fechnac DATE,
id_catcliente INT
);

CREATE TABLE empleados (
id_empleado INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nom_empleado VARCHAR(70),
puesto_empleado VARCHAR(45),
id_inmueble INT
);

CREATE TABLE categoria_empleado (
id_categoria INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
tipo_inmueble VARCHAR(45)
);

CREATE TABLE operaciones (
id_operacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
tipo_operacion VARCHAR(45)
);

CREATE TABLE contrato (
id_contrato INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
tipo_operacion VARCHAR(45),
fecha_ing DATE,
id_cliente INT
);

CREATE TABLE categoria_cliente (
id_catcliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nom_catcliente VARCHAR(45)
);

CREATE TABLE puesto_empleado (
id_puesto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nom_puesto VARCHAR(45)
);

CREATE TABLE servicios (
id_servicio INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
tipo_servicio VARCHAR(45)
);
 