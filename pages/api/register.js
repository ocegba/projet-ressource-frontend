const { dbPool } = require("./dbConfig");
const Pool = require('pg-pool');
const bcrypt = require("bcrypt");

export default function handler(req, res) {

    const body = req.body;

    const prenomUtilisateur = "Elies";
    const nomUtilisateur = "TEST";
    const pseudoUtilisateur = "elitesto";
    const mdpUtilisateur = "mdptest";
    const mailUtilisateur = "test@test.fr"

    if (req.method === 'POST') {
        dbPool.query('INSERT INTO compte ("prenomUtilisateur","nomUtilisateur","pseudoUtilisateur","mailUtilisateur","mdpUtilisateur","dateCreationUtilisateur") VALUES ($1,$2,$3,$4,$5,NOW()) RETURNING * ',
            [prenomUtilisateur, nomUtilisateur, pseudoUtilisateur, mailUtilisateur, mdpUtilisateur], (error, results) => {
                try {
                    if (result.rowCount !== 0) {
                        // res.status(200).json(res.rows);
                        const user = result.rows[0];
                        bcrypt.compare(req.body.password, user.mdpUtilisateur, (err, isMatch) => {
                            try {
                                if (isMatch === true) {
                                    res.redirect('/');
                                    // return done(null, user);
                                }
                                else {
                                    res.redirect('/signin');
                                    // return done(null, false, { message: "Mot de passe incorrecte" });
                                }
                            } catch (err) {
                                throw err
                            }
                        });
                    } else {
                        res.redirect('/signin');
                    }
                } catch (err) {
                    throw err
                }

            });

    } else {
        res.status(405);
        res.end();
    }
}