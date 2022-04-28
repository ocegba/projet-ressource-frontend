const { dbPool } = require("./dbConfig");
import { hash } from 'bcrypt';


export default async function handler(req, res) {

    const body = req.body;

    if (req.method === 'POST') {
            hash(body.password, 1, async function (err, hash) {
            dbPool.query('DELETE FROM compte WHERE "mailUtilisateur" = $1', [body.email], (error, result) => {
                    if (result) {
                        res.redirect('/profil/profil');
                    } else {
                        throw error;
                    }

                });
            });
    }
}