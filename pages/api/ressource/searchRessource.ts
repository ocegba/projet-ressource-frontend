import prisma from '../../../prisma/prisma'
import JSONBig from 'json-bigint';

export default async (req, res) => {
    const data = req.body;

    try {
        const searchRessource = await prisma.ressource.findMany({
            where: {
                titreRessource: {
                    contains: data.titreRessource,
                },
                categorieRessource: {
                    contains: data.categorieRessource,
                },
                typeRessource: {
                    contains: data.typeRessource,
                },
                typeRelationRessource: {
                    contains: data.typeRelationRessource,
                },
                localisationRessource: {
                    contains: data.localisationRessource,
                },
            }
        }
        )
        res.status(200).json(JSONBig.parse(JSONBig.stringify((searchRessource))));
    } catch (err) {
        console.log(err);
        res.status(403).json({ err: "Il y a un problème en recherchant une ressource" });
    };
}

