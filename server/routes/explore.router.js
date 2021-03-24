const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to retrieve all providers from database
router.get('/', rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect();
  try {
    connection.query('BEGIN;');

    // Obtains all needed info from "providers" table, along with array of ID's
    // of all preferences each provider has
    const sqlTextProviders = `
      SELECT "providers".id,
        "providers".providers_users_id, 
        "providers".first_name, 
        "providers".last_name, 
        "providers".pic, 
        "providers".video, 
        "providers".city,
        "providers".state, 
        "providers".accepting_clients, 
        EXTRACT(YEAR FROM AGE("providers".date_of_birth)) AS "age",
        "providers".write_in_pronouns, 
        "providers".sliding_scale,
        ARRAY_AGG("providers_preferences".preferences_id) AS "preferences_array" 
      FROM "providers" 
      JOIN "providers_preferences" ON "providers".providers_users_id 
        = "providers_preferences".providers_users_id
      GROUP BY "providers".id;
    `;
    // Sends the query to db, saves data to 'providers' var
    const providers = (await connection.query(sqlTextProviders)).rows;

    // Gets all needed information from "providers_questions" junction table
    const sqlTextQuestions = `
      SELECT "providers_users_id", "questions_id", "answer", "displayed_on_card" 
      FROM "providers_questions";
    `;
    // Sends the query to db, saves data to 'questions' var
    const providerAnswers = (await connection.query(sqlTextQuestions)).rows;

    // Gets all the age ranges from 'preferences' table to assign to providers
    const sqlTextAgeRanges = `
      SELECT * FROM "preferences" WHERE "category" = 'age_ranges';
    `;
    // Sends query to db, saves data to 'ageRanges' var, then .map()
    const ageRanges = (await connection.query(sqlTextAgeRanges)).rows.map(
      (item) => {
        // Split the name of each entry in ageRanges to array of two numbers,
        // These numbers are the min and max age of each range
        const range = item.name.replace('+', '').split('-');
        return {
          id: item.id, // id of age range
          ageMin: Number(range[0]), // number of age min
          ageMax: Number(range[1]) || null, // number of age max or null if none
        };
      }
    );

    // Gets any saved providers the current user has
    const sqlTextSavedProvider = `
      SELECT * FROM "clients_providers_favs" WHERE "clients_users_id" = $1;
    `;
    const savedProviders = (
      await connection.query(sqlTextSavedProvider, [req.user.id])
    ).rows;

    // Packages the data to send to client
    const dataToSend = providers.map((provider) => {
      // Since we're only using 'providers_users_id', deleting the 'id' here
      // so there's no confusion on the client side
      delete provider.id;

      // Assign category of age range to each provider
      ageRanges.forEach((item) => {
        if (
          provider.age >= item.ageMin &&
          (provider.age <= item.ageMax || item.ageMax === null)
        ) {
          return provider.preferences_array.push(item.id);
        }
      });

      // Sees if this provider is saved by the current user
      const saved =
        savedProviders.findIndex(
          (item) => item.providers_users_id === provider.providers_users_id
        ) > -1;

      // Find this provider's answers to the provider questions
      const answers = providerAnswers.filter(
        (answer) => answer.providers_users_id === provider.providers_users_id
      );

      // Add answers to each provider object as its own array of objects
      // with key of 'questions'
      return { ...provider, questions: answers, saved };
    });

    // End transaction
    connection.query('COMMIT;');
    // Send data to client
    res.send(dataToSend);
  } catch (err) {
    console.log('Error in GET transaction in explore.router, rollback:', err);
    await connection.query('ROLLBACK;');
    res.sendStatus(500);
  } finally {
    // End connection to db
    connection.release();
  }
});

module.exports = router;
