# Transações API

API para processar as transações

## <b> Iniciar Mongo DB (MAC OS)
```
mongod --config /usr/local/etc/mongod.conf --fork
```
## <b> Iniciar Mongo DB (Open Suse)

```
mongod --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log --fork
```

## <b> Parar <i style='color: red'>Mongo DB</i>, pegar o PID e executar kill <PID>
```
ps aux | grep -v grep | grep mongod