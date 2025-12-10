const db = require("../db");

async function listTasks(req, res) {
  try {
    const result = await db.query(
      "SELECT id, title, description, status FROM tasks WHERE user_id = $1 ORDER BY id DESC",
      [req.user.id]
    );
    return res.json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao listar tarefas" });
  }
}

async function createTask(req, res) {
  try {
    const { title, description } = req.body;

    const result = await db.query(
      "INSERT INTO tasks (title, description, status, user_id) VALUES ($1, $2, $3, $4) RETURNING id, title, description, status",
      [title, description || "", "PENDING", req.user.id]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar tarefa" });
  }
}

async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const result = await db.query(
      `UPDATE tasks 
       SET title = $1, description = $2, status = $3
       WHERE id = $4 AND user_id = $5
       RETURNING id, title, description, status`,
      [title, description, status, id, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar tarefa" });
  }
}

async function deleteTask(req, res) {
  try {
    const { id } = req.params;

    const result = await db.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2",
      [id, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao remover tarefa" });
  }
}

module.exports = { listTasks, createTask, updateTask, deleteTask };
