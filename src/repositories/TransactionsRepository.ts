import { EntityRepository, Repository, getConnection } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const balance = await getConnection()
      .createQueryBuilder()
      .select(
        `
      COALESCE(SUM(CASE t2."type" WHEN 'outcome' THEN t2.value ELSE 0 END), 0) AS outcome,
      COALESCE(SUM(CASE t2."type" WHEN 'income' THEN t2.value ELSE 0 END), 0) AS income,
      COALESCE(SUM(CASE t2."type" WHEN 'income' THEN t2.value ELSE 0 END) - SUM(CASE t2."type" WHEN 'outcome' THEN t2.value ELSE 0 END), 0) AS total
    `,
      )
      .from('transactions', 't2')
      .getRawOne();

    return balance;
  }
}

export default TransactionsRepository;
