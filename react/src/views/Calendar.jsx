import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const CalendarComponent = () => {
  const [postes, setPostes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/index');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPostes(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEventClick = async (info) => {
    const newDate = prompt("Entrez la nouvelle date (format YYYY-MM-DD HH:MM)");
    if (newDate) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/updatePlanification/${info.event.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ scheduledDateTime: newDate }),
        });
        if (!response.ok) {
          throw new Error('Failed to update event');
        }
        const updatedPostes = postes.map(poste => (
          poste.id === info.event.id ? { ...poste, scheduledDateTime: newDate } : poste
        ));
        setPostes(updatedPostes);
        console.log("Poste mis à jour avec succès !");
      } catch (error) {
        console.error('Erreur lors de la mise à jour du poste :', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="bg-blue-600 text-white py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Calendrier de Planification</h1>
          <button className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M16 11v2a2 2 0 002 2h2m-5.586 3.586a2 2 0 112.828-2.828l3.536 3.536a2 2 0 01-2.828 2.828l-3.536-3.536z" />
            </svg>
          </button>
        </div>
      </header>
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-bold mb-4">Événements Planifiés</h2>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={postes.map(poste => ({
            id: poste.id,
            title: poste.message,
            start: poste.scheduledDateTime,
            end: poste.scheduledDateTime,
          }))}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
