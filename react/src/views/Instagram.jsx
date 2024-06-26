import React, { useState,useRef,useEffect } from 'react';
import { useNavigate,useLocation  } from 'react-router-dom';
import InputEmoji from 'react-input-emoji';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useReactMediaRecorder } from "react-media-recorder";
import { AiTwotoneAudio } from "react-icons/ai";
import { FaRegStopCircle } from "react-icons/fa";


import axios from 'axios';



const Instagram = () => {

    //audio
  const [isRecording, setIsRecording] = useState(false);
  /*const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);*/
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  const recognitionRef = useRef(null);

  if (!recognitionRef.current && typeof window.webkitSpeechRecognition !== "undefined") {
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.interimResults = true;
    recognitionRef.current.continuous = true;
  }
    
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [statut, setStatut] = useState("");
    const [type, setType] = useState("");
    const [showDateInput, setShowDateInput] = useState(false);

    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const postId = query.get("id");
    const postTitle = query.get("title");
    const postStart = query.get("start");
   // const [inputValue, setInputValue] = useState(postTitle); // Utilisation du statut du poste comme valeur par défaut
   const [inputValue, setInputValue] = useState(postTitle || ''); // Utilisez le statut du poste comme valeur par défaut si disponible, sinon, laissez vide

    const [responseMsg, setResponseMsg] = useState({
       status: "",
       message: "",
       error: "",
    });
   //const [inputValue, setInputValue] = useState('');
    const [text, setText] = useState("");
const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [content, setContent] = useState('');



  const location = useLocation();
   


    const queryParams = new URLSearchParams(location.search);
    const typecal = queryParams.get('type');

    const isPublished = typecal === 'publié';
    const isPlanned = typecal === 'planifié';
    const isDraft = typecal === 'brouillon';


    // Définir les états pour désactiver les boutons selon les règles spécifiées
    const [isPublishButtonDisabled, setIsPublishButtonDisabled] = useState(isPublished || isPlanned);
    const [isSaveAsDraftButtonDisabled, setIsSaveAsDraftButtonDisabled] = useState(isPublished || isPlanned || isDraft);
    const [isProgramButtonDisabled, setIsProgramButtonDisabled] = useState(isPublished);

  const handleInputChange = (text) => {
    setInputValue(text);
    setCaption(text); // Mettre à jour aussi le texte de la légende
  };
  const handleContentChange = (event) => {
    const newContent = event.target.value;
    setContent(newContent);
    handleInputChange(newContent); // Appeler la fonction de gestion des changements de l'InputEmoji avec la nouvelle valeur
  };
    const handleImageUpload = (e) => {
       const files = Array.from(e.target.files);
       setImages(files);
    };
   
    const handleVideoUpload = (e) => {
       const files = Array.from(e.target.files);
       setVideos(files);
    };
   
    const handleStatutChange = (e) => {
       setStatut(e.target.value);
    };

  


    const fileInputRef = useRef(null);
    const fileInputRef1 = useRef(null);


    

    // Fonction pour déclencher l'événement de clic sur l'input de type fichier
    const triggerFileSelect = () => {
        fileInputRef.current.click();
    };
    const triggerFileSelect1 = () => {
        fileInputRef1.current.click();
    };
      const navigate = useNavigate();
    
      const Generer = async () => {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/genereria",
            {
              content: text,
            }
          );
    
          setText(response.data.data);
        } catch (err) {
          setError(err.response.data.message);
          setResponseData(null);
        }
      };
    


      
    const handlePlanify = () => {
      setShowDateInput(true);
  };



   
    
