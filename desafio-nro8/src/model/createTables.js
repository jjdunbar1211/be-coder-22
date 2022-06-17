import knexLib from 'knex';

import { options as mysqlOpts } from '../db/options/mysql.js';
import { options as sqlite3Opts } from '../db/options/sqlite3.db.js';

async function createTables() {
    //PRODUCTS TABLE
    let knex = knexLib(mysqlOpts);

    try {
        const existsProducts = await knex.schema.hasTable("products");
        if (!existsProducts) {
            try {
                await knex.schema.createTable("products", (table) => {
                    table.increments("id");
                    table.string("title");
                    table.integer("price");
                    table.string("thumbnail");
                });
                console.log("TABLE PRODUCTS CREATED");
            } catch (error) {
                console.log("Error creating products table.");
            }
        }
    } catch (error) {
        console.log("Error checking products table.");
    } finally {
        knex.destroy();
    }

    //MESSAGES TABLE
    knex = knexLib(sqlite3Opts);
    try {
        const existsMessages = await knex.schema.hasTable("messages");
        if (!existsMessages) {
            try {
                await knex.schema.createTable("messages", (table) => {
                    table.increments("id");
                    table.string("email");
                    table.string("date");
                    table.string("text");
                });
                console.log("TABLE MESSAGES CREATED");
            } catch (error) {
                console.log("Error creating messages table.");
            }
        }
    } catch (error) {
        console.log("Error checking messages table.");
    } finally {
        knex.destroy();
    }
}

export default createTables;
