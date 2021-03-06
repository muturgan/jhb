CREATE TABLE `appversions`
(
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
	`version` VARCHAR(32) NOT NULL,
	`appID` INT UNSIGNED REFERENCES `apps` (id) ON DELETE NO ACTION,
  	`hause` VARCHAR(32) NOT NULL,
  	`brand` VARCHAR(32) NOT NULL,
  	`model` VARCHAR(32) NOT NULL,
  	`oem` VARCHAR(32) NOT NULL,
  	`platform` VARCHAR(32) NOT NULL,
  	`language` VARCHAR(32) NOT NULL,
	`updatingdate` DATETIME,
	`creationdate` DATETIME
);
