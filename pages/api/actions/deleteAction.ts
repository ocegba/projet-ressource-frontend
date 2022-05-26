import JSONBig from 'json-bigint';
import prisma from '../../../prisma/prisma'

export default async (req, res) => {
    const { idRessource, libelleAction } = req.body;
    try {
        const deleteActions = await prisma.action.deleteMany({
            where: {
                idRessource,
                libelleAction,
            },
        });
        res.status(200).json(JSONBig.parse(JSONBig.stringify((deleteActions))));
    } catch (error) {
        console.log(error)
        res.status(403).json({ err: "Erreur pendant la suppression d'une action" });
    }
};