BEGIN;

DROP TABLE IF EXISTS projects, tasks, users CASCADE;

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  project_name VARCHAR(255),
  tasks INTEGER [],
 start_at Date,
    end_at Date
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
   task_name VARCHAR(255)
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
    
);

INSERT INTO users(username, password) VALUES
('riham', 'riham1234');
COMMIT;