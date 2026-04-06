const express = require('express');
const router = express.Router();
let data = require('../data');

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get board data
router.get('/board', (req, res) => {
  res.json(data.board);
});

// Add a new card
router.post('/cards', (req, res) => {
  const { listId, content } = req.body;
  if (!listId || !content) {
    return res.status(400).json({ error: 'List ID and content are required.' });
  }

  const list = data.board.lists[listId];
  if (!list) {
    return res.status(404).json({ error: 'List not found.' });
  }

  const newCardId = `card-${Date.now()}`;
  const newCard = { id: newCardId, content };

  data.board.cards[newCardId] = newCard;
  list.cardIds.push(newCardId);

  res.status(201).json(newCard);
});

// Move a card
router.put('/cards/move', (req, res) => {
  const { draggableId, source, destination } = req.body;

  if (!draggableId || !source || !destination) {
    return res.status(400).json({ error: 'Invalid move request' });
  }

  const sourceList = data.board.lists[source.droppableId];
  const destinationList = data.board.lists[destination.droppableId];

  if (!sourceList || !destinationList) {
    return res.status(404).json({ error: 'Source or destination list not found' });
  }

  // Remove card from source list
  sourceList.cardIds.splice(source.index, 1);

  // Add card to destination list
  destinationList.cardIds.splice(destination.index, 0, draggableId);

  res.json({ message: 'Card moved successfully' });
});

module.exports = router;
