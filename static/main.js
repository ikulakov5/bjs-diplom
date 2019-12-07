class Profile {
	constructor(user) {
		this.username = user.username;
		this.name = user.name;
		this.password = user.pass;
	}

	createUser(callback) {
		console.log(`Creating user ${this.username}`);
        return ApiConnector.createUser(this, (err, data) => {
            callback(err, data);
        });
    }

    login(user, callback) {
		console.log(`Logining user ${this.username}`);
        return ApiConnector.performLogin(user, (err, data) => {
            callback(err, data);
        });
    }

	addMoney({ currency, amount }, callback) {
        console.log(`Adding ${amount} of ${currency} to ${this.username}`);
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
        	callback(err, data);
        });
    }

    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
        console.log(`Converting money`);
        return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
        	callback(err, data);
        });
    }
}


function Stocks() {
	return ApiConnector.getStocks((err, data) => {
        if (err) {
                console.error('Error ');
        } else {
                console.log(`geted`);
        }});
}

let stocks = Stocks();

console.log(stocks);


function main() {
	const Vasy = new Profile({
	username: "Ivan",
	name: {
		firstName: "Иван",
		lastName: "Васильев",
	},
	password: "qwerty",
	});

	Vasy.createUser((err, data) => {
        if (err) {
                console.error('Error during creating user');
        } else {
                console.log(`Created new user`);
        }});

	Vasy.login({ username: Vasy.username, password: Vasy.password }, (err, data) => {
        if (err) {
                console.error('Error during logining user');
        } else {
                console.log(`User log in successfully`);
        }});

	Vasy.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
        if (err) {
                console.error('Error during adding money to User');
        } else {
                console.log(`Added rubles to User`);
        }});

	Vasy.convertMoney({ fromCurrency: 'RUB', targetCurrency: 'USD', targetAmount: '1' }, (err, data) => {
        if (err) {
                console.error('Error during converting money');
        } else {
                console.log(`Money converted successfully`);
        }});



}



main();

