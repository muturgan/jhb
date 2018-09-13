CREATE TABLE `news`
(
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
	`title` VARCHAR(32) UNIQUE NOT NULL,
    `text` VARCHAR(320) NOT NULL,
  	`fws` VARCHAR(32),
  	`apps` VARCHAR(32),
  	`hause` VARCHAR(32),
  	`brand` VARCHAR(32),
  	`model` VARCHAR(32),
  	`oem` VARCHAR(32),
	`likes` INT(16),
	`dislikes` INT(16),
	`updatingdate` DATETIME,
	`creationdate` DATETIME
);
