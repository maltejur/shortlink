import { validateShortId, validateUrl } from "lib/validate";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id.toString();
  const target = req.query.target.toString();
  if (!id) {
    res.status(400).send("400 Bad Request: Missing Short ID");
    return;
  }
  if (!target) {
    res.status(400).send("400 Bad Request: Missing Target URL");
    return;
  }
  if (!validateShortId(id)) {
    res.status(400).send("400 Bad Request: Malformed Short ID");
    return;
  }
  if (!validateUrl(target)) {
    res.status(400).send("400 Bad Request: Malformed Target URL");
    return;
  }
  const prisma = new PrismaClient();
  if (await prisma.link.findUnique({ where: { id } })) {
    res.status(409).send("409 Conflict: Short ID already exists");
    return;
  }
  await prisma.link.create({ data: { id, target } });
  await prisma.$disconnect();
  res.send("OK");
}
