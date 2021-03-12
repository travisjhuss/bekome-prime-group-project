const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for providers
 */
// router.get('/', rejectUnauthenticated, async (req, res) => {
//   const connection = await pool.connect();

//   try {
//     // Begin transaction
//     await connection.query('BEGIN;');

//     // first query gets array of all providers and relevant data
//     // const providersSQL = `
//     //   SELECT
//     //   "providers_users_id", "first_name", "last_name", "pic", "video", "location"
//     //   FROM "providers";
//     // `;

//     // first query gets array of all providers and relevant data
//     // subquery excludes providers that current user has added to favorites list
//     const providersSQL = `
//     SELECT
//     "providers_users_id", "first_name", "last_name", "pic", "video", "location" FROM "providers"
//     WHERE
// 	    NOT EXISTS (
// 		    SELECT "clients_users_id", "providers_users_id" FROM "clients_providers_favs"
// 		    WHERE "clients_users_id" = $1 AND "providers_users_id" = "providers".providers_users_id
// 	    );
//     `;
//     const providersArray = await connection.query(providersSQL, [req.user.id]);

//     // console.log(providersArray.rows);

//     // second query will get answers to questions for specific provider $1
//     const answersSQL = `
//       SELECT "providers_users_id", "questions_id", "answer" FROM "providers_questions"
//       WHERE "providers_questions".providers_users_id = $1;
//     `;

//     // third query will get pronouns and languages for specific provider $1
//     const preferencesSQL = `
//       SELECT "preferences".name, "preferences".category FROM "providers_preferences"
//       JOIN "preferences" ON "providers_preferences".preferences_id = "preferences".id
//       WHERE "providers_preferences".providers_users_id = $1
//       AND ("preferences".category = 'languages'
//       OR "preferences".category = 'pronouns');
//     `;

//     // fullProviderArray will become data that is sent back to client
//     const fullProviderArray = [];

//     // second and third queries are looped for each provider gathered from first query
//     for (let i = 0; i < providersArray.rows.length; i++) {
//       // fullProviderObject will become the packaged object with all data for each provider's card in ExploreView
//       const fullProviderObject = {
//         ...providersArray.rows[i],
//         pronouns: '',
//         languages: '',
//       };

//       // storing result of second query in fullProviderObject as a property
//       const answers = await connection.query(answersSQL, [
//         providersArray.rows[i].providers_users_id,
//       ]);
//       fullProviderObject.answers = answers.rows;

//       // storing result of third query in fullProviderObject as a property
//       const preferences = await connection.query(preferencesSQL, [
//         providersArray.rows[i].providers_users_id,
//       ]);
//       // console.log(preferences.rows)

//       let languageCount = 0;
//       let pronounsCount = 0;
//       // this for-loop parses the array of preferences into a string depending on it's category
//       // then inserts those strings into the fullProviderObject as properties
//       // the ternary operators concatenate lists of 2 or more languages / pronoun sets and seperate them with a comma
//       for (let i = 0; i < preferences.rows.length; i++) {
//         const pref = preferences.rows[i];
//         if (pref.category === 'languages') {
//           languageCount++;

//           languageCount > 1
//             ? (fullProviderObject.languages += ', ' + pref.name)
//             : (fullProviderObject.languages += pref.name);
//         } else if (pref.category === 'pronouns') {
//           pronounsCount++;

//           pronounsCount > 1
//             ? (fullProviderObject.pronouns += '; ' + pref.name)
//             : (fullProviderObject.pronouns += pref.name);
//         }
//       }
//       // console.log(fullProviderObject)

//       // pushing each fullProvider object into the array that will be sent to the client
//       fullProviderArray.push(fullProviderObject);
//     }
//     // console.log(fullProviderArray);

//     await connection.query('COMMIT;');
//     res.send(fullProviderArray);
//   } catch (error) {
//     console.log('ERROR getting providers in explore.router', error);
//     await connection.query('ROLLBACK;');
//     res.sendStatus(500);
//   } finally {
//     connection.release();
//   }
// });

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
      "providers".location, 
      "providers".insurance, 
      "providers".date_of_birth, 
      "providers".write_in_pronouns, 
      "providers".sliding_scale,
      ARRAY_AGG("providers_preferences".preferences_id) AS "preferences_array" 
      FROM "providers" JOIN "providers_preferences" ON 
      "providers".providers_users_id = 
      "providers_preferences".providers_users_id
      GROUP BY "providers".id;
    `;

    // Sends the query to db, saves data to 'providers' var
    const providers = await connection.query(sqlTextProviders);

    // Gets all needed information from "providers_questions" junction table
    const sqlTextQuestions = `
      SELECT "providers_users_id", "questions_id", "answer" 
      FROM "providers_questions";
    `;

    // Sends the query to db, saves data to 'questions' var
    const questions = await connection.query(sqlTextQuestions);

    // Packages the data to send to client
    const dataToSend = providers.rows.map((provider) => {
      // Since we're only using 'providers_users_id', deleting the 'id' here
      // so there's no confusion on the client side
      delete provider.id;
      // Add the answers to each provider object as its own array of objects
      // with key of 'questions'
      return {
        ...provider,
        questions: questions.rows.filter((answer) => {
          return answer.providers_users_id === provider.providers_users_id;
        }),
      };
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

// POST route to add a provider to a client's favorites, adds an entry to
// 'clients_providers_favs' junction table
router.post('/fav', (req, res) => {
  const { clients_users_id, providers_users_id } = req.body;

  const sqlText = `
    INSERT INTO "clients_providers_favs" 
    ("clients_users_id", "providers_users_id")
    VALUES ($1, $2);
  `;

  pool
    .query(sqlText, [clients_users_id, providers_users_id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log(`Error in POST with query ${sqlText}`, err);
      res.sendStatus(500);
    });
});

// Removes a favorite from a client's profile, deletes entry on
// 'clients_providers_favs' junction table
router.delete('/fav/:id', (req, res) => {
  const sqlText = `
    DELETE FROM "clients_providers_favs" 
    WHERE "clients_users_id" = $1 AND "providers_users_id" = $2;
  `;

  pool
    .query(sqlText, [req.user.id, req.params.id])
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log(`Error in DELETE with query ${sqlText}`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
