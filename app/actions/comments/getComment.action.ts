import prisma from '@/app/lib/prisma';

export async function GetAllComment() {
  const commenting = await prisma.comment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
      product: true,
    },
    take: 2,
  });

  return commenting;
}
