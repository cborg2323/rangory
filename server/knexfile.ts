import path from 'path';

module.exports = {

    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, 'src', 'models', 'database.sqlite'),
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'models', 'migrations'),
    },
    useNullAsDefault: true,

};

