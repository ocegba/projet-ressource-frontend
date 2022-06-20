import JSONBig from 'json-bigint';
import prisma from '../../../prisma/prisma';
import axios from "axios";

const defaultFonction = async (req, res) => {
  const {
    idRessource,
  } = req.body;
  
  try {
    const editCommentaire = await prisma.ressource.update({
      where: {
        idRessource: idRessource,
      },
      data: {
        validerRessource: null,
      },
    });
    res.status(200).json(JSONBig.parse(JSONBig.stringify((editCommentaire))));
  } catch (error) {
    res.status(403).json({ err: "Erreur pendant la modification d'une ressource" });
  }
};

export default defaultFonction;