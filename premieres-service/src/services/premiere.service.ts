import { Premiere, type IPremiere } from "../models/premiere.model.js";
import { logger } from "../utils/logger.js";

const seedData = [
  {
    imageUrl: "https://image.tmdb.org/t/p/w500/avengers-endgame.jpg",
    title: "Avengers: Secret Wars",
    description:
      "Los héroes más poderosos de la Tierra se enfrentan a la mayor amenaza multiversal.",
  },
  {
    imageUrl: "https://image.tmdb.org/t/p/w500/batman-2.jpg",
    title: "The Batman Part II",
    description:
      "Bruce Wayne continúa su cruzada contra el crimen en Gotham City.",
  },
  {
    imageUrl: "https://image.tmdb.org/t/p/w500/dune-3.jpg",
    title: "Dune: Messiah",
    description:
      "Paul Atreides enfrenta las consecuencias de su ascenso al poder en Arrakis.",
  },
  {
    imageUrl: "https://image.tmdb.org/t/p/w500/spiderman-4.jpg",
    title: "Spider-Man: Brand New Day",
    description:
      "Peter Parker se enfrenta a nuevos villanos mientras lucha por mantener su identidad secreta.",
  },
  {
    imageUrl: "https://image.tmdb.org/t/p/w500/fantastic-four.jpg",
    title: "The Fantastic Four: First Steps",
    description:
      "La primera familia de Marvel llega al MCU en una aventura interdimensional.",
  },
];

export async function getPremieres(): Promise<IPremiere[]> {
  logger.info("Obteniendo listado de premieres");
  return Premiere.find().lean<IPremiere[]>();
}

export async function seedPremieres(): Promise<IPremiere[]> {
  logger.info("Ejecutando seed de premieres");
  await Premiere.deleteMany({});
  const inserted = await Premiere.insertMany(seedData);
  logger.info(`Seed completado: ${inserted.length} registros insertados`);
  return inserted;
}
