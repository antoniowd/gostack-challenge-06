import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionRepository from '../repositories/TransactionsRepository';
import Transaction, { TransactionTypes } from '../models/Transaction';
import Category from '../models/Category';

export interface RequestCreateService {
  title: string;
  value: number;
  type: TransactionTypes;
  categoryName: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    categoryName,
  }: RequestCreateService): Promise<Transaction> {
    const categoryRepository = getRepository(Category);
    const transactionRepository = getCustomRepository(TransactionRepository);

    const balance = await transactionRepository.getBalance();

    if (type !== TransactionTypes.OUTCOME && type !== TransactionTypes.INCOME) {
      throw new AppError('Invalid operation type');
    }

    if (value <= 0) {
      throw new AppError('Invalid value');
    }

    if (type === TransactionTypes.OUTCOME && value > balance.total) {
      throw new AppError("You don't have enough balance to make a withdrawal");
    }

    let category = await categoryRepository.findOne({
      where: [
        {
          title: categoryName,
        },
      ],
    });

    if (!category) {
      category = categoryRepository.create({
        title: categoryName,
      });
      await categoryRepository.save(category);
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
