import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { once } from 'events';
import Transaction, { TransactionTypes } from '../models/Transaction';
import uploadConfig from '../config/upload';
import CreateTransactionService, {
  RequestCreateService,
} from './CreateTransactionService';
import AppError from '../errors/AppError';

class ImportTransactionsService {
  async execute(filename: string): Promise<Transaction[]> {
    const file = path.join(uploadConfig.uploadPath, filename);
    const transactions: Transaction[] = [];
    const transactionsFile: RequestCreateService[] = [];

    if (await fs.promises.stat(file)) {
      try {
        const readInterface = readline.createInterface({
          input: fs.createReadStream(file),
        });

        let firstLine = true;
        readInterface.on('line', line => {
          const [title, type, value, categoryName] = line.split(',');
          if (firstLine) {
            firstLine = false;
          } else {
            transactionsFile.push({
              title: title.trim(),
              type: type.trim() as TransactionTypes,
              value: Number(value),
              categoryName: categoryName.trim(),
            });
          }
        });

        await once(readInterface, 'close');

        const createTransactionService = new CreateTransactionService();

        const asyncForeach = async (
          array: RequestCreateService[],
          callback: {
            (item: RequestCreateService): Promise<Transaction>;
          },
        ): Promise<void> => {
          const element = array.shift();
          if (element) {
            transactions.push(await callback(element as RequestCreateService));
          }
          if (array.length !== 0) {
            await asyncForeach(array, callback);
          }
        };

        await asyncForeach(transactionsFile, async item =>
          createTransactionService.execute(item),
        );

        await fs.promises.unlink(file);

        return transactions;
      } catch (err) {
        throw new AppError(err.message);
      }
    }

    throw new AppError("File doesn't exist");
  }
}

export default ImportTransactionsService;