//draft methode 2 , na9sa fel backend type et date 
    const submitHandlerdraft = (e) => {
      e.preventDefault();
      const data = new FormData();
      images.forEach((image, index) => {
        data.append("images[]", image);
      });
      videos.forEach((video, index) => {
        data.append("videos[]", video);
      });
      data.append("statut", statut);
  
      axios.post("http://localhost:8000/api/saveAsDraft", data)
        .then((response) => {
          setImages([]);
          setVideos([]);
          setStatut("");
          setResponseMsg({
            status: response.data.status,
            message: response.data.message,
          });

        })
        .catch((error) => {
          console.error(error);
        });
   };





    function displayInput(value) {
        document.getElementById('display').textContent = value;
        setInputValue(value);

      }


      
      // Fonction pour effacer la valeur de l'entrée texte
      const handleCancel = () => {
        setInputValue('');
      };
    
   
    
     

     
      const handleGenereria = async () => {
         try {
           const response = await axios.post('http://localhost:8000/api/genereria', { content });
           setResponseData(response.data);
         } catch (error) {
           console.error('Erreur lors de l\'appel à l\'API:', error);
         }
      };














     // const [imageUrl, setImageUrl] = useState('');
      const [imageUrl, setImageUrl] = useState(new URLSearchParams(location.search).get('image_url') || '');

      
      const [caption, setCaption] = useState('');
      const [date, setDate] = useState('');
      const [showDatePicker, setShowDatePicker] = useState(false);
      const [isSingleImage, setIsSingleImage] = useState(true);
      const [isModalOpen, setIsModalOpen] = useState(false);
      //const [singleImage, setSingleImage] = useState(null); // État pour une image unique
      const [singleImage, setSingleImage] = useState({ image_url: new URLSearchParams(location.search).get('image_url') || null });
      
     // const [albumItems, setAlbumItems] = useState([]);
     const [albumItems, setAlbumItems] = useState([
      { image_url: new URLSearchParams(window.location.search).get('image_url') }
  ]);

      const [combinedValue, setCombinedValue] = useState('');

    
      const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
      };
    
      const handleAddSingleImage = () => {
        setAlbumItems([]);
        setIsSingleImage(true);
        setIsModalOpen(true);
      };
    
      const handleAddAlbumImage = () => {
        setSingleImage(null); // Réinitialiser l'image unique
        setIsSingleImage(false);
        setIsModalOpen(true);
      };
    
      const handleAddImageUrlToAlbum = () => {
        setAlbumItems([...albumItems, { image_url: imageUrl }]);
        setImageUrl('');
      };
    
      const handleAddSingleImageUrl = () => {
        setSingleImage({ image_url: imageUrl });
        setImageUrl('');
        setIsModalOpen(false); // Fermer le modal après ajout de l'image unique
      };
    
      const handleCaptionChange = (event) => {
        const newCaption = event.target.value;
        setCaption(newCaption);
        setCombinedValue(inputValue + newCaption);
      };
      const handleDateChange = (e) => {
        setDate(e.target.value);
      };


    
      const handleSubmit = (type) => {
        let formattedDate = '';
        if (type === 'planifié') {
          formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
        }
      
        const payload = {
          album_items: albumItems.length > 0 ? albumItems : null,
          image_url: isSingleImage && singleImage ? singleImage.image_url : '',
          caption: caption,
          type: type,
          date: formattedDate,
        };
      
        axios.post('http://localhost:8000/api/instagram', payload, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`,
            'Content-Type': 'multipart/form-data'

          }
        })
        .then(response => {
          console.log('Success:', response.data);
        })
        .catch(error => {
          console.error('Error:', error.response.data);
        });
      
        setIsModalOpen(false); // Fermer le modal après soumission
      };
      
      const submitHandler = () => {
        handleSubmit('publié');
      };
      
      const saveAsDraft = () => {
        handleSubmit('brouillon');
      };
      

      const handleRemoveSingleImage = () => {
        setSingleImage(null); // ou une autre logique pour supprimer l'image
      };
      
      const handleRemoveAlbumImage = (index) => {
        const updatedAlbumItems = [...albumItems];
        updatedAlbumItems.splice(index, 1);
        setAlbumItems(updatedAlbumItems);
      };
      





      const eventId = new URLSearchParams(window.location.search).get('id');


      // État pour stocker les événements
    const [events, setEvents] = useState([]);
    // État pour suivre si un poste planifié est sélectionné
    const [selectedPlannedEvent, setSelectedPlannedEvent] = useState(null);

    

    const handleProgramClick = () => {
        if (selectedPlannedEvent) {
            handleSelectEvent(selectedPlannedEvent);
        } else {
            // Logique existante pour ouvrir le date picker
            setShowDatePicker(true);
        }
    };

   







    const [eventDetails, setEventDetails] = useState(null);
    const [newDate, setNewDate] = useState('');

    useEffect(() => {
      let intervalId;
  
      if (isActive) {
        intervalId = setInterval(() => {
          const secondCounter = counter % 60;
          const minuteCounter = Math.floor(counter / 60);
  
          let computedSecond =
            String(secondCounter).length === 1
              ? `0${secondCounter}`
              : secondCounter;
          let computedMinute =
            String(minuteCounter).length === 1
              ? `0${minuteCounter}`
              : minuteCounter;
  
          setSecond(computedSecond);
          setMinute(computedMinute);
  
          setCounter((counter) => counter + 1);
        }, 1000);
      }
  
      return () => clearInterval(intervalId);
    }, [isActive, counter]);
    function stopTimer() {
      setIsActive(false);
      setCounter(0);
      setSecond("00");
      setMinute("00");
    }
    const {
      status,
      startRecording,
      stopRecording,
      pauseRecording,
      //mediaBlobUrl,
    } = useReactMediaRecorder({
      video: false,
      audio: true,
      echoCancellation: true,
    });

    // Chargement des détails de l'événement
    useEffect(() => {
        const fetchEventDetails = async () => {
            if (eventId) {
                try {
                    const response = await fetch(`http://localhost:8000/api/showparid/${eventId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch event details');
                    }
                    const eventData = await response.json();
                    setEventDetails(eventData);
                } catch (error) {
                    console.error('Error fetching event details:', error);
                }
            }
        };

        fetchEventDetails();
    }, [eventId]);

    // Mise à jour de la date de l'événement
    const handleSelectEvent = async () => {
        if (!eventId || !newDate) return;

        try {
            const response = await fetch(`http://localhost:8000/api/imagesplanif/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date: newDate })
            });

            if (!response.ok) {
                throw new Error('Failed to update event date');
            }

            setEventDetails(prevDetails => ({
                ...prevDetails,
                start: newDate,
                end: newDate
            }));
        } catch (error) {
            console.error('Error updating event date:', error);
        }
    };

    // Chargement des événements pour affichage
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/imagesplaniftest');
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

   

    useEffect(() => {
      return () => {
        stopRecording(); // Arrête l'enregistrement si encore en cours
      };
    }, [stopRecording]);
  
    useEffect(() => {
      const recognition = recognitionRef.current;
    
      const handleResult = (event) => {
        let transcript = "";
        for (const result of event.results) {
          transcript += result[0].transcript;
        }
        setInputValue(transcript);
      };
    
      const handleError = (event) => {
        console.error("Voice recognition error: ", event.error);
      };
    
      const handleEnd = () => {
        if (isRecording) {
          recognition.start();
        }
      };
    
      recognition.addEventListener('result', handleResult);
      recognition.addEventListener('error', handleError);
      recognition.addEventListener('end', handleEnd);
    
      // Maintenant, passons les fonctions spécifiques lors de la suppression
      return () => {
        recognition.removeEventListener('result', handleResult);
        recognition.removeEventListener('error', handleError);
        recognition.removeEventListener('end', handleEnd);
      };
    }, []);
  
    const toggleRecording = () => {
    if (isRecording) {
      stopTranscription();
    } else {
      handleVoiceToText();
    }
  };
  
    
  
    const handleVoiceToText = () => {
      if (isRecording) {
        stopTranscription();
      } else {
        setText("");
        setSecond("00");
        setMinute("00");
        setCounter(0);
        setIsActive(true);
        startRecording();
        setIsRecording(true);
        recognitionRef.current.start();
      }
    };
    
    const stopTranscription = () => {
      if (isRecording) {
        recognitionRef.current.stop();
        stopRecording();
        setIsRecording(false);
        setIsActive(false);
        stopTimer();
      }
    };



    const handlePublish = async () => {
  
      try {
        const response = await fetch(`http://localhost:8000/api/pubdraft/${postId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`,

            'Content-Type': 'application/json',
          },
        });
  
        const result = await response.json();
        
        if (response.ok) {
          alert('Post publié avec succès!');
          // Vous pouvez également rediriger l'utilisateur ou mettre à jour l'état de l'application ici
        } else {
          alert(`Erreur: ${result.message}`);
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur s\'est produite lors de la publication.');
      } 
    };
  


    const handleSchedule = async () => {
  
      try {
        const formattedDate = new Date(newDate).toISOString().slice(0, 19).replace('T', ' ');

        const response = await fetch(`http://localhost:8000/api/plandraft/${postId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`,

            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: formattedDate,
          }),
        });
  
        const result = await response.json();
        
        if (response.ok) {
          alert('Post planifié avec succès!');
          // Vous pouvez également rediriger l'utilisateur ou mettre à jour l'état de l'application ici
        } else {
          alert(`Erreur: ${result.message}`);
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur s\'est produite lors de la planification.');
      } 
    };

    

    
    return(
        
    <div className="Poste">
          <div className="conteneur-utilisateur">
            <div className="utilisateur">Welcome To Instagram</div>
          </div>
          
          <br />
          <div className="cadre2">
            <p><i className="fas fa-Poste"></i><strong> Create post</strong></p>
          </div>
    
          <div id="section1">
            <label><strong>Post in</strong></label>
            <select className="custom-select" id="selectBox">
              <option>Yassine Kochkache</option>
              <option>Access Content Agency</option>
            </select>
            <br />
            
            <label><strong>Post Details</strong></label><br />
            <label>Personnaliser la publication pour Instagram</label><br />
            <label>Enter a query here</label>
           
            <InputEmoji
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add tags ..."
        maxLength="40"
      />
      <div>
                        <div class="voice-control">
                          <div class="voice-button">
                          <button id="recordButton" onClick={toggleRecording}>
                            {isActive ? (
                              <FaRegStopCircle />
                            ) : (
                              <AiTwotoneAudio />
                            )}
                          </button>
                          </div>

                          <div class="timer">
                            <span className="minute">{minute}</span>
                            <span>:</span>
                            <span className="second">{second}</span>
                          </div>
                        </div>
                      </div>
       <label>Your text must not exceed 40 words</label> 
     
            <div style={{textAlign: 'right', marginTop: '20px'}}>
            <button className="custom-button1" onClick={handleCancel}> <i className="fas fa-times" style={{marginRight: '10px'}}></i>Cancel</button>
            <button className="custom-button" onClick={handleGenereria}> <i className="fas fa-cogs" style={{marginRight: '10px'}}></i> Générer</button>
            </div>

           
            <br />
            <div>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Entrez le contenu"
      />
    </div>
    
            <label><strong>Multimedia Content</strong></label><br />
            <label>share photos or video or reels.Instagram posts cannot exceed 10 Photos </label><br />
            <button className="custom-button1" onClick={handleAddSingleImage}>
                <i className="far fa-image" style={{ marginRight: '10px' }}></i>Add photo
            </button>

            {/* Input de type fichier caché */}
            <input
                type="file"
                name="images"
                multiple
                onChange={handleImageUpload}
                className="form-control"
                ref={fileInputRef}
                style={{ display: 'none' }} // Cachez l'input de type fichier
            />
 <button className="custom-button1" onClick={handleAddAlbumImage}>
                <i className="far fa-image" style={{ marginRight: '10px' }}></i>Add Albums
            </button>

            {/* Input de type fichier caché */}
            <input
                type="file"
                name="images"
                multiple
                onChange={handleVideoUpload}
                className="form-control"
                ref={fileInputRef1}
                style={{ display: 'none' }} // Cachez l'input de type fichier
            />
    
            <br />
    
            <label><strong>Programming options</strong></label><br />

            
        <button className="custom-button" onClick={submitHandler} disabled={isPublishButtonDisabled}
        >
          <i className="fas fa-paper-plane" style={{ marginRight: '10px' }}></i>Publier
        </button>
       
        <button className="custom-button1" onClick={handleProgramClick} disabled={isPublishButtonDisabled}>
          <i className="far fa-clock" style={{ marginRight: '10px' }}></i>Programmer
        </button>
        
        <button className="custom-button1" onClick={saveAsDraft} disabled={isSaveAsDraftButtonDisabled}
        >
          <i className="far fa-save" style={{ marginRight: '10px' }}></i>Save as a draft
        </button>
        <div>
            {/* Interface utilisateur pour afficher et modifier les détails de l'événement */}
            {eventDetails && (
                <>
                    <h1>{eventDetails.title}</h1>
                    <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                    <button className="custom-button1" onClick={handleSelectEvent} >
          <i className="far fa-clock" style={{ marginRight: '10px' }}></i>Programmer à nouveau 
        </button>

                </>
            )}
             {eventDetails && (
        <>
          <h1>{eventDetails.title}</h1>
          <input
            type="datetime-local" // Champ de date avec heure
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <button className="custom-button1" onClick={handleSchedule} disabled={isPublishButtonDisabled}>
            <i className="far fa-clock" style={{ marginRight: '10px' }}></i>Programmer à aaaaaaaaa
          </button>
        </>
      )}



{eventDetails && (
        <>
          <h1>{eventDetails.title}</h1>
         
          <button className="custom-button" onClick={handlePublish} >
      <i className="fas fa-paper-plane" style={{ marginRight: '10px' }}></i>Publier autre
    </button>
        </>
      )}


            {/* Afficher d'autres composants et éléments ici */}
        </div>
        {showDatePicker && (
        <div>
          <input
            type="datetime-local"
            value={date}
            onChange={handleDateChange}
          />
          <button onClick={() => { handleSubmit('planifié'); setShowDatePicker(false); }}>
            Confirm Schedule
          </button>
        </div>
      )}

     
     
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Image Modal"
       // ariaHideApp={false} // Désactiver l'aria hide app (non recommandé)

      >
        <h2>{isSingleImage ? 'Add Single Image' : 'Add Album Images'}</h2>
        <input
          type="text"
          value={imageUrl}
          onChange={handleImageUrlChange}
          placeholder="Image URL"
        />
        {!isSingleImage && (
          <button onClick={handleAddImageUrlToAlbum}>Add to Album</button>
        )}
        {isSingleImage && (
          <button onClick={handleAddSingleImageUrl}>Add Single Image</button>
        )}
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
           
          </div>
    
          <div id="section2">
            <label><strong>Post Preview</strong></label>
            <select className="custom-select" id="selectBox">
              <option>Yassine Kochkache</option>
              <option>Access Content Agency</option>
            </select>
            <br />
            <div className="conteneur-utilisateur">
              <div className="utilisateur"> <i className="fas fa-user"></i>Yassine Kochkache</div>
            </div>
            <p><output id="display">{inputValue}</output></p>


            <div className="cadre">
            {responseData && <div>{responseData.data}</div>}

            {singleImage && singleImage.image_url && (
    <div>
        <img src={singleImage.image_url} alt="Single Image" width="100" />
        <FontAwesomeIcon icon={faTimes} onClick={() => handleRemoveSingleImage()} />
    </div>
)}
  {albumItems.length === 0 ? (
                <p></p>
            ) : (
                albumItems.map((item, index) => (
                    <div key={index}>
                        {item.image_url ? (
                            <>
                                <img src={item.image_url} alt={`Album item ${index}`} width="100" />
                                <FontAwesomeIcon icon={faTimes} onClick={() => handleRemoveAlbumImage(index)} />
                            </>
                        ) : (
                            <p></p>
                        )}
                    </div>
                ))
            )}

            </div>
          </div>
    
          <button className="custom-button1"> <i className="far fa-heart" style={{marginRight: '10px'}}></i>Like</button>
          <button className="custom-button1"> <i className="far fa-comment" style={{marginRight: '10px'}}></i>Comment</button>
          <button className="custom-button1"> <i className="fas fa-share" style={{marginRight: '10px'}}></i>Share</button>
          <div className="clearfix"></div>
        </div>
        
      );
    }
    const styles = {
      overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
      },
      modal: {
          backgroundColor: '#FDFFFC',
          padding: '30px',
          borderRadius: '1em',
          width: '50%',
          border: '1px solid #011627',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#011627',
      },
      submitButton: {
          backgroundColor: '#011627',
          color: '#FDFFFC',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          marginRight: '10px',
      },
      closeButton: {
          backgroundColor: '#FDFFFC',
          color: '#011627',
          padding: '10px 20px',
          borderRadius: '5px',
          border: '1px solid #011627',
          cursor: 'pointer',
      },
  };
    
    export default Instagram;
    