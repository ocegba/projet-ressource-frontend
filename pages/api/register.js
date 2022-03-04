const { dbPool } = require("./dbConfig");
const Pool = require('pg-pool');
const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
import { hash } from 'bcrypt';


export default async function handler(req, res) {

    const body = req.body;

    // const prenomUtilisateur = body.username;
    const pseudoUtilisateur = body.username;
    const mailUtilisateur = body.email;

    if (req.method === 'POST') {
        res.redirect('/profil');
        // if (checkEmail(mailUtilisateur) === true && checkUserName(pseudoUtilisateur) === true) {
            hash(req.body.password, 1, async function (err, hash) {
            dbPool.query('INSERT INTO compte ("pseudoUtilisateur","mailUtilisateur","mdpUtilisateur","dateCreationUtilisateur") VALUES ($1,$2,$3,NOW()) RETURNING * ',
                [pseudoUtilisateur, mailUtilisateur, hash], (error, result) => {
                    // console.log(error);
                    if (result) {
                        res.redirect('/profil');
                    } else {
                        throw error;
                    }
                    // try {
                    //     redirect('/profil');
                    // } catch (error) {
                    //     throw error;
                    // }

                });
            });
            // }
        // } else {
        //     res.status(405);
        //     res.end();
        // }
    }
}

// function checkEmail(mail) {   // test if account exists with email
//     dbPool.query('SELECT * FROM compte WHERE "mailUtilisateur" = $1', [mail], (error, result) => {
//         try {
//             if (result.rowCount === 0) {
//                 return false;
//             } else {

//                 return true;
//             }
//         } catch (error) {
//             throw error;
//         }
//     }
// }

// function checkUserName(pseudo) {   // test if account exists with email
//     dbPool.query('SELECT * FROM compte WHERE "pseudoUtilisateur" = $1', [pseudo], (error, result) => {
//         try {
//             if (result.rowCount === 0) {
//                 return false;
//             } else {
//                 return true;
//             }
//         } catch (error) {
//             throw error;
//         }
//     }
// }

