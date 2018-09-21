'use strict';

class MarkerMaker {
    constructor(account, ip, name, state) {
        this.account = this.accountParser(account);
        this.ip = ip;
        this.name = this.nameParser(name);
        this.state = state;
        this.conType = this.conTypeParser(ip);
    }

    nameParser(data) {
        //data = toString(data);
        let data2 = data.replace(/\D/g, '');
        let data3 = data2.replace(/^0+/g, '');
        if (data3.length === 1) {
            return '00' + data3;
        } else if (data3.length === 2) {
            return '0' + data3;
        } else {
            return data3;
        }
    }

    conTypeParser(data) {
        try {
            let dataStr = data.split('.');
            if (dataStr[0] == '166') {
                return 'LTE';
            } else {
                return 'WAN';
            }
        } catch (e) {
            // dos oemthing
        }
    }

    accountParser(data) {
        let accNum = data.split('/');
        return accNum[6];
    }
}

module.exports = MarkerMaker;
