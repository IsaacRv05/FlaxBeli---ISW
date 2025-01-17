const {  PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports.get = async (request, response, next) => {
  const producto = await prisma.producto.findMany({
    orderBy: {
      id: "asc",
    },
  });
  response.json(producto);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const producto = await prisma.producto.findUnique({
    where: {
      id: id,
    },
    include: {
      restaurantes : true,
    }
  });
  response.json(producto);
}; 