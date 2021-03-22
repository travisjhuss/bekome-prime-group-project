-- Create database called 'bekome'
-- Enums for "users" and "preferences" tables
CREATE TYPE "types" AS ENUM ('client', 'provider', 'admin');
CREATE TYPE "category_options" AS ENUM (
  'challenges', 
  'languages', 
  'qualities', 
  'formats', 
  'age_ranges', 
  'genders', 
  'ethnicities', 
  'sexual_orientations', 
  'religions', 
  'treatments', 
  'pronouns', 
  'states',
  'insurance'
);

-- Create Tables
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR(80) UNIQUE NOT NULL,
  "password" VARCHAR(1000) NOT NULL,
  "user_type" types,
  "filled_out_form" BOOLEAN DEFAULT false
);

CREATE TABLE "clients" (
  "id" SERIAL PRIMARY KEY,
  "clients_users_id" INT UNIQUE REFERENCES "users" ON DELETE CASCADE,
  "first_name" VARCHAR(255) NOT NULL,
  "last_name" VARCHAR(255) NOT NULL,
  "pic" VARCHAR(255),
  "date_of_birth" DATE,
  "write_in_pronouns" VARCHAR(100),
  "city" VARCHAR(255) NOT NULL,
  "state" VARCHAR(100) NOT NULL,
  "primary_reason" TEXT,
  "previous_therapy" BOOLEAN,
  "previous_experience" TEXT,
  "sliding_scale" BOOLEAN
);

CREATE TABLE "providers" (
  "id" SERIAL PRIMARY KEY,
  "providers_users_id" INT UNIQUE REFERENCES "users" ON DELETE CASCADE,
  "first_name" VARCHAR(255) NOT NULL,
  "last_name" VARCHAR(255) NOT NULL,
  "pic" VARCHAR(255),
  "video" VARCHAR(255),
  "city" VARCHAR(255) NOT NULL,
  "state" VARCHAR(100) NOT NULL,
  "date_of_birth" DATE NOT NULL,
  "write_in_pronouns" VARCHAR(100),
  "background" TEXT NOT NULL,
  "strengths" TEXT NOT NULL,
  "approach" TEXT NOT NULL,
  "license_number" VARCHAR(255) NOT NULL,
  "sliding_scale" BOOLEAN NOT NULL,
  "accepting_clients" BOOLEAN NOT NULL
);

CREATE TABLE "clients_providers_favs" (
  "id" SERIAL PRIMARY KEY,
  "clients_users_id" INT REFERENCES "users" ON DELETE CASCADE,
  "providers_users_id" INT REFERENCES "users" ON DELETE CASCADE
);

CREATE TABLE "preferences" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255),
  "category" category_options
);

CREATE TABLE "clients_preferences" (
  "id" SERIAL PRIMARY KEY,
  "clients_users_id" INT REFERENCES "users" ON DELETE CASCADE,
  "preferences_id" INT REFERENCES "preferences" ON DELETE CASCADE
);

CREATE TABLE "providers_preferences" (
  "id" SERIAL PRIMARY KEY,
  "providers_users_id" INT REFERENCES "users" ON DELETE CASCADE,
  "preferences_id" INT REFERENCES "preferences" ON DELETE CASCADE
);

CREATE TABLE "questions" (
  "id" SERIAL PRIMARY KEY,
  "content" TEXT
);

CREATE TABLE "providers_questions" (
  "id" SERIAL PRIMARY KEY,
  "providers_users_id" INT REFERENCES "users" ON DELETE CASCADE,
  "questions_id" INT REFERENCES "questions" ON DELETE CASCADE,
  "answer" TEXT,
  "displayed_on_card" BOOLEAN DEFAULT false
);

CREATE TABLE "messages" (
"id" SERIAL PRIMARY KEY,
"timestamp" TIMESTAMP DEFAULT NOW(),
"sender_users_id" INT REFERENCES "users" ON DELETE CASCADE,
"recipient_users_id" INT REFERENCES "users" ON DELETE CASCADE,
"read_by_recipient" BOOLEAN DEFAULT FALSE,
"message" TEXT,
"conversation" VARCHAR(100)
);

-- Insert statement for provider questions
INSERT INTO "questions" ("content")
VALUES
('I became a therapist because...'),
('My favorite hobbies are...'),
('Something that differentiates me from other therapists is...'),
('I can relate to childhoods/experiences/personal history including...'),
('I am NOT a therapist who...'),
('I have specialized training including...');

-- Insert statements for "preferences" table

-- Treatments
INSERT INTO "preferences" ("name", "category") 
VALUES
('CBT', 'treatments'),
('DBT', 'treatments'),
('Psychodynamic Therapy', 'treatments'),
('Humanistic Therapy', 'treatments'),
('Behavioral Therapy', 'treatments'),
('EMDR', 'treatments'),
('Meditation/Mindfulness', 'treatments'),
('Hypnosis', 'treatments');

-- Qualities
INSERT INTO "preferences" ("name", "category") 
VALUES
('Empathy', 'qualities'),
('Warmth', 'qualities'),
('Critical thinking', 'qualities'),
('Experience', 'qualities'),
('Intuition', 'qualities'),
('Elite/Specialized training', 'qualities'),
('Cultural competence', 'qualities'),
('Challenges clients', 'qualities');

-- Genders
INSERT INTO "preferences" ("name", "category")
VALUES
('Woman', 'genders'),
('Man', 'genders'),
('Transgender', 'genders'),
('Non-binary', 'genders'),
('Gender non-conforming', 'genders'),
('Intersex', 'genders'),
('Two Spirit', 'genders'),
('Prefer not to respond', 'genders');

