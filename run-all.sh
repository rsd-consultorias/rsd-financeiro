# mongod --config /usr/local/etc/mongod.conf --fork;
npm run start --prefix ./front-end/rsd-financeiro &
tsc --sourceMap --project ./api/transacoes-api/tsconfig.json;
NODE_ENV=production API_PORTA=4201 DB_CONN_STR="mongodb://localhost:27017/financeiro?readPreference=primary&appname=api-rsd-transacoes&directConnection=true&ssl=false" node ./api/transacoes-api/build/main.js
