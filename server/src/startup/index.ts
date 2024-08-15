import database from '../config/database';
import CommandLineRunner from '../helpers/CommandLineRunner';
import CronJob from '../helpers/CronJob';
import AppLogger from '../utils/AppLogger';

const logger = AppLogger.init('mongoDb').logger;

export default async function startup() {
  await database.mongodb();
  await CommandLineRunner.run();
  logger.info('MongoDB Connected Successfully');
}
