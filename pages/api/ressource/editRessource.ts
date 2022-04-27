import JSONBig from 'json-bigint';
import prisma from '../../../prisma/prisma';
import axios from "axios";

export default async (req, res) => {
  const {
    idRessource,
    titreRessource,
    categorieRessource,
    typeRessource,
    typeRelationRessource,
    storyRessource,
    fileRessource,
    lienRessource,
    localisationRessource,
    dateRessource,
    validerRessource,
  } = req.body;
  console.log(req.body)

  try {
    const editRessource = await prisma.ressource.update({
      where: {
        idRessource: idRessource,
      },
      data: {
        titreRessource,
        categorieRessource,
        typeRessource,
        typeRelationRessource,
        storyRessource,
        fileRessource,
        lienRessource,
        localisationRessource,
        dateRessource,
        validerRessource,
      },
    });
    res.status(200).json(JSONBig.parse(JSONBig.stringify((editRessource))));
  } catch (error) {
    res.status(403).json({ err: "Erreur pendant la modification d'une ressource" });
  }
};