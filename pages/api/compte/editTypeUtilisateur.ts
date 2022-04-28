import JSONBig from 'json-bigint';
import prisma from '../../../prisma/prisma'

export default async (req, res) => {
    const data = req.body;
    try {
        const editTypeUtilisateur = await prisma.compte.update({
            select: {
                typeUtilisateur: true
            },
            where: {
                idCompte: data.idCompte,
            },
            data: {
                typeUtilisateur: data.typeUtilisateur,
            }
        });
        res.status(200).json(JSONBig.parse(JSONBig.stringify((editTypeUtilisateur))));
    } catch (error) {
        console.log(error)
        res.status(403).json({ err: "Erreur pendant le changement de rôle de l'utilisateur" });
    }
};