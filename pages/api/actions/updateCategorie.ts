import prisma from '../../../prisma/prisma'
import JSONBig from 'json-bigint';

export default async (req, res) => {
    const {
        libelleCategorie,
        formerCategorie,
    } = req.body;

    try {
        const updateInfo = await prisma.categorie.updateMany({
            where: {
                libelleCategorie : formerCategorie,
            },
            data: {
                libelleCategorie: libelleCategorie,
            }
        });
        res.status(200).json(JSONBig.parse(JSONBig.stringify((updateInfo))));
    } catch (error) {
        res.status(403).json({ err: "Erreur pendant la modification du compte utilisateur" });
    }
};