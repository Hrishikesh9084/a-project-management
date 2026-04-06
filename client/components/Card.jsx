import { Draggable } from '@hello-pangea/dnd';

const Card = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-md p-3 mb-2 shadow-sm hover:bg-gray-100 ${snapshot.isDragging ? 'shadow-lg' : ''}`}
        >
          <p>{card.content}</p>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
