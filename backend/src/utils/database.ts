import { prisma } from './client';

export async function populateDatabase() {
  try {
    const date = new Date().toISOString();
    const thereIsUserAdmin = await prisma.user.findUnique({
      where: { email: 'admin@example.com' },
    });
    const thereIsProf = await prisma.professional.count();

    if (!thereIsUserAdmin) {
      await prisma.user.create({
        data: {
          name: 'Admin User',
          email: 'admin@example.com',
          password:
            '$2a$10$CeM8oQzg7trhT.01HxHEZesg8b8l.ywAgT3EBZtRS3NgH.WBGRTEG', // senha = 'admin'
          role: 'ADMIN',
        },
      });
    }

    if (!thereIsProf) {
      await prisma.$queryRaw`
          INSERT INTO professional (id, created_at, updated_at, name, email, qualifications)
          VALUES
            (${crypto.randomUUID()}, ${date}, ${date}, 'Lucas Andrade', 'lucas.andrade@example.com', 'Engenheiro de Software'),
            (${crypto.randomUUID()}, ${date}, ${date}, 'Mariana Silva', 'mariana.silva@example.com', 'Designer Gráfico'),
            (${crypto.randomUUID()}, ${date}, ${date}, 'Bruno Oliveira', 'bruno.oliveira@example.com', 'Médico Veterinário'),
            (${crypto.randomUUID()}, ${date}, ${date}, 'Carla Mendes', 'carla.mendes@example.com', 'Arquiteta'),
            (${crypto.randomUUID()}, ${date}, ${date}, 'Rafael Souza', 'rafael.souza@example.com', 'Professor de História');
        `;
    }

    console.log('Database populated successfully');
  } catch (error) {
    console.error(error);
  }
}
