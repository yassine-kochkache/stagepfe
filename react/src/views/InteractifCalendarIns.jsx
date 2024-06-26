import React, { useState, useEffect, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const InteractifCalendarIns = () => {
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            // Fetch planified posts
            const planifiesResponse = await fetch('http://localhost:8000/api/imagesplaniftest');
            if (!planifiesResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const planifiesData = await planifiesResponse.json();

            // Fetch draft posts
            const draftsResponse = await fetch('http://localhost:8000/api/imagesdrafttest');
            if (!draftsResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const draftsData = await draftsResponse.json();

 // Fetch pub posts
 const pubResponse = await fetch('http://localhost:8000/api/imagespubliertest');
 if (!pubResponse.ok) {
     throw new Error('Network response was not ok');
 }
 const pubData = await pubResponse.json();


            // Combine planified and draft events
            const allEvents = [
                ...planifiesData.map(post => ({
                    id: post.id,
                    title: post.statut,
                    start: new Date(post.date),
                    end: new Date(post.date),
                    type: 'planifié',
                    image_url: post.images // Assurez-vous que l'URL de l'image est incluse

                })),
                ...draftsData.map(post => ({
                    id: post.id,
                    title: post.statut,
                    start: new Date(post.created_at),
                    end: new Date(post.created_at),
                    type: 'brouillon',
                    image_url: post.images // Assurez-vous que l'URL de l'image est incluse

                })),
                ...pubData.map(post => ({
                    id: post.id,
                    title: post.statut,
                    start: new Date(post.created_at),
                    end: new Date(post.created_at),
                    type: 'publié',
                    image_url: post.images // Assurez-vous que l'URL de l'image est incluse

                })),
            ];

            setEvents(allEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleEventDrop = async ({ event, start, end }) => {
        // Code pour mettre à jour la date de l'événement
    };

    const handleClickEvent = (event) => {
       


        navigate(`/instagram?id=${event.id}&title=${event.title}&start=${event.start}&type=${event.type}&image_url=${event.image_url}`);
    };
    const handleSelectEvent = async event => {
        handleClickEvent(event);
    };

    const eventPropGetter = (event) => {
        if (event.type === 'planifié') {
            return {
                style: {
                    backgroundColor: '#ffa500', // Couleur orange pour les événements planifiés
                    borderRadius: '0px',
                    opacity: 0.8,
                    color: 'white',
                    border: '0px',
                    display: 'block',
                }
            };
        } else if (event.type === 'brouillon') {
            return {
                style: {
                    backgroundColor: '#808080', // Couleur grise pour les événements brouillons
                    borderRadius: '0px',
                    opacity: 0.8,
                    color: 'white',
                    border: '0px',
                    display: 'block',
                }
            };
        } else if (event.type === 'publié') {
            return {
                style: {
                    backgroundColor: '#007b80', // Couleur verte pour les événements publiés
                    borderRadius: '0px',
                    opacity: 0.8,
                    color: 'white',
                    border: '0px',
                    display: 'block',
                }
            };
        }
        return {};
    };

    const EventComponent = ({ event }) => (
        <span>
            {event.type === 'planifié' && <span style={{ color: '#ffa500', marginRight: '5px' }}>●</span>}
            {event.type === 'brouillon' && <span style={{ color: '#808080', marginRight: '5px' }}>●</span>}
            {event.type === 'publié' && <span style={{ color: '#007b80', marginRight: '5px' }}>●</span>}

            {event.title}
        </span>
    );

    return (
        <div style={{ height: 600 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectEvent={handleSelectEvent}
                defaultView="month"
                onEventDrop={handleEventDrop}
                ref={calendarRef}
                eventPropGetter={eventPropGetter}
                components={{
                    event: EventComponent
                }}
            />
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#ffa500', marginRight: '5px' }}>●</span>
                <span>Poste de type planifié</span>
                <span style={{ color: '#808080', marginLeft: '20px', marginRight: '5px' }}>●</span>
                <span>Poste de type brouillon</span>
                <span style={{ color: '#007b80', marginLeft: '20px', marginRight: '5px' }}>●</span>
                <span>Poste de type publié</span>
            </div>
        </div>
    );
};

export default InteractifCalendarIns;