import { Link, PrismaClient } from "@prisma/client";

export default async function getId(id: string): Promise<Link | undefined> {
  const prisma = new PrismaClient();
  const result = await prisma.link.findUnique({ where: { id } });
  await prisma.$disconnect();
  return result;
}
