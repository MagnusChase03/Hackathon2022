db = new Mongo().getDB("admin");

if (db.getUsers().users.length == 0) {

    db.createUser({
        user: "root",
        pwd: MONGO_INITDB_ROOT_PASSWORD,
        roles: [
          { role: "userAdminAnyDatabase", db: "admin" },
          { role: "readWriteAnyDatabase", db: "admin" }
        ]
    });

}
