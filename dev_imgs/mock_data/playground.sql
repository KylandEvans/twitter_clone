use twitter_clone;

drop table users;
drop table tweets;
drop table sessions;

create table users (
	id int AUTO_INCREMENT PRIMARY KEY,
	name varchar(50) NOT NULL,
    phone VARCHAR(10),
    email VARCHAR(100),
    dob DATE NOT NULL,
    track BOOLEAN,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE tweets (
	tweetId int AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    tweet_body VARCHAR(2000) NOT NULL,
    likes INT, 
    retweets INT,
    comments INT,
	views INT,
    CONSTRAINT 	`fk_user_id`
    FOREIGN KEY (user_id) 
    REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE likes (
	likeId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    tweetId INT,
    userId INT, 
    FOREIGN KEY (tweetId) REFERENCES tweets(tweetId),
    FOREIGN KEY (userId) REFERENCES users(id)
);

SELECT * FROM users;
SELECT * FROM tweets;
SELECT * FROM likes;
SELECT * FROM sessions;

SELECT * FROM users WHERE id > 1000;
SELECT * FROM tweets WHERE user_id > 1000;

INSERT INTO users(name, handle, phone, email, dob, track, password)
VALUES ("Kyland",  "Kyland_Evans","5555555555", null, "2022-05-23", true, "Kyland1");
SELECT * FROM users WHERE email = "kyland@email.com";
DELETE FROM users WHERE id < 1000;

SELECT * FROM users WHERE email = "kyland@email.com" OR phone = "5555555555";

SHOW TABLES;

DESC users;
DESC tweets;
DESC likes;

select * from tweets, users where tweetId <= 50 AND tweets.user_id = users.id;
