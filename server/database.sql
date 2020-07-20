CREATE DATABASE mernagendatwo;

CREATE TABLE customers
(
    customer_id SERIAL PRIMARY KEY,
    customer_name varchar(60),
    customer_lastname varchar(60),
    customer_email varchar(100),
    customer_phone varchar(15),
    date_registered date,
    time_registered time,
    customer_schedule varchar(60),
    comments longtext
);

