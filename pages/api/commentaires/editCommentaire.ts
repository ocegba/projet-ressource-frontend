import JSONBig from 'json-bigint';
import prisma from '../../../prisma/prisma';
import axios from "axios";

const defaultFonction = async (req, res) => {
  const {
    idCommentaire,
    contenuCommentaire,
  } = req.body;

  try {
    const editCommentaire = await prisma.commentaire.update({
      where: {
        idCommentaire: idCommentaire,
      },
      data: {
        contenuCommentaire,
      },
    });
    console.log(editCommentaire)
    res.status(200).json(JSONBig.parse(JSONBig.stringify((editCommentaire))));
  } catch (error) {
    res.status(403).json({ err: "Erreur pendant la modification d'une ressource" });
  }
};

export default defaultFonction;