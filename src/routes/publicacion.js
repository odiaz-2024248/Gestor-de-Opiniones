const express = require('express');
const router = express.Router();
const pool = require('../db');

// agregar
router.post('/', async (req, res) => {
  const { titulo, categoria, texto, autor } = req.body;
  if(!titulo || !categoria || !texto || !autor)
    return res.status(400).json({ error: 'Campos Obligatorios' });

  try {
    const result = await pool.query(
      'insert into publicaciones (titulo, categoria, texto, autor) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, categoria, texto, autor]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// listar
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM publicaciones ORDER BY fecha DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM publicaciones WHERE id = $1', [id]);
    if(result.rows.length === 0) return res.status(404).json({ error: 'Publicación no encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// editar
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, categoria, texto, autor } = req.body;

  if(!titulo || !categoria || !texto || !autor)
    return res.status(400).json({ error: 'Campos Obligatorios' });

  try {
    const pub = await pool.query('SELECT * FROM publicaciones WHERE id = $1', [id]);
    if(pub.rows.length === 0) return res.status(404).json({ error: 'Publicación no encontrada' });
    if(pub.rows[0].autor !== autor) return res.status(403).json({ error: 'Solo el autor puede editar' });

    const result = await pool.query(
      'UPDATE publicaciones SET titulo=$1, categoria=$2, texto=$3 WHERE id=$4 RETURNING *',
      [titulo, categoria, texto, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// eliminar
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { autor } = req.body;

  if(!autor) return res.status(400).json({ error: 'Autor es obligatorio' });

  try {
    const pub = await pool.query('SELECT * FROM publicaciones WHERE id = $1', [id]);
    if(pub.rows.length === 0) return res.status(404).json({ error: 'Publicación no encontrada' });
    if(pub.rows[0].autor !== autor) return res.status(403).json({ error: 'Solo el autor puede eliminar' });

    await pool.query('DELETE FROM publicaciones WHERE id=$1', [id]);
    res.json({ message: 'Publicación eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;