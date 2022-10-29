from mongo:6.0.2-focal

run useradd mongo \
    && chown -R mongo:mongo /var/log/mongodb \
    && chown -R mongo:mongo /data/db \
    && mkdir /init \
    && chown -R mongo:mongo /init

workdir /init

copy . .
run chmod +x init.sh

user mongo

entrypoint ["/init/init.sh"]

cmd ["mongod", "--bind_ip_all", "--auth"]
