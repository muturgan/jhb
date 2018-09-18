CREATE TABLE `users`
(
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
	`login` VARCHAR(32) UNIQUE NOT NULL,
    `password` VARCHAR(32) NOT NULL,
  	`email` VARCHAR(32) UNIQUE NOT NULL,
	`phone` VARCHAR(32) UNIQUE NOT NULL,
	`fullname` VARCHAR(64),
	`birthday` DATE,
	`index` VARCHAR(16),
    `city` VARCHAR(32),
	`street` VARCHAR(32),
   	`building` VARCHAR(16),
    `permissions` INT(8) UNSIGNED DEFAULT 0,
    `comment` VARCHAR(32),
    `status` VARCHAR(8) DEFAULT 'offline',
	`updatingdate` DATETIME,
	`creationdate` DATETIME
);
