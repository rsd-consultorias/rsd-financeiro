mongod --config /usr/local/etc/mongod.conf --fork;
API_PORTA=4201 DB_CONN_STR="mongodb://localhost:27017/financeiro?readPreference=primary&appname=api-rsd-transacoes&directConnection=true&ssl=false" node ./api/transacoes-api/build/main.js
