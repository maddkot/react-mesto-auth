
 class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;        
    }

    //метод вызова карточек с сервера
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            });           
    }

    //метод отправки карточки на сервер
    addNewCard(item) {
        return fetch(`${this.baseUrl}/cards`,
            {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                        /* name: item.title,
                        link: item.url */
                        name: item.name,
                        link: item.link
                    })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        });           
    }

    //метод удаления карточки
    deleteCard(id) { 
        return fetch(`${this.baseUrl}/cards/${id}`,
        {
            method: "DELETE",
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        });
    }


    //метод отправки лайка карточек
    setLike(id) {
        return fetch(`${this.baseUrl}/cards/likes/${id}`,
            {
                method: "PUT",
                headers: this.headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            });
    }

    //метод удаления лайка карточек
    deleteLike(id) {
        return fetch(`${this.baseUrl}/cards/likes/${id}`,
            {
                method: "DELETE",
                headers: this.headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            });
    }


    //метод получения данных о профиле
    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
        })
    }

    //метод изменение аватарки
    changeAvatar(avatarItem) {
        //console.log(avatarItem);
        return fetch(`${this.baseUrl}/users/me/avatar`,
            {
                method: "PATCH",
                headers: this.headers,
                body: JSON.stringify({
                    avatar: avatarItem.avatar
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            });
    }

    //метод отправки данных профиля
    setUserInfo(item) {
        return fetch(`${this.baseUrl}/users/me`,
            {
                method: "PATCH",
                headers: this.headers,
                body: JSON.stringify({
                    /* name: item.fullName,
                    about: item.description */
                    name: item.name,
                    about: item.about
                })
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                        }
                        return Promise.reject(new Error(`Ошибка: ${res.status}`));
            })
    }


}

export const apiData = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-14",  
    headers: {
      authorization: "b1c2d7eb-517c-4978-8a15-35a77684fa2b",
      "Content-Type": "application/json"
    },
  });