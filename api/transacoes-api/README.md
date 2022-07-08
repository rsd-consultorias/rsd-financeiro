# Transações API

API para processar as transações

## <b> Iniciar Mongo DB (MAC OS)
```bash
mongod --config /usr/local/etc/mongod.conf --fork
```
## <b> Iniciar Mongo DB (Open Suse)

```bash
mongod --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log --fork
```

## <b> Parar <i style='color: red'>Mongo DB</i>, pegar o PID e executar kill <PID>
```bash
ps aux | grep -v grep | grep mongod
```