-- Religions
INSERT INTO "preferences" ("name", "category")
VALUES
('Baha''i', 'religions'),
('Buddhism', 'religions'),
('Christianity', 'religions'),
('Confucianism', 'religions'),
('Hinduism', 'religions'),
('Islam', 'religions'),
('Jainism', 'religions'),
('Judaism', 'religions'),
('Shinto', 'religions'),
('Sikhism', 'religions'),
('Taoism', 'religions'),
('Spiritual', 'religions'),
('Not Religious', 'religions'),
('Other', 'religions');

-- Ethnicities
INSERT INTO "preferences" ("name", "category")
VALUES
('Native American', 'ethnicities'),
('Middle Eastern', 'ethnicities'),
('South Asian', 'ethnicities'),
('East Asian', 'ethnicities'),
('Native Hawaiian or Pacific Islander', 'ethnicities'),
('White', 'ethnicities'),
('Black', 'ethnicities'),
('Hispanic or Latino', 'ethnicities'),
('Other', 'ethnicities');

-- Challenges
INSERT INTO "preferences" ("name", "category")
VALUES
('Anxiety', 'challenges'),
('Panic attacks', 'challenges'),
('Dissociation', 'challenges'),
('Stress', 'challenges'),
('Depression', 'challenges'),
('Eating disorder', 'challenges'),
('Sex/porn addiction', 'challenges'),
('Substance abuse/addiction', 'challenges'),
('Abuse', 'challenges'),
('Trauma', 'challenges'),
('Grief', 'challenges'),
('Burnout', 'challenges'),
('OCD', 'challenges'),
('ADHD', 'challenges'),
('High achieving professionals', 'challenges');

-- Languages
INSERT INTO "preferences" ("name", "category")
VALUES
('Mandarin', 'languages'),
('Spanish', 'languages'),
('English', 'languages'),
('Hindi', 'languages'),
('Arabic', 'languages'),
('Portuguese', 'languages'),
('Bengali', 'languages'),
('Russian', 'languages'),
('Japanese', 'languages'),
('Punjabi', 'languages'),
('German', 'languages'),
('Vietnamese', 'languages'),
('French', 'languages'),
('Marathi', 'languages'),
('Tamil', 'languages'),
('Urdu', 'languages'),
('Turkish', 'languages'),
('Italian', 'languages'),
('Yue (inc. Cantonese)', 'languages'),
('Thai', 'languages'),
('Persian', 'languages'),
('Polish', 'languages'),
('Other', 'languages');

-- Sexual Orientations
INSERT INTO "preferences" ("name", "category")
VALUES
('Heterosexual', 'sexual_orientations'),
('Homosexual', 'sexual_orientations'),
('Bisexual', 'sexual_orientations'),
('Asexual', 'sexual_orientations'),
('Prefer not to respond', 'sexual_orientations'),
('Other', 'sexual_orientations');

-- Age ranges 
-- The formatting of these is important! 
-- The numbers can be adjusted, but must be formatted '24-30' or '60+'
INSERT INTO "preferences" ("name", "category")
VALUES
('24-30', 'age_ranges'),
('31-40', 'age_ranges'),
('41-50', 'age_ranges'),
('51-60', 'age_ranges'),
('60+', 'age_ranges');

-- Formats
INSERT INTO "preferences" ("name", "category")
VALUES
('Individual', 'formats'),
('Couples', 'formats'),
('In-Person', 'formats'),
('Remote', 'formats');

-- Pronouns
INSERT INTO "preferences" ("name", "category")
VALUES
('she/her', 'pronouns'),
('he/him', 'pronouns'),
('they/them', 'pronouns');

-- States
INSERT INTO "preferences" ("name", "category")
VALUES 
('Alaska', 'states'),
('Alabama', 'states'),
('Arizona', 'states'),
('Arkansas', 'states'),
('California', 'states'),
('Colorado', 'states'),
('Connecticut', 'states'),
('Delaware', 'states'),
('District of Columbia', 'states'),
('Florida', 'states'),
('Georgia', 'states'),
('Hawaii', 'states'),
('Idaho', 'states'),
('Illinois', 'states'),
('Indiana', 'states'),
('Iowa', 'states'),
('Kansas', 'states'),
('Kentucky', 'states'),
('Louisiana', 'states'),
('Maine', 'states'),
('Maryland', 'states'),
('Massachusetts', 'states'),
('Michigan', 'states'),
('Minnesota', 'states'),
('Mississippi', 'states'),
('Missouri', 'states'),
('Montana', 'states'),
('Nebraska', 'states'),
('Nevada', 'states'),
('New Hampshire', 'states'),
('New Jersey', 'states'),
('New Mexico', 'states'),
('New York', 'states'),
('North Carolina', 'states'),
('North Dakota', 'states'),
('Ohio', 'states'),
('Oklahoma', 'states'),
('Oregon', 'states'),
('Pennsylvania', 'states'),
('Puerto Rico', 'states'),
('Rhode Island', 'states'),
('South Carolina', 'states'),
('South Dakota', 'states'),
('Tennessee', 'states'),
('Texas', 'states'),
('Utah', 'states'),
('Vermont', 'states'),
('Virginia', 'states'),
('Washington', 'states'),
('West Virginia', 'states'),
('Wisconsin', 'states'),
('Wyoming', 'states');

-- Insurance
INSERT INTO "preferences" ("name", "category")
VALUES
('HealthPartners', 'insurance'),
('Medica', 'insurance'),
('United Healthcare', 'insurance'),
('Blue Cross Blue Shield', 'insurance'),
('UCare', 'insurance'),
('MinnesotaCare', 'insurance'),
('Medical Assistance', 'insurance');