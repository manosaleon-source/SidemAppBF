const repo = require('../repository/proveedorRepo');
module.exports = { all: repo.all, find: repo.find, create: repo.create, update: repo.update, remove: repo.remove };
