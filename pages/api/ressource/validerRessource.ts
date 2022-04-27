import JSONBig from 'json-bigint';
import prisma from '../../../prisma/prisma'

export default async (req, res) => {
    const data = req.body;
    try {
    const validerRessource = await prisma.ressource.update({
        select: {
            validerRessource : true,
        },
        where: {
            idRessource :data.idRessource,
        },
        data: {
            validerRessource: true,
        }
    });
    res.status(200).json(JSONBig.parse(JSONBig.stringify((validerRessource))));
  } catch (error) {
    console.log(error)
    res.status(403).json({ err: "Erreur pendant la suppression d'une ressource" });
  }
};