class LogoutButton {
    constructor() {
        this.action = this.location.reload();
    }
}

const logoutButton = new LogoutButton();

class UserProfile {
    getCurrentUser() {
        fetch('/api/current')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Не удалось получить информацию о пользователе');
            })
            .then(data => {
                ProfileWidget.showProfile(data);
            })
            .catch(error => console.error(error));
    }
}

class RatesBoard {
    getRates() {
        fetch('/api/rates')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Не удалось получить курсы валют');
            })
            .then(data => {
                this.clearTable();
                this.fillTable(data);
            })
            .catch(error => console.error(error));
    }

    clearTable() {

    }

    fillTable(data) {

    }
}

const ratesBoard = new RatesBoard();
ratesBoard.getRates();
setInterval(() => ratesBoard.getRates(), 60000); 


class MoneyManager {
    constructor() {
        this.addMoneyCallback = this.addMoney.bind(this);
        this.conversionMoneyCallback = this.convertMoney.bind(this);
        this.sendMoneyCallback = this.sendMoney.bind(this);
    }

    addMoney(data) {
        fetch('/api/addMoney', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Ошибка пополнения баланса');
        })
        .then(data => {
            ProfileWidget.showProfile(data);
            setMessage('Баланс успешно пополнен');
        })
        .catch(error => setMessage(error.message));
    }

    convertMoney(data) {
        fetch('/api/convertMoney', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Ошибка конвертации валюты');
        })
        .then(data => {
            ProfileWidget.showProfile(data);
            setMessage('Валюта успешно конвертирована');
        })
        .catch(error => setMessage(error.message));
    }

    sendMoney(data) {
        fetch('/api/transferMoney', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Ошибка перевода валюты');
        })
        .then(data => {
            ProfileWidget.showProfile(data);
            setMessage('Деньги успешно переведены');
        })
        .catch(error => setMessage(error.message));
    }
}

const moneyManager = new MoneyManager();

class FavoritesWidget {
    constructor() {
        this.addUserCallback = this.addUser.bind(this);
        this.removeUserCallback = this.removeUser.bind(this);
    }

    getFavorites() {
        fetch('/api/getFavorites')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Не удалось получить избранное');
            })
            .then(data => {
                this.clearTable();
                this.fillTable(data);
                this.updateUsersList(data);
            })
            .catch(error => console.error(error));
    }

    clearTable() {
    }

    fillTable(data) {
    }

    updateUsersList(data) {
    }

    addUser(data) {
        fetch('/api/addUserToFavorites', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Ошибка добавления пользователя в избранное');
        })
        .then(data => {
            this.getFavorites();
            setMessage('Пользователь успешно добавлен в избранное');
        })
        .catch(error => setMessage(error.message));
    }

    removeUser(data) {
        fetch('/api/removeUserFromFavorites', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Ошибка удаления пользователя из избранного');
        })
        .then(data => {
            this.getFavorites();
            setMessage('Пользователь успешно удален из избранного');
        })
        .catch(error => setMessage(error.message));
    }
}

const favoritesWidget = new FavoritesWidget();
favoritesWidget.getFavorites();
ю