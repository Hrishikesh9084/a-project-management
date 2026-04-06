'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext } from '@hello-pangea/dnd';
import List from './List';

const Board = () => {
  const [boardData, setBoardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get('/api/board');
        setBoardData(response.data);
      } catch (err) {
        setError('Failed to fetch board data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBoardData();
  }, []);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startList = boardData.lists[source.droppableId];
    const finishList = boardData.lists[destination.droppableId];

    // Optimistic UI Update
    let newBoardData;
    if (startList === finishList) {
      const newCardIds = Array.from(startList.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newList = {
        ...startList,
        cardIds: newCardIds,
      };

      newBoardData = {
        ...boardData,
        lists: {
          ...boardData.lists,
          [newList.id]: newList,
        },
      };
    } else {
      const startCardIds = Array.from(startList.cardIds);
      startCardIds.splice(source.index, 1);
      const newStartList = {
        ...startList,
        cardIds: startCardIds,
      };

      const finishCardIds = Array.from(finishList.cardIds);
      finishCardIds.splice(destination.index, 0, draggableId);
      const newFinishList = {
        ...finishList,
        cardIds: finishCardIds,
      };

      newBoardData = {
        ...boardData,
        lists: {
          ...boardData.lists,
          [newStartList.id]: newStartList,
          [newFinishList.id]: newFinishList,
        },
      };
    }
    setBoardData(newBoardData);

    // API call to persist change
    try {
      await axios.put('/api/cards/move', { draggableId, source, destination });
    } catch (err) {
      console.error('Failed to move card:', err);
      // Revert state if API call fails
      // For simplicity, we're not reverting here, but in a real app you would.
      setError('Failed to save changes. Please refresh.');
    }
  };

  const addCard = async (listId, content) => {
    if (!content.trim()) return;
    try {
      const { data: newCard } = await axios.post('/api/cards', { listId, content });
      const list = boardData.lists[listId];
      const newBoardData = {
        ...boardData,
        cards: {
          ...boardData.cards,
          [newCard.id]: newCard
        },
        lists: {
          ...boardData.lists,
          [listId]: {
            ...list,
            cardIds: [...list.cardIds, newCard.id]
          }
        }
      };
      setBoardData(newBoardData);
    } catch (err) {
      console.error('Failed to add card:', err);
      setError('Could not add card. Please try again.');
    }
  };

  if (loading) return <p className="text-white text-center">Loading board...</p>;
  if (error) return <p className="text-red-300 text-center">{error}</p>;
  if (!boardData) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex items-start space-x-4 overflow-x-auto p-4">
        {boardData.listOrder.map((listId) => {
          const list = boardData.lists[listId];
          const cards = list.cardIds.map((cardId) => boardData.cards[cardId]);
          return <List key={list.id} list={list} cards={cards} addCard={addCard} />;
        })}
      </div>
    </DragDropContext>
  );
};

export default Board;
