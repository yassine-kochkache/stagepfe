import React, { useState, useEffect, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const FullCalendar = () => {
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);

    useEffect(() => {
        fetchPlanifies();
    }, []);

    const fetchPlanifies = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/imagesplaniftest');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEvents(
                data.map(post => ({
                    id: post.id,
                    title: post.statut,
                    start: new Date(post.date),
                    end: new Date(post.date),
                }))
            );
        } catch (error) {
            console.error('Error fetching planifies:', error);
        }
    };

    const handleEventDrop = async ({ event, start, end }) => {
        try {
            const response = await fetch(`http://localhost:8000/api/imagesplanif/${event.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`,

                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: start,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update event date');
            }
        } catch (error) {
            console.error('Error updating event date:', error);
        }
    };

    const handleSelectEvent = async event => {
        const newDate = prompt('Entrez la nouvelle date (YYYY-MM-DD) :', event.start.toISOString().split('T')[0]);
        if (newDate) {
            try {
                const response = await fetch(`http://localhost:8000/api/imagesplanif/${event.id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`,

                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        date: newDate,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Failed to update event date');
                }
                const updatedEvents = events.map(ev => {
                    if (ev.id === event.id) {
                        return { ...ev, start: new Date(newDate), end: new Date(newDate) };
                    }
                    return ev;
                });
                setEvents(updatedEvents);
                const formattedNewDate = new Date(newDate);
              //  calendarRef.current.getApi().gotoDate(formattedNewDate);
            } catch (error) {
                console.error('Error updating event date:', error);
            }
        }
    };
    

    return (
        <div style={{ height: 500 }}>
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
            />
        </div>
    );
};

export default FullCalendar;
