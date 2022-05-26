import JSONBig from 'json-bigint';
import prisma from '../../../prisma/prisma';
import axios from "axios";

export default async (req, res) => {
  const {
    idRessource,
    titreRessource,
    idCategorie,
    typeRessource,
    storyRessource,
    fileRessource,
    lienRessource,
    localisationRessource,
    dateRessource,
    validerRessource,
    relationstous,
    relationssoi,
    relationsconjoints,
    relationsfamille,
    relationspro,
    relationsamis,
    relationsinconnus,
  } = req.body;

  try {
    const editRessource = await prisma.ressource.update({
      where: {
        idRessource: idRessource,
      },
      data: {
        titreRessource,
        idCategorie: parseInt(idCategorie),
        typeRessource,
        storyRessource,
        fileRessource,
        lienRessource,
        localisationRessource,
        dateRessource,
        validerRessource,
        relationstous,
        relationssoi,
        relationsconjoints,
        relationsfamille,
        relationspro,
        relationsamis,
        relationsinconnus,
      },
    });
    res.status(200).json(JSONBig.parse(JSONBig.stringify((editRessource))));
  } catch (error) {
    res.status(403).json({ err: "Erreur pendant la modification d'une ressource" });
  }
};