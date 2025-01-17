/*
Execute this file from the command line by typing:
  psql postgres < db/schema/schema.sql
*/

-- DROP DATABASE IF EXISTS encompass;
-- CREATE DATABASE encompass;

\c encompass;


drop table if exists users cascade;
drop table if exists categories cascade;
drop table if exists todos cascade;

DROP EXTENSION IF EXISTS pgcrypto;
DROP EXTENSION IF EXISTS citext;


CREATE EXTENSION pgcrypto;
CREATE EXTENSION citext;

CREATE TABLE users (
  user_id SERIAL,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  email CITEXT UNIQUE NOT NULL,
  opt_in BOOLEAN DEFAULT FALSE,
  password TEXT,

  PRIMARY KEY (user_id),
  CONSTRAINT chk_firstName
    CHECK(char_length(firstName) <= 20),
  CONSTRAINT chk_lastName
    CHECK(char_length(lastName) <= 20)
);

CREATE TABLE categories (
  category_id SERIAL,
  category CITEXT,
  user_id INT,
  color VARCHAR(7),

  PRIMARY KEY (category_id),
  CONSTRAINT chk_category
    CHECK (char_length(category) <= 30),
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
      REFERENCES users(user_id),
  UNIQUE (user_id, category),
  UNIQUE (user_id, color)
);
CREATE TABLE todos (
  todo_id SERIAL,
  user_id INT,
  task TEXT NOT NULL,
  description TEXT,
  category_id INT,
  start_time TIMESTAMP DEFAULT NULL,
  end_time TIMESTAMP DEFAULT NULL,
  completed BOOLEAN DEFAULT FALSE,
  appointment BOOLEAN DEFAULT FALSE,

  PRIMARY KEY (todo_id),
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
      REFERENCES users(user_id),
  CONSTRAINT fk_category
    FOREIGN KEY (category_id)
      REFERENCES categories(category_id),
  CONSTRAINT chk_task
    CHECK (char_length(task) <= 100)
);

-- Load some preliminary data

\COPY users FROM './db/schema/users.csv' DELIMITER ',' CSV HEADER;
\COPY categories FROM './db/schema/categories.csv' DELIMITER ',' CSV HEADER;
\COPY todos FROM './db/schema/todos.csv' DELIMITER ',' CSV HEADER;

-- After initial load, reset numbering sequence to next value

SELECT setval('users_user_id_seq', (SELECT MAX(user_id) FROM users)+1);
SELECT setval('categories_category_id_seq', (SELECT MAX(category_id) FROM categories)+1);
SELECT setval('todos_todo_id_seq', (SELECT MAX(todo_id) FROM todos)+1);