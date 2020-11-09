import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWidthForm from './PopupWithForm';
import PopupImage from './PopupImage';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { apiData } from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [isEditProfilePopupOpen, setEditProfile] = React.useState(false)  
  function handleEditProfileClick() {
    setEditProfile(true);
  }
  
  const [isEditAvatarPopupOpen, setEditAvatar] = React.useState(false)
  function handleEditAvatarClick() {
    setEditAvatar(true);
  }

  const [isAddPlacePopupOpen, setAddCard] = React.useState(false)
  function handleAddPlaceClick() {
    setAddCard(true)
  }

  const [selectedCard, setSelectCardClick] = React.useState(null)
  function handleCardClick(card) {
    setSelectCardClick(card)
  }

  function closeAllPopups() {
    setEditProfile(false)
    setEditAvatar(false)
    setAddCard(false)
    handleCardClick(null)
  }

  function closeEscapePopup(event) {
    if (event.key === 'Escape') {
      closeAllPopups()
    }
  }

  function closeOverlayPopup(event) {
    if (event.target.classList.contains('popup')) {
      closeAllPopups()
    }
  }

  //тренажер.тема useEffect c mousemove
  React.useEffect(() => {
    document.addEventListener('keydown', closeEscapePopup);
    document.addEventListener('click', closeOverlayPopup);
    return () => {
      document.removeEventListener('keydown', closeEscapePopup);
      document.removeEventListener('click', closeOverlayPopup);
    }

  })


  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([apiData.getUserInfo(), apiData.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData)
        setCards(initialCards) 
      })   
      .catch((error) => {
        console.log(error);
    })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      apiData.setLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        })
        .catch((error) => {
          console.log(error);
      });
    } else {
      apiData.deleteLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        })
        .catch((error) => {
          console.log(error);
      })
    }
  }

  
  function handleCardDelete(card) {
      apiData.deleteCard(card._id)
        .then(() => {
          const newCards = cards.filter((c) => c._id !== card._id );          
          setCards(newCards);
        })
        .catch((error) => {
          console.log(error);
      })
  }

  function handleUpdateUser(items) {
      apiData.setUserInfo(items)
        .then((res) => {
          setCurrentUser(res)
          closeAllPopups()
        })
        .catch((error) => {
          console.log(error);
      })
    }
    
  
  function handleUpdateAvatar(item) {
      apiData.changeAvatar(item)
        .then((res) => {
          setCurrentUser(res)
          closeAllPopups()
        })
        .catch((error) => {
          console.log(error);
      })  
  }

  function handleAddPlaceSubmit(item) {
      apiData.addNewCard(item)
        .then((res) => {
          setCards([res, ...cards])
          closeAllPopups()
        })
        .catch((error) => {
          console.log(error);
      })  
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">       
    
      <Header />
      <Main
        cards={cards}    
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}  
      />
      <Footer />
    
      

    <section className="popups">  

    <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          >  
    </EditProfilePopup>
          
    <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}>   
    </EditAvatarPopup>      
          
    <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isClose={closeAllPopups}
          addNewCard={handleAddPlaceSubmit}  
          >
            
    </AddPlacePopup>

    <PopupWidthForm
          name='delete-card'
          title='Вы уверены?'
          nameForm='popup__form_delete-card'
          method='POST'
          isClose ={closeAllPopups}
          children={
            <>
              <button className="popup__button-delete" type="submit">Да</button>
            </>
          }
    />

    
        
    <PopupImage
        card={selectedCard}
        onClose={closeAllPopups}  
    />
        
    </section>

  </div>
  </CurrentUserContext.Provider>
      
  );
}

export default App;
