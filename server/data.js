let initialData = {
  board: {
    id: 'board-1',
    title: 'Project Kanban Board',
    lists: {
      'list-1': {
        id: 'list-1',
        title: 'To Do',
        cardIds: ['card-1', 'card-2']
      },
      'list-2': {
        id: 'list-2',
        title: 'In Progress',
        cardIds: ['card-3']
      },
      'list-3': {
        id: 'list-3',
        title: 'Done',
        cardIds: []
      }
    },
    listOrder: ['list-1', 'list-2', 'list-3'],
    cards: {
      'card-1': { id: 'card-1', content: 'Setup project structure' },
      'card-2': { id: 'card-2', content: 'Create backend API' },
      'card-3': { id: 'card-3', content: 'Develop frontend UI' }
    }
  }
};

module.exports = initialData;
