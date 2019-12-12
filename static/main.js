class Profile {
	constructor({ username, name: {firstName, lastName}, password }) {
    this.username = username;
    this.name = {
        firstName, 
        lastName
        };
    this.password = password;
  	}

  	createUser(callback) {
        return ApiConnector.createUser({username: this.username, name: this.name, password: this.password}, (err, data) => {
              console.log(`Creating user ${this.username}.`);
              callback(err, data);
        });
    }

    login(callback) {
        return ApiConnector.performLogin({username: this.username, password: this.password}, (err, data) => {
            console.log(`Logining user ${this.username}`);
            callback(err, data);
        });
    }

    addMoney({currency, amount}, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
    }

     convertMoney({fromCurrency, targetCurrency, targetAmount}, callback) {
        return ApiConnector.convertMoney({fromCurrency, targetCurrency, targetAmount}, (err, data) => {
            console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
            callback(err, data);
        });
    }

    transferMoney({to, amount}, callback) {
        return ApiConnector.transferMoney({to, amount}, (err, data) => {
            console.log(`Transfering ${amount} Netcoins to ${to}`);
            callback(err, data);
        });
    }
}

function getStocks(callback) {
    return ApiConnector.getStocks((err, data) => {
    console.log(`Getting stocks`);
    callback(err, data);
    });
}




function main() {

	const IVAN = new Profile({
                username: 'IVAN',
                name: { firstName: 'IVAN', lastName: 'Kulakov' },
                password: 'password',
});

	const VASY = new Profile({
                username: 'VASY',
                name: { firstName: 'Vasy', lastName: 'Shmykov' },
                password: 'password',
});

	getStocks((err, data) => {
    if(err) {
    console.error(`Error during getting stocks`);
    } else {
    let courses = data;



		VASY.createUser((err, data) => {
		if(err) {
		console.error(`Error during creating ${VASY.username}`);
		} else {
		console.log(`${VASY.username} is created!`);

			IVAN.createUser((err, data) => {
		    if (err) {
		    console.error(`Error during creating user`);
		    } else {
		    console.log(`Created user ${IVAN.username}`);

		            IVAN.login((err, data) => {
		            if(err) {
		            console.error(`Error during logining ${IVAN.username}`);
		            } else {
		            console.log(`${IVAN.username} is logined!`);

							IVAN.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
		                    if (err) {
		                    console.error(`Error during adding money to ${IVAN.username}`);
		                    } else {
		                    const convertResult = courses[5].RUB_NETCOIN * data.wallet.RUB;
		                    console.log(`Получилось: ${convertResult}`);
		                    console.log(`Added ${data.wallet.RUB} RUB to ${IVAN.username}`);

					        		IVAN.convertMoney({fromCurrency: 'RUB', targetCurrency: 'NETCOIN', targetAmount: convertResult}, (err, data) => {
				                    if (err) {
				                    console.error(`Error during converting money`);
				                    } else {
				                    const transfMoney = data.wallet.NETCOIN;
									console.log(`Converted to NETCOIN `);
						                    IVAN.transferMoney({to: VASY.username, amount: transfMoney}, (err, data) => {
						                    if(err) {
						                    console.error(`Error during transfer money`);
						                    } else {
						                    console.log(`Transfer NETCOINS finished`);


				                    	}});
				                    }});
			                    }}); 
		        			}});
		    			}});
		   			 }});
   		}});
}



main();



