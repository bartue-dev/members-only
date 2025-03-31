#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `CREATE TABLE IF NOT EXISTS users(
user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
username VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
isMember BOOLEAN DEFAULT 'false' NOT NULL,
isAdmin BOOLEAN DEFAULT 'false' NOT NULL
);


CREATE TABLE IF NOT EXISTS post(
post_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title VARCHAR(255),
message VARCHAR(1024),
user_id INTEGER NOT NULL,
CONSTRAINT fk_user
FOREIGN KEY(user_id)
REFERENCES users(user_id)
ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default" PRIMARY KEY,
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

`


async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("done");

}

main();