import { PrismaClient } from "@prisma/client";
import JSONBig from 'json-bigint';

const prisma = new PrismaClient();

export default async (req, res) => {
    const data = req.body;

    try {
        const result = await prisma.ressource.findMany({
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
        console.log(result)
        res.status(200).json(JSONBig.parse(JSONBig.stringify((result))));
        return result;
    } catch (err) {
        console.log(err);
        res.status(403).json({ err: "Il y a un problème en recherchant une ressource" });
    };
}

