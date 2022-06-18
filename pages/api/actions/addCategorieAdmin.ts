import JSONBig from 'json-bigint';
import prisma from '../../../prisma/prisma'

const defaultFonction = async (req, res) => {
    const data = req.body;
    console.log(data)
    try {
        const result = await prisma.categorie.create({
            data: {
                ...data,
            },
        });
        console.log(result)
        res.status(200).json(JSONBig.parse(JSONBig.stringify((result))));
    } catch (err) {
        console.log(err);
        res.status(403).json({ err: "Problème ajout catégorie" });
    }
};

export default defaultFonction;