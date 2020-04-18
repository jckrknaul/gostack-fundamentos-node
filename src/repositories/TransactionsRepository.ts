import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateRepositoryTrans {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => {
        return transaction.type === 'income';
      })
      .reduce((allIncome, transaction) => {
        return transaction.value + allIncome;
      }, 0);

    const outcome = this.transactions
      .filter(transaction => {
        return transaction.type === 'outcome';
      })
      .reduce((allOutcome, transaction) => {
        return transaction.value + allOutcome;
      }, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateRepositoryTrans): Transaction {
    const transactions = new Transaction({ title, value, type });

    this.transactions.push(transactions);

    return transactions;
  }
}

export default TransactionsRepository;
