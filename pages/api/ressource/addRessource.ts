import { PrismaClient } from "@prisma/client";
import JSONBig from 'json-bigint';


const prisma = new PrismaClient();

export default async (req, res) => {
  const data = req.body;
  try {
    const result = await prisma.ressource.create({
      data: {
        ...data,
      },
    });
    res.status(200).json(JSONBig.parse(JSONBig.stringify((result))));
    console.log("Tu as bien créer une nouvelle ressource !")
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Il y a un problème en créant une ressource" });
  }
};