'use client';

import { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Card from './Card';

const List = ({ list, cards, addCard }) => {
  const [newCardContent, setNewCardContent] = useState('');
  const [isAddingCard, setIsAddingCard] = useState(false);

  const handleAddCard = () => {
    addCard(list.id, newCardContent);
    setNewCardContent('');
    setIsAddingCard(false);
  };

  return (
    <div className="bg-gray-200 rounded-lg shadow-md w-72 flex-shrink-0">
      <h2 className="p-3 font-bold text-gray-700">{list.title}</h2>
      <Droppable droppableId={list.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-2 min-h-[100px] transition-colors duration-200 ${snapshot.isDraggingOver ? 'bg-blue-100' : 'bg-gray-200'}`}
          >
            {cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="p-2">
        {isAddingCard ? (
          <div>
            <textarea
              className="w-full p-2 border rounded shadow-inner"
              placeholder="Enter a title for this card..."
              value={newCardContent}
              onChange={(e) => setNewCardContent(e.target.value)}
              autoFocus
            />
            <div className="mt-2 flex items-center">
              <button
                onClick={handleAddCard}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                Add Card
              </button>
              <button
                onClick={() => setIsAddingCard(false)}
                className="ml-2 text-gray-600 hover:text-gray-800 text-2xl"
              >
                &times;
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingCard(true)}
            className="w-full text-left p-2 text-gray-500 hover:bg-gray-300 rounded"
          >
            + Add a card
          </button>
        )}
      </div>
    </div>
  );
};

export default List;
