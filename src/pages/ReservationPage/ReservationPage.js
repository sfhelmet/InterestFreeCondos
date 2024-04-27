import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import { Box } from '@mui/system';
import { db } from '../../config/firebase';
import { collection, doc, getDocs, updateDoc } from '@firebase/firestore';
import moment from 'moment';
import AuthenticatedUserContext from '../../contexts/AuthenticatedUserContext';

import './Calendar.css';
import './ReservationPage.css'; // Import CSS file for styling

const ReservationPage = () => {
  const [buildingData, setBuildingData] = useState([]);
  const [currentBuilding, setCurrentBuilding] = useState('Select Unit');
  const [currentAmenity, setCurrentAmenity] = useState('Select Amenity');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [timeVisible, setTimeVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const { authenticatedUser: currentUser } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    const fetchBuildingData = async () => {
      const fetchedUnits = await getDocs(collection(db, "condoReservationData"));
      const parsedUnits = await Promise.all(fetchedUnits.docs.map(async (unitReservationData) => {
        return unitReservationData.data()
      }));
  
      parsedUnits.sort((a,b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      })
  
      setBuildingData(parsedUnits)
    };

    fetchBuildingData();
  },[]);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setConfirmVisible(true); // Show confirm button after time selection
  };

  const saveReservation = async () => {
    const buildingToUpdate = buildingData.find(b => b.name === currentBuilding);
    const timeSlot = buildingToUpdate.amenities.find(a => a.name === currentAmenity).timeSlot ?? 60;
    const newReservation = {
      date: selectedDate,
      start: selectedTime,
      end: moment(selectedTime,'H:mm').add(timeSlot,'minutes').format('H:mm'),
      user: currentUser.userName
    }

    buildingToUpdate.amenities.forEach(a => {
      if (a.name === currentAmenity) {
        a.reservations.push(newReservation);
      }
    });

    const docRef = doc(db,'condoReservationData',`${buildingToUpdate.id}`);

    await updateDoc(docRef, { "amenities": buildingToUpdate.amenities })
      .then(() => {
        alert(`Reservation confirmed for ${selectedDate} at ${selectedTime}`);
      })
      .catch(err => {
        console.error("Reservation Confirmation failed");
        console.error(err.message);
      });
  }
  const handleConfirmReservation = () => {
    // Everthing is already properly formatted at this point.
    saveReservation()
    //alert(`Reservation confirmed for ${selectedDate} at ${selectedTime}`);
  };
  
  const handleCalendarDayClick = (date) => {
    const selectedDay = date.toLocaleDateString('en-US', {weekday: 'long'}).toLowerCase();
    const formattedDate = date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
    if (currentBuilding !== 'Select Building' && currentAmenity !== 'Select Amenity') {
      checkAvailability(selectedDay,formattedDate)
    }
  }

  const checkAvailability = (chosenDay,formattedDate) => {
    setSelectedDate(formattedDate)

    if (currentAmenity !== 'Select Amenity') {
      const selectedBuilding = buildingData.find(b => b.name === currentBuilding);
      const selectedAmenity = selectedBuilding.amenities.find(a => a.name === currentAmenity);
      const availableDays = selectedAmenity.availability.days.map(day => day.toLowerCase());

      if (availableDays.includes(chosenDay)) {
        if (selectedAmenity.availability.closurePeriods) {
          const selectedMoment = moment(formattedDate, 'YYYY-MM-DD');

          let isVacation = false;
          const closure = selectedAmenity.availability.closurePeriods || [];
          closure.forEach(period => {
              const periodStart = moment(period.start, 'YYYY-MM-DD');
              const periodEnd = moment(period.end, 'YYYY-MM-DD');
              if(selectedMoment.isSameOrAfter(periodStart) && selectedMoment.isSameOrBefore(periodEnd)){
                  isVacation=true;
              }
          });
          if(isVacation){
            console.log("Vacation time");
            return;
          }
          else{
            const amenityName = selectedAmenity.name;
            const reservations = selectedAmenity.reservations || [];
            const reservationsForFormattedDate = reservations.filter(reservation => {
              // Extract the date part from the reservation's date (YYYY-MM-DD format)
              const reservationDate = reservation.date;
              // Compare the extracted date with the formatted date
              return reservationDate === formattedDate;
            });
            
            fetchAvailableTimes(amenityName, reservationsForFormattedDate, formattedDate);
          }
        }
        else{
            const amenityName = selectedAmenity.name;
            const reservations = selectedAmenity.reservations || [];
            const reservationsForFormattedDate = reservations.filter(reservation => {
              // Extract the date part from the reservation's date (YYYY-MM-DD format)
              const reservationDate = reservation.date;
              // Compare the extracted date with the formatted date
              return reservationDate === formattedDate;
            });
            
            fetchAvailableTimes(amenityName, reservationsForFormattedDate, formattedDate);
        }
      }
    } else {
      console.log("This facility is not open on this day");
    }
  }
  const fetchAvailableTimes = (amenityName, reservations, formattedDate) => {
    const selectedBuilding = buildingData.find(building => building.name === currentBuilding);
    if (selectedBuilding) {
        const selectedAmenity = selectedBuilding.amenities.find(amenity => amenity.name === amenityName);
        if (selectedAmenity && selectedAmenity.availability) {
            const { open, close } = selectedAmenity.availability;
            const timeSlots = [];
            let currentTime = moment(`${formattedDate} ${open}`, 'YYYY-MM-DDTHH:mm:ss A');
            const endTime = moment(`${formattedDate} ${close} PM`, 'YYYY-MM-DDTHH:mm:ss A');
            const timeSlotMinutes = selectedAmenity.timeSlot || 60; // Default time slot is 60 minutes if not specified
            const existingReservations = reservations || [];
            while (currentTime.isSameOrBefore(endTime)) {
                const timeString = currentTime.format('HH:mm');
                let isReserved = false;
                existingReservations.forEach(reservation => {
                    const reservationStartTime = moment(`${reservation.date} ${reservation.start}`, 'YYYY-MM-DDTHH:mm:ss');
                    const reservationEndTime = moment(`${reservation.date} ${reservation.end}`, 'YYYY-MM-DDTHH:mm:ss');
                    
                    const formattedCurrentTime = moment(currentTime.format('YYYY-MM-DD HH:mm:ss'));
                    const formattedStartTime = moment(reservationStartTime.format('YYYY-MM-DD HH:mm:ss'));
                    const formattedEndTime = moment(reservationEndTime.format('YYYY-MM-DD HH:mm:ss'));
                    if (formattedCurrentTime.isSameOrAfter(formattedStartTime)&&formattedCurrentTime.isBefore(formattedEndTime)) {
                        isReserved = true;
                    }
                });
                // If the time slot is not reserved, add it to the list of available times
                if (!isReserved) {
                    timeSlots.push(timeString);
                }

                currentTime.add(timeSlotMinutes, 'minutes');
            }
            setAvailableTimes(timeSlots);
            setTimeVisible(true);
        }
    }
  }

  return (
    <Box className='reservation-page'>
      <h1>Reservation Page</h1>
      <Box className='unit-container'>
        <h3>Select Unit</h3>
        <select value={currentBuilding} onChange={(e) => setCurrentBuilding(e.target.value)}>
          <option value='Select Unit'>Select Unit</option>
          { buildingData.map(b => {
              return <option key={b.id} value={b.name}>{b.name}</option>
          })}
        </select>
      </Box>
      <Box className='amenity-container'>
        <h3>Select Amenity</h3>
        <select value={currentAmenity} onChange={(e) => setCurrentAmenity(e.target.value)}>
          <option value='Select Amenity'>Select Amenity</option>
          { buildingData.map(b => {
              if (b.name === currentBuilding) {
                const amenities = b.amenities.map((a,i) => {
                  return <option key={i} value={a.name}>{a.name}</option>
                })
                return amenities;
              } else {
                return null;
              }
          })}
        </select>
      </Box>
      <div className='thisContainer'>
      <Box className='calendar-container'>
        <div className="calendar">
          <Calendar  
              value={new Date()}
              onClickDay={handleCalendarDayClick}
              calendarType='gregory'
          />
        </div>
      </Box>

      {timeVisible &&
      (
        <div className="times">
          <h3>Available Times</h3>
          <div className='timeDisplay'>
            {availableTimes.map((time) => (
              <label key={time} className="time-radio">
                <span>{time}</span>
                <input className='timeButton'
                    type="radio"
                    name="time"
                    value={time}
                    checked={selectedTime === time}
                    onChange={() => handleTimeSelect(time)}
                />
              </label>
            ))}
            </div>
        </div>
      )}
      </div>

      {confirmVisible && <button onClick={handleConfirmReservation}>Confirm Reservation</button>}
    </Box>
  );
};

export default ReservationPage;
