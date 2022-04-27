import prisma from '../../../prisma/prisma'
import JSONBig from 'json-bigint';

export default async (req, res) => {
    const {
        idCompte,
        prenomUtilisateur,
        nomUtilisateur,
        regionUtilisateur,
        mailUtilisateur,
        ageUtilisateur,
        departementUtilisateur,
    } = req.body;

    try {
        const updateInfo = await prisma.compte.update({
            where: {
                idCompte : idCompte,
            },
            data: {
                prenomUtilisateur,
                nomUtilisateur,
                regionUtilisateur,
                mailUtilisateur,
                ageUtilisateur : parseInt(ageUtilisateur),
                departementUtilisateur,
            }
        });
        res.status(200).json(JSONBig.parse(JSONBig.stringify((updateInfo))));
    } catch (error) {
        res.status(403).json({ err: "Erreur pendant la modification du compte utilisateur" });
    }
};