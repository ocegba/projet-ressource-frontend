import JSONBig from 'json-bigint';
import prisma from '../../../prisma/prisma'

export default async (req, res) => {
    const { libelleCategorie } = req.body;
    try {
        const result = await prisma.categorie.deleteMany({
            where: {
                libelleCategorie: libelleCategorie,
            },
        });
        res.status(200).json(JSONBig.parse(JSONBig.stringify((result))));
    } catch (err) {
        console.log(err);
        res.status(403).json({ err: "Problème suppression catégorie" });
    }
};