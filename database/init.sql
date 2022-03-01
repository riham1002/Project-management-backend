BEGIN;

DROP TABLE IF EXISTS projects, tasks, users CASCADE;

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  project_name VARCHAR(255) UNIQUE,
  start_at DATE,
    end_at DATE
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
   task_name VARCHAR(225),
   project_id INTEGER REFERENCES projects(id)
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
    
);
INSERT INTO projects(project_name,start_at,end_at) VALUES 
('workshops','04-03-2022' , '12-03-2022'), ('mindcet project','01-03-2022',  '12-03-2022'),
 ('dell project', '11-03-2022',  '12-03-2022'),  ('regional physics matriculation','12-03-2022',  '04-04-2022');

INSERT INTO tasks ( task_name, project_id ) VALUES
('choosing the topics',1),('choosing the dates',1),('preparing the content of the workshops',1), 
('choosing the students',2), ('preparing the list of the courses',2),('students choose their course',2),
('meeting with the staff of dell',3),('putting an annual plan',3),
('putting an annual plan',4), ('hiring physics teachers',4),
('setting a meeting with the schools that participate in the project',4);
INSERT INTO users(username, password) VALUES
('riham', 'riham1234');
COMMIT;