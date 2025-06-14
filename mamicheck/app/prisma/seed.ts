import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.paciente.createMany({
    data: [
      { nombre: 'Juan Pérez', edad: 30, genero: 'Masculino' },
      { nombre: 'Ana Gómez', edad: 25, genero: 'Femenino' },
      { nombre: 'Carlos Ruiz', edad: 40, genero: 'Masculino' },
      { nombre: 'Laura Sánchez', edad: 35, genero: 'Femenino' },
    ],
  });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
