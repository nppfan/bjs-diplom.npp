
const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload(); 
        }
    });
};

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data); 
    }
});

const ratesBoard = new RatesBoard();

function getCurrencyRates() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data); 
        }
    });
}

getCurrencyRates();


setInterval(getCurrencyRates, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Баланс успешно пополнен.");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};


moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data); 
            moneyManager.setMessage(true, "Валюта успешно конвертирована.");
        } else {
            moneyManager.setMessage(false, response.error); 
        }
    });
};

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data); 
            moneyManager.setMessage(true, "Деньги успешно переведены.");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};
const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if (response.success) {
        favoritesWidget.clearTable(); 
        favoritesWidget.fillTable(response.data); 
        moneyManager.updateUsersList(response.data); 
    }
});

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable(); 
            favoritesWidget.fillTable(response.data); 
            moneyManager.updateUsersList(response.data); 
            favoritesWidget.setMessage(true, "Пользователь успешно добавлен в избранное.");
        } else {
            favoritesWidget.setMessage(false, response.error); 
        }
    });
};

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data); 
            moneyManager.updateUsersList(response.data); 
            favoritesWidget.setMessage(true, "Пользователь успешно удалён из избранного.");
        } else {
            favoritesWidget.setMessage(false, response.error); 
        }
    });
};
