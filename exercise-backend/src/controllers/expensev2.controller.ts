import { Request, Response } from "express";
import pool from "../config/db";
import { IData } from "../types/data";

export class Expensev2Controller {
  async getExpress(req: Request, res: Response) {
    const { category } = req.query
    let query = "SELECT * FROM expense"
    if (category) query += ` where category = '${category}'`
    query += ' order by id asc'
    const result = await pool.query(query);
    const expenses: IData[] = result.rows;

    res.status(200).send({ trackers: expenses });
  }
  async getExpenseId(req: Request, res: Response) {
    const { id } = req.params;
    const result = await pool.query(`SELECT * from expense where id = ${id}`);
    const expense: IData = result.rows[0];

    res.status(200).send({ data: expense });
  }
  async addExpense(req: Request, res: Response) {
    const { title, amount, type, category, date } = req.body;
    await pool.query(
      `INSERT into expense (title, amount, "type", category, "date") values ('${title}', ${amount}, '${type}', '${category}', '${date}')`
    );
    res.status(200).send("Expense created ✅");
  }
  async editExpense(req: Request, res: Response) {
    const { id } = req.params;
    const query = []
    for (let key in req.body) {
        query.push(`${key} = '${req.body[key]}'`)
    }
    console.log(query.join(', '));
    await pool.query(`UPDATE expense SET ${query.join(', ')} WHERE id = ${id}`)
    

    res.status(200).send("Expense edited ✅")
  }
  async deleteExpense(req: Request, res: Response) {
    const { id } = req.params;
    await pool.query(`DELETE FROM expense WHERE id = ${id}`)
    res.status(200).send("Expense deleted ✅")
  }
}
