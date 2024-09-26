const db = require('../config/db');
const bcrypt = require('bcrypt');

// Registro
exports.register = (req, res) => {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao registrar usuário' });
        }
        res.status(200).json({ message: 'Registro realizado com sucesso' });
    });
};

// Login
exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const user = results[0];
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Ops... Você errou a senha ou o email!' });
        }

        res.status(200).json({ message: 'Login realizado!' });
    });
};
