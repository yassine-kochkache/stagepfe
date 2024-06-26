import React, { useState,useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputEmoji from 'react-input-emoji';

import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';


import axios from 'axios';



const Poste = () => {
    
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [statut, setStatut] = useState("");
    const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaPath, setMediaPath] = useState(null); // Pour un seul fichier média
  const [mediaPaths, setMediaPaths] = useState([]); // Pour plusieurs fichiers média

  const [scheduledDateTime, setScheduledDateTime] = useState('');
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [error, setError] = useState(null);


    const [responseMsg, setResponseMsg] = useState({
       status: "",
       message: "",
       error: "",
    });
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (text) => {
        setMessage(text);
        setInputValue(text);

      setStatut(text); // Assurez-vous que cette ligne met à jour l'état 'statut'

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
    



   
    const submitHandler = (e) => {
       e.preventDefault();
       const data = new FormData();
      
       videos.forEach((video, index) => {
         data.append("videos[]", video);
       });
       data.append("statut", statut);
   
       axios.post("http://localhost:8000/api/publication", data)
         .then((response) => {
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
    
   
    
     
 
   

    const handlePostSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("message", statut);
        formData.append("media_path", mediaPath);

        axios.post("http://localhost:8000/api/publication", formData)
            .then((response) => {
                setStatut("");
                setMediaPath(null);
                setResponseMsg({
                    status: response.data.status,
                    message: response.data.message,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
      
    
    const handleSubmit1 = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('message', message);
        if (selectedFile) {
          formData.append('media_path', selectedFile);
        }
        console.log('TOKEN:', localStorage.getItem('TOKEN')); // Ajoutez ceci pour vérifier le jeton

        try {
          const response = await axios.post('http://localhost:8000/api/publication', formData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`, // Utilisez localStorage.getItem('TOKEN') pour inclure le jeton

              'Content-Type': 'multipart/form-data'
            }
          });
          console.log(response.data); // Affiche le social_id retourné par l'API
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        const files = Array.from(event.target.files);

        setImages(files);


      };
      const handleFileChangevideo = (event) => {
        setSelectedFile(event.target.files[0]);
        const files = Array.from(event.target.files);

        setVideos(files);


      };
      // Fonction pour envoyer la requête POST
    const saveDraft = async () => {
        const formData = new FormData();
        formData.append('page_id', 'your_page_id_here'); // Remplacez par l'ID de la page
        formData.append('message', message);

        // Ajouter le fichier média au formulaire
        if (mediaPath) {
            formData.append('media_path', mediaPath);
        }

        // Ajouter les chemins des fichiers média au formulaire
        if (mediaPaths.length > 0) {
            mediaPaths.forEach((path, index) => {
                formData.append(`media_paths[${index}]`, path);
            });
        }

        try {
            const response = await axios.post('http://localhost:8000/api/saveDraft', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data.message); // Affiche le message de succès
        } catch (error) {
            console.error(error);
        }
    };
     // Exemple de gestion des fichiers média
     const handleMediaUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMediaPath(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
      

   /* const handleImageUpload = (e) => {
        if (e.target.files.length === 1) {
            setMediaPath(e.target.files[0]);
        } else {
            setMediaPaths(e.target.files);
        }
    };
*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!showDateTimePicker) {
            setShowDateTimePicker(true);
            return;
        }

        setError(null); // Clear previous error messages

        // Convert datetime-local value to the required format Y-m-d H:i:s
        const formattedDateTime = scheduledDateTime.replace('T', ' ') + ':00';

        const formData = new FormData();
        formData.append('message', message);
        formData.append('scheduled_datetime', formattedDateTime);

        if (mediaPath) {
            formData.append('media_path', mediaPath);
        }

        if (mediaPaths.length > 0) {
            Array.from(mediaPaths).forEach((file, index) => {
                formData.append(`media_paths[${index}]`, file);
            });
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/planification', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            alert('Post scheduled successfully!');
        } catch (error) {
            console.error('Error scheduling post:', error);
            if (error.response && error.response.data) {
                setError(error.response.data.error);
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    const brou = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('message', message);
  
      if (images.length > 0) {
        images.forEach((image, index) => {
          formData.append('media_path', image);
        });
      }
  
      if (videos.length > 0) {
        videos.forEach((video, index) => {
          formData.append('media_path', video);
        });
      }
      console.log('TOKEN:', localStorage.getItem('TOKEN')); // Ajoutez ceci pour vérifier le jeton

      try {
        const response = await axios.post('http://localhost:8000/api/saveDraft', formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`, // Utilisez localStorage.getItem('TOKEN') pour inclure le jeton

            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data.message);
      } catch (error) {
        console.error('There was an error saving the draft!', error);
      }
    };





    const planf = async (e) => {
      e.preventDefault();
      if (!showDateTimePicker) {
          setShowDateTimePicker(true);
          return;
      }

      setError(null); // Clear previous error messages
      const formattedDateTime = scheduledDateTime.replace('T', ' ') + ':00';

      const formData = new FormData();
      formData.append('message', message);
      formData.append('scheduled_datetime', formattedDateTime);

      if (images.length > 0) {
        images.forEach((image, index) => {
          formData.append('media_path', image);
        });
      }
  
      if (videos.length > 0) {
        videos.forEach((video, index) => {
          formData.append('media_path', video);
        });
      }
      console.log('TOKEN:', localStorage.getItem('TOKEN')); // Ajoutez ceci pour vérifier le jeton

      try {
          const response = await axios.post('http://127.0.0.1:8000/api/planification', formData, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`, // Utilisez localStorage.getItem('TOKEN') pour inclure le jeton

                  'Content-Type': 'multipart/form-data'
              }
          });
          console.log(response.data);
          alert('Post scheduled successfully!');
      } catch (error) {
          console.error('Error scheduling post:', error);
          if (error.response && error.response.data) {
              setError(error.response.data.error);
          } else {
              setError('An unexpected error occurred.');
          }
      }
  };



const handleProgramClick = () => {
    setShowDateTimePicker(true);
};


  
    return(
        
    <div className="Poste">
               <div className="cadre2">
            <p><i className="fas fa-Poste"></i><strong> Create post</strong></p>
          </div>
    
          <div id="section1">
           
            <br />
            
            <label><strong>Post Details</strong></label><br />
            <label>Personnaliser la publication pour Facebook</label><br />
            <label>Enter a query here</label>
            <InputEmoji
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add tags ..."
        maxLength="40"
      />
            <i className="far fa-grin-beam" id="emoji"></i>            <label>Your text must not exceed 40 words</label> 
     
            <div style={{textAlign: 'right', marginTop: '20px'}}>
            <button className="custom-button1" onClick={handleCancel}> <i className="fas fa-times" style={{marginRight: '10px'}}></i>Cancel</button>
            <button className="custom-button"> <i className="fas fa-cogs" style={{marginRight: '10px'}}></i> Générer</button>
            </div>

           
            <br />
    
            <label><strong>Multimedia Content</strong></label><br />
            <label>share photos or video or reels.Facebook posts cannot exceed 10 Photos </label><br />
            <button className="custom-button1" onClick={triggerFileSelect}>
                <i className="far fa-image" style={{ marginRight: '10px' }}></i>Add photo
            </button>

            {/* Input de type fichier caché */}
            <input
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
                className="form-control"
                ref={fileInputRef}
                style={{ display: 'none' }} // Cachez l'input de type fichier
            />
 <button className="custom-button1" onClick={triggerFileSelect1}>
                <i className="far fa-image" style={{ marginRight: '10px' }}></i>Add video
            </button>

            {/* Input de type fichier caché */}
            <input
                type="file"
                name="images"
                multiple
                onChange={handleFileChangevideo}
                className="form-control"
                ref={fileInputRef1}
                style={{ display: 'none' }} // Cachez l'input de type fichier
            />
                        <button className="custom-button1"> <i className="fas fa-film" style={{marginRight: '10px'}}></i>Add post</button>
    
            <br />
    
            <label><strong>Programming options</strong></label><br />
            <button className="custom-button" onClick={handleSubmit1}> <i className="fas fa-paper-plane" style={{marginRight: '10px'}}></i> Publier</button>

            <Container>
            
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={planf}>
          
              
                {showDateTimePicker && (
                    <TextField
                        label="Scheduled DateTime"
                        type="datetime-local"
                        value={scheduledDateTime}
                        onChange={(e) => setScheduledDateTime(e.target.value)}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />
                )}
                <Box mt={2}>
                    <button className="custom-button1"> <i className="far fa-clock" style={{marginRight: '10px'}}></i>Program</button>
                </Box>
            </form>
        </Container>
            <button className="custom-button1" onClick={brou}> <i className="far fa-save" style={{marginRight: '10px'}}></i>Save as a draft</button>
          </div>
    
          <div id="section2">
           
            <br />
            <div className="conteneur-utilisateur">
              <div className="utilisateur"> <i className="fas fa-user"></i>Ben Hamouda Ahmed</div>
            </div>
            <p><output id="display">{inputValue}</output></p>


            <div className="cadre">
            {images.map((image, index) => (
            <img key={index} src={URL.createObjectURL(image)} alt={`upload-${index}`} style={{ width: '100px', height: '100px', margin: '5px' }} />
          ))}
           {videos.map((video, index) => (
    <video key={index} src={URL.createObjectURL(video)} controls style={{ width: '100px', height: '100px', margin: '5px' }} />
  ))}
    
            </div>
          </div>
    
          <button className="custom-button1"> <i className="far fa-heart" style={{marginRight: '10px'}}></i>Like</button>
          <button className="custom-button1"> <i className="far fa-comment" style={{marginRight: '10px'}}></i>Comment</button>
          <button className="custom-button1"> <i className="fas fa-share" style={{marginRight: '10px'}}></i>Share</button>
          <div className="clearfix"></div>
        </div>
        
      );
    }
    
    export default Poste;