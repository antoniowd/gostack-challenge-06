<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios-new.png" style="width: 100%;"/>

<h3 align="center">
  Challenge 05: Database and file upload in Node.js
</h3>

<blockquote align="center">“Only desire the things you are willing to fight for!”</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rocketseat/bootcamp-gostack-desafios?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/Rocketseat/bootcamp-gostack-desafios/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/rocketseat/bootcamp-gostack-desafios?style=social">
  </a>
</p>

## :rocket: About the challenge

In this challenge, you must continue developing the transaction management application, training what you have learned so far in Node.js and TypeScript, but this time including the use of database with TypeORM and sending files with Multer!

This will be an application that should store incoming and outgoing financial transactions and allow to register and to retrieve those transactions. Also, the application will have an import of a CSV file with transactions in it, which will save those transactions to the database.

### Application requirements

- **POST /transactions**: The route must receive *title*, *value*, *type*, and *category* within the body of the request, being *type* the type of transaction, which must be "income" for entries (deposits) and "outcome" for exits (withdrawals). When registering a new transaction, it must be stored inside its database, having the fields `id`, `title`, `value`, `type`, `category_id`, `created_at`, `updated_at`.

**Tip**: For the category, you must create a new table, which will have the fields `id`, `title`, `created_at`, `updated_at`.

**Tip 2**: Before creating a new category, always check if a category with the same `title` already exists. If it exists, use the existing `id` in the database.

```json
{
  "id": "uuid",
  "title": "Salário",
  "value": 3000,
  "type": "income",
  "category": "Food"
}
```

- **GET /transactions**: This route must return a list with all the transactions you have registered so far, along with the sum of entries, withdrawals and total credit. This route must return an object with the following format:

```json
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Salário",
      "value": 4000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Salary",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Freela",
      "value": 2000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Others",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Pagamento da fatura",
      "value": 4000,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Others",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Cadeira Gamer",
      "value": 1200,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Recreation",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    }
  ],
  "balance": {
    "income": 6000,
    "outcome": 5200,
    "total": 800
  }
}
```

- **DELETE /transactions/:id**: The route must delete a transaction with the `id` present in the route parameters.

- **POST /transactions/import**: The route must allow the import of a file with .csv format containing the same information needed to create an `id` transaction, `title`, `value`, `type`, `category_id`, `created_at`, `updated_at`, where each line of the CSV file must be a new record for the database, and finally return all the transactions that were imported into your database. The csv file, must follow the following format:

```csv
title, type, value, category
Loan, income, 1500, Others
Website Hosting, outcome, 50, Others
Ice cream, outcome, 3, Food
```

## Test Specification

Before running the tests, create a database named "gostack_desafio06_tests" so that all the tests can execute correctly

## :memo: Licence

This project is under license from MIT. See the archive [LICENSE](LICENSE) to more details.

---

Made with 💜 by Rocketseat :wave: [Join our community!](https://discordapp.com/invite/gCRAFhc)
