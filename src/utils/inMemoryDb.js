const DB = {
    Users: [],
    Boards: [],
    Tasks: [],

    fixUsersStructure: user => {
        if (user) {
            DB.Tasks = DB.Tasks.map(task => {
                task.userId = task.userId === user.id ? null : task.userId;
                return task;
            });
        }
    },

    fixBoardsStructure: board => {
        if (board) {
            DB.Tasks = DB.Tasks.filter(task => task.boardId !== board.id);
        }
    },

    fixTasksStructure: () => {},

    getAllEntities: tableName => DB[tableName],

    getEntity: (tableName, id) => DB[tableName].find(entity => entity.id === id),

    saveEntity: (tableName, entity) => DB[tableName].push(entity),

    removeEntity: (tableName, id) => {
        const candidate = DB[tableName].find(entity => entity.id === id);

        if (candidate) {
            DB[`fix${tableName}Structure`](candidate);

            DB[tableName] = DB[tableName].filter(entity => entity.id !== candidate.id);
        }
    },

    updateEntity: (tableName, id, entity) => {
        const candidate = DB[tableName].find(entity => entity.id === id);

        if (candidate) {
            const candidateIndex = DB[tableName].indexOf(candidate);
            DB[tableName][candidateIndex] = Object.assign(candidate, entity);

            return DB[tableName][candidateIndex];
        }

        return candidate;
    }
}

module.exports = DB;
