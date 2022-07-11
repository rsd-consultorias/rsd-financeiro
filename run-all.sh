mongod --config /usr/local/etc/mongod.conf --fork;
NODE_ENV=production API_PORTA=4201 DB_CONN_STR="mongodb://localhost:27017/financeiro?readPreference=primary&appname=api-rsd-transacoes&directConnection=true&ssl=false" node --inspect-brk ./api/transacoes-api/build/main.js
