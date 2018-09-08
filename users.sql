CREATE TABLE `users`
(
    `id` INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
	`login` VARCHAR(32) UNIQUE NOT NULL,
    `password` VARCHAR(32) NOT NULL,
  	`email` VARCHAR(32) UNIQUE NOT NULL,
	`phone` VARCHAR(20) UNIQUE NOT NULL,
	`fullname` VARCHAR(64),
	`index` INT(16),
    `city` VARCHAR(32),
	`street` VARCHAR(32),
   	`building` VARCHAR(16),
    `created` VARCHAR(16),
	`birthday` VARCHAR(16),
    `permissions` int(8) DEFAULT 0,
    `comment` VARCHAR(32),
    `creator_id` INT
);


