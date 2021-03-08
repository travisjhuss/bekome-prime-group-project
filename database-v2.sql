CREATE TYPE "types" AS ENUM ('client', 'provider', 'admin');
CREATE TYPE "category_options" AS ENUM 
('challenges', 'languages', 'qualities', 'formats', 'age_ranges', 
'genders', 'ethnicities', 'sexual_orientations', 'religions', 'treatments');

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL,
  "user_type" types
);

CREATE TABLE "clients" (
  "id" SERIAL PRIMARY KEY,
  "clients_users_id" INT REFERENCES "users",
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
  "providers_users_id" INT REFERENCES "users",
  "first_name" VARCHAR(255),
  "last_name" VARCHAR(255),
  "pic" VARCHAR(255),
  "video" VARCHAR(255),
  "location" VARCHAR(255),
  "date_of_birth" DATE,
  "pronouns" VARCHAR(100),
  "background" TEXT,
  "strengths" TEXT,
  "approach" TEXT,
  "insurance" BOOLEAN,
  "sliding_scale" BOOLEAN
);

CREATE TABLE "clients_providers_favs" (
  "id" SERIAL PRIMARY KEY,
  "clients_users_id" INT REFERENCES "users",
  "providers_users_id" INT REFERENCES "users"
);

CREATE TABLE "preferences" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255),
  "category" category_options
);

CREATE TABLE "clients_preferences" (
  "id" SERIAL PRIMARY KEY,
  "clients_users_id" INT REFERENCES "users",
  "preferences_id" INT REFERENCES "preferences"
);

CREATE TABLE "providers_preferences" (
  "id" SERIAL PRIMARY KEY,
  "providers_users_id" INT REFERENCES "users",
  "preferences_id" INT REFERENCES "preferences"
);

CREATE TABLE "questions" (
  "id" SERIAL PRIMARY KEY,
  "content" TEXT
);

CREATE TABLE "providers_questions" (
  "id" SERIAL PRIMARY KEY,
  "providers_users_id" INT REFERENCES "users",
  "questions_id" INT REFERENCES "questions",
  "answer" TEXT
);

INSERT INTO "questions" ("content")
VALUES
('I became a therapist because...'),
('My favorite hobbies are...'),
('Something that differentiates me from other therapists is...'),
('I can relate to childhoods/experiences/personal history including...'),
('I am NOT a therapist who...'),
('I have specialized training including...');

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
('Zoroastrianism', 'religions');

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

INSERT INTO "preferences" ("name", "category")
VALUES
('Anxiety', 'challenges'),
('Panic attacks', 'challenges'),
('Dissociation', 'challenges'),
('Stress', 'challenges'),
('Depression', 'challenges'),
('Eating disorder', 'challenges'),
('Sex / porn addiction', 'challenges'),
('Substance abuse / addiction', 'challenges'),
('Abuse', 'challenges'),
('Trauma', 'challenges'),
('Grief', 'challenges'),
('Burnout', 'challenges'),
('OCD', 'challenges'),
('ADHD', 'challenges'),
('High achieving professionals', 'challenges');

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

INSERT INTO "preferences" ("name", "category")
VALUES
('Heterosexual', 'sexual_orientations'),
('Homosexual', 'sexual_orientations'),
('Bisexual', 'sexual_orientations'),
('Asexual', 'sexual_orientations'),
('Prefer not to respond', 'sexual_orientations'),
('Other', 'sexual_orientations');

INSERT INTO "preferences" ("name", "category")
VALUES
('Under 25', 'age_ranges'),
('25-34', 'age_ranges'),
('35-44', 'age_ranges'),
('45-54', 'age_ranges'),
('55-64', 'age_ranges'),
('Over 65', 'age_ranges');

INSERT INTO "preferences" ("name", "category")
VALUES
('Empathy', 'qualities'),
('Warmth', 'qualities'),
('Critical thinking', 'qualities'),
('Experience', 'qualities'),
('Intuition', 'qualities'),
('Elite/specialized training', 'qualities'),
('Cultural competence', 'qualities'),
('Challenges patients', 'qualities');

INSERT INTO "preferences" ("name", "category")
VALUES
('Individual', 'formats'),
('Couples', 'formats'),
('In-Person', 'formats'),
('Remote', 'formats');

INSERT INTO "providers" ("providers_users_id", "first_name", "last_name", "pic", "video", "location", "date_of_birth", 
"pronouns", "background", "strengths", "approach", "insurance", "sliding_scale")
VALUES
(1, 'Shania', 'Lewis', 'https://i1.wp.com/360degrees.blog/wp-content/uploads/2018/09/iStock-843530298-1.jpg?fit=665%2C444&ssl=1', NULL, 'Minneapolis, MN', '1987-02-03', 'she/her', 'Licensed LMFT with four years experience.', 'Listening, problem solving, new ideas', 'I am assertive with my clients, but also validating and empathetic.', TRUE, FALSE),
(2, 'Ben', 'Smith', 'https://www.bestcounselingdegrees.net/app/uploads/2020/07/GettyImages-1171809650.jpg', NULL, 'St. Paul, MN', '1964-02-12', 'he/him', 'Licensed grief and crisis counselor with a knack for finding personalized ways to help my clients.', 'Listening, empathy, mindfulness', 'I want to be there for my clients.', TRUE, TRUE);

INSERT INTO "clients" ("clients_users_id", "first_name", "last_name", "pic", "date_of_birth", "pronouns",
 "location", "primary_reason", "previous_therapy", "previous_experience")
VALUES
(3,'Tim', 'Miller', 'https://st4.depositphotos.com/12982378/22072/i/600/depositphotos_220729084-stock-photo-smiling-adult-man-crossed-arms.jpg', '1970-05-03', 'he/him', 'Minnetonka, MN', 'Finding inner peace.', TRUE, 'Group therapy.'),
(4, 'Sarah', 'McMellan', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80', '1986-12-02', 'she/her', 'St. Paul, MN', 'Help with dissociation and anxiety.', FALSE, NULL);

CREATE TABLE "messaging" (
"id" SERIAL PRIMARY KEY,
"sender_id" INT REFERENCES "users",
"recipient_id" INT REFERENCES "users",
"author" VARCHAR(255),
"message" TEXT
);

