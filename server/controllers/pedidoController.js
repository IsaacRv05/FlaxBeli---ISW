const {  PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports.get = async (request, response, next) => {
  const predidos = await prisma.pedido.findMany({
    orderBy: {
      fechaOrden: "asc",
    },
  });
  response.json(predidos);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const pedido = await prisma.pedido.findUnique({
    where: {
      id: id,
    },
    include: {
      productos : {
        select: {
          producto: true,
          cantidad: true,
        }
      },
      usuario: true,
      mesa: true,
    }, 
  });
  response.json(pedido);
};