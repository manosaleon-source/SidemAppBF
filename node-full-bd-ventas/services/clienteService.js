const repo = require('../repository/clienteRepo');
module.exports = { all: repo.all, find: repo.find, create: repo.create, update: repo.update, remove: repo.remove };
