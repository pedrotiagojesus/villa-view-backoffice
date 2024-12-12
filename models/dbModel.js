import { db } from "../config/database/mysql.js";

export default {
    connection: async () => {
        const [result] = await db.execute('SELECT 1');
        return result;
    },
};
