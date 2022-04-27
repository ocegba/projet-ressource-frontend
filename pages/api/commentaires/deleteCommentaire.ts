import JSONBig from 'json-bigint';
import prisma from '../../../prisma/prisma'

export default async (req, res) => {
  const { idCommentaire } = req.body;
  try {
    const deleteCommentaire = await prisma.commentaire.delete({
      where: {
        idCommentaire,
      },
    });
    res.status(200).json(JSONBig.parse(JSONBig.stringify((deleteCommentaire))));
  } catch (error) {
    console.log(error)
    res.status(403).json({ err: "Erreur pendant la suppression d'un commentaire" });
  }
};