function FingerprintHelper() {
    this.db = window.sqlitePlugin.openDatabase({
        name: 'fingerprint.db',
        location: 'default'
    });
}

FingerprintHelper.prototype.saveLocal = function (token, username, password) {
    var localStorage = window.localStorage;

    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
}

FingerprintHelper.prototype.getLocal = function (token, username, password) {
    var localStorage = window.localStorage;
    var data = {};

    data.token = localStorage.getItem('token', token);
    data.username = localStorage.getItem('username', username);
    data.password = localStorage.getItem('password', password);
    return data;
}

FingerprintHelper.prototype.register = function (data) {
    var token = data.token,
        username = data.username,
        password = data.password;

    this.db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS FingerprintData (token, username)');
        tx.executeSql('INSERT INTO FingerprintData VALUES (?,?)', [token, username]);
    }, function (error) {
        console.log('Transaction ERROR: ' + error.message);
    });

}

FingerprintHelper.prototype.updateCredentials = function (data) {
    var token = data.token,
        username = data.username,
        password = data.password;

    this.db.transaction(function (tx) {
        tx.executeSql('DELETE FROM FingerprintData');
        tx.executeSql('INSERT INTO FingerprintData VALUES (?,?)', [token, username]);
    }, function (error) {
        console.log('Transaction ERROR: ' + error.message);
    });

}

FingerprintHelper.prototype.isAlreadyRegistered = function (cbSuccess, cbError) {

    this.db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS FingerprintData (token, username)');
        tx.executeSql('SELECT COUNT(*) AS rowCount FROM FingerprintData', [], function (tx, rs) {
            var rowCount = rs.rows.item(0).rowCount;
            if (rowCount) {
                if (rowCount == 0) {
                    cbSuccess({
                        isRegistered: false
                    })
                } else {
                    cbSuccess({
                        isRegistered: true
                    })
                }
            } else {
                cbSuccess({
                    isRegistered: false
                })
            }

        }, function (tx, error) {
            console.log(error)
        });
    }, function (error) {
        cbError(error)
        console.log('Transaction ERROR: ' + error.message);
    });

}

FingerprintHelper.prototype.deleteDbTable = function () {
    this.db.transaction(function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS FingerprintData', [], function (tx, rs) {
            console.log(' success!')
            console.log(tx)
        }, function (tx, error) {
            console.log(tx)
            console.log(error)
        });
    }, function (error) {
        console.log('Transaction ERROR: ' + error.message);
    });

}

FingerprintHelper.prototype.getRegisteredUser = function (cbSuccess, cbError) {
    this.db.transaction(function (tx) {
        tx.executeSql('SELECT token, username FROM FingerprintData LIMIT 1', [], function (tx, rs) {
            var data = rs.rows.item(0);
            cbSuccess(data)
        }, function (tx, error) {
            console.log(error)
        });
    }, function (error) {
        cbError(error)
        console.log('Transaction ERROR: ' + error.message);
    });
}