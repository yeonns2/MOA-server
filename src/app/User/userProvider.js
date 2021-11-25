const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveUserList = async function(email) {
    if (!email) {
        const connection = await pool.getConnection(async(conn) => conn);
        const userListResult = await userDao.selectUser(connection);
        connection.release();

        return userListResult;

    } else {
        const connection = await pool.getConnection(async(conn) => conn);
        const userListResult = await userDao.selectUserEmail(connection, email);
        connection.release();

        return userListResult;
    }
};

exports.retrieveUser = async function(userId) {
    const connection = await pool.getConnection(async(conn) => conn);
    const userResult = await userDao.selectUserId(connection, userId);

    connection.release();

    return userResult[0];
};

exports.emailCheck = async function(email) {
    const connection = await pool.getConnection(async(conn) => conn);
    const emailCheckResult = await userDao.selectUserEmail(connection, email);
    connection.release();

    return emailCheckResult;
};

exports.emailVerifyCheck = async function(email) {
    const connection = await pool.getConnection(async(conn) => conn);
    const emailCheckResult = await userDao.selectUnivEmail(connection, email);
    connection.release();

    return emailCheckResult;
};