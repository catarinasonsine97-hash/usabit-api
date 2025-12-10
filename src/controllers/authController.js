const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const userExists = await db.query("SELECT id FROM users WHERE email = $1", [
      email
    ]);

    if (userExists.rowCount > 0) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }

    const hash = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hash]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao registrar usuário" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const result = await db.query(
      "SELECT id, name, email, password_hash FROM users WHERE email = $1",
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao fazer login" });
  }
}

module.exports = { register, login };
