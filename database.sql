
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TYPE "types" AS ENUM ('client', 'provider', 'admin');
CREATE TYPE "category_options" AS ENUM 
('challenges', 'languages', 'qualities', 'format', 'age_range', 'gender', 
'ethnicity', 'sexual_orientation', 'religion', 'location');

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "user_type" types
);

CREATE TABLE "clients" (
  "id" SERIAL PRIMARY KEY,
  "users_id" INT REFERENCES "users",
  "first_name" VARCHAR(255),
  "last_name" VARCHAR(255),
  "pic" VARCHAR(255),
  "date_of_birth" DATE,
  "pronouns" VARCHAR(100),
  "location" VARCHAR(255),
  "primary_reason" TEXT,
  "previous_therapy" BOOLEAN,
  "previous_experience" TEXT
);

CREATE TABLE "providers" (
  "id" SERIAL PRIMARY KEY,
  "users_id" INT REFERENCES "users",
  "first_name" VARCHAR(255),
  "last_name" VARCHAR(255),
  "pic" VARCHAR(255),
  "video" VARCHAR(255),
  "date_of_birth" DATE,
  "pronouns" VARCHAR(100),
  "background" TEXT,
  "strengths" TEXT,
  "approach" TEXT
);

CREATE TABLE "clients_providers_favs" (
  "id" SERIAL PRIMARY KEY,
  "clients_id" INT REFERENCES "clients",
  "providers_id" INT REFERENCES "providers"
);

CREATE TABLE "preferences" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255),
  "category" category_options
);

CREATE TABLE "clients_preferences" (
  "id" SERIAL PRIMARY KEY,
  "clients_id" INT REFERENCES "clients",
  "preferences_id" INT REFERENCES "preferences"
);

CREATE TABLE "providers_preferences" (
  "id" SERIAL PRIMARY KEY,
  "providers_id" INT REFERENCES "providers",
  "preferences_id" INT REFERENCES "preferences"
);

CREATE TABLE "questions" (
  "id" SERIAL PRIMARY KEY,
  "content" TEXT
);

CREATE TABLE "providers_questions" (
  "id" SERIAL PRIMARY KEY,
  "providers_id" INT REFERENCES "providers",
  "questions_id" INT REFERENCES "questions",
  "answer" TEXT
);