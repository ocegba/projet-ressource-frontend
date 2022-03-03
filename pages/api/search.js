const { dbPool } = require("./dbConfig");
const Pool = require('pg-pool');
const bcrypt = require("bcrypt");

export default function handler(req, res) {
    if (req.method === 'POST') {
        dbPool.query('SELECT * FROM compte WHERE "mailUtilisateur" = $1', [req.body.email], (err, result) => {
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