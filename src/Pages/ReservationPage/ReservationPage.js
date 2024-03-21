import React, { useState, useEffect, useMemo } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import './ReservationPage.css'; // Import CSS file for styling

const ReservationPage = () => {
    
    const [units, setUnits] = useState([]); // State for storing units/buildings
    const [selectedUnit, setSelectedUnit] = useState(''); // State for selected unit/building
    const [amenities, setAmenities] = useState([]); // State for storing amenities
    const [selectedAmenity, setSelectedAmenity] = useState(''); // State for selected amenity
    const [selectedDate, setSelectedDate] = useState(null); // State for selected date
    const [availableTimes, setAvailableTimes] = useState([]); // State for available times
    const [selectedTime, setSelectedTime] = useState(''); // State for selected time
    const [confirmVisible, setConfirmVisible] = useState(false); // State for confirmation button visibility
    const [selectedAmenityData, setSelectedAmenityData] = useState(null);
    const [timeVisible, setTimeVisible] = useState(false);

  
    // Building data with associated amenities
    const buildingData = useMemo(() =>[
        {
          id: 1,
          name: 'Oasis Towers',
          amenities: [
            { 
              name: 'Swimming Pool', 
              timeSlot: 60,
              reservations: [
                { date: '2024-03-25', start: '9:00 AM', end: '10:00 AM', user: 'John Doe' },
                { date: '2024-03-27', start: '2:00 PM', end: '2:30 PM', user: 'Jane Smith' }
                ],
              availability: { open: '6:00 AM', close: '10:00 PM', 
              days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
             } 
            },
            { 
              name: 'Massage Parlor', 
              timeSlot: 30,
              availability: { open: '9:00 AM', close: '8:00 PM', 
              days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                }, 
              closurePeriods: [
                { start: 'December 24th', end: 'December 26th' },
                { start: 'July 1st', end: 'July 5th' }
              ]
            }
          ]
        },
        {
          id: 2,
          name: 'AquaVista Residences',
          amenities: [
            { 
              name: 'Gym', 
              availability: { open: '24/7', 
              days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              timeSlot: 60 //In minutes
             } 
            },
            { 
              name: 'Sauna', 
              availability: { open: '5:00 PM', close: '10:00 PM', 
              days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              timeSlot: 60 //In minutes
            } 
            },
            { 
              name: 'Tennis Court', 
              availability: { open: '7:00 AM', close: '9:00 PM', 
              days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              timeSlot: 60 //In minutes
            } 
            }
          ]
        },
        {
          id: 3,
          name: 'Serenity Heights',
          amenities: [
            { 
              name: 'Rooftop Garden', 
              availability: { open: '8:00 AM', close: '8:00 PM', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] } 
            },
            { 
              name: 'Yoga Studio', 
              availability: { open: '6:00 AM', close: '9:00 PM', days: ['Monday', 'Wednesday', 'Friday'] } 
            },
            { 
              name: 'BBQ Area', 
              availability: { open: '12:00 PM', close: '10:00 PM', days: ['Thursday', 'Friday', 'Saturday', 'Sunday'] }, 
              closurePeriods: [{ start: 'December 31st', end: 'January 1st' }]
            }
          ]
        },
        {
          id: 4,
          name: 'Zenith Plaza',
          amenities: [
            { 
              name: 'Movie Theater', 
              availability: { open: '4:00 PM', close: '11:00 PM', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] } 
            },
            { 
              name: 'Game Room', 
              availability: { open: '10:00 AM', close: '11:00 PM', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] } 
            },
            { 
              name: 'Pet Spa', 
              availability: { open: '9:00 AM', close: '7:00 PM', days: ['Monday', 'Wednesday', 'Friday'] } 
            }
          ]
        },
        {
          id: 5,
          name: 'Harmony Gardens',
          amenities: [
            { 
              name: 'Swimming Pool', 
              availability: { open: '6:00 AM', close: '10:00 PM', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] } 
            },
            { 
              name: 'Indoor Basketball Court', 
              availability: { open: '7:00 AM', close: '11:00 PM', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] } 
            },
            { 
              name: 'Jacuzzi', 
              availability: { open: '8:00 AM', close: '10:00 PM', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] } 
            }
          ]
        }
      ], []);
  
 useEffect(()=>{
        const selectedBuilding = buildingData.find(building => building.id === parseInt(selectedUnit));
        if(selectedBuilding){
            const amenity = selectedBuilding.amenities.find(amenity => amenity.name === selectedAmenity);
            setSelectedAmenityData(amenity);
        }
    },[selectedAmenity, selectedUnit, selectedAmenityData]);//eslint-disable-line
  // Fetch units
  useEffect(() => {
    // Simulate fetching units
    setUnits(buildingData.map(building => ({ id: building.id, name: building.name })));
  }, [buildingData]); // Include buildingData in the dependency array

  const handleUnitSelect = (unitId) => {
    setSelectedUnit(unitId);
    // Find selected unit's amenities
    const selectedBuilding = buildingData.find(building => building.id === parseInt(unitId));
    if (selectedBuilding) {
        setAmenities(selectedBuilding.amenities);
    }
    };

    const handleAmenitySelect = (amenityName) => {
        setTimeVisible(false);
        setSelectedAmenity(amenityName);
    };

  // Function to handle date selection
  const handleDateSelect = (date) => {//eslint-disable-line
    setSelectedDate(date);
  };

  const moment = require('moment');

  // Function to fetch available times for the selected date
  const fetchAvailableTimes = (amenityName, reservations) => {
    //console.log(reservations[0].start);
    const selectedBuilding = buildingData.find(building => building.id === parseInt(selectedUnit));
    if (selectedBuilding) {
        const selectedAmenity = selectedBuilding.amenities.find(amenity => amenity.name === amenityName);
        if (selectedAmenity && selectedAmenity.availability) {
            const { open, close } = selectedAmenity.availability;
            const timeSlots = [];
            let currentTime = moment(`2024-01-01 ${open}`, 'YYYY-MM-DDTHH:mm:ss A');
            const endTime = moment(`2024-01-01 ${close} PM`, 'YYYY-MM-DDTHH:mm:ss A');
            const timeSlotMinutes = selectedAmenity.timeSlot || 60; // Default time slot is 60 minutes if not specified
            const existingReservations = reservations || [];
            while (currentTime.isSameOrBefore(endTime)) {
                const timeString = currentTime.format('h:mm A');

                let isReserved = false;
                existingReservations.forEach(reservation => {
                    const reservationStartTime = moment(`${reservation.date} ${reservation.start}`, 'YYYY-MM-DDTHH:mm:ss A');
                    const reservationEndTime = moment(`${reservation.date} ${reservation.end}`, 'YYYY-MM-DDTHH:mm:ss A');
                    // If the current time slot overlaps with the reservation, set isReserved to true
                    // console.log("Reservation start time:", reservationStartTime.format('YYYY-MM-DD HH:mm:ss'));
                    // console.log("Reservation end time:", reservationEndTime.format('YYYY-MM-DD HH:mm:ss'));
                    // console.log("Current time:", currentTime.format('YYYY-MM-DD HH:mm:ss'));
                    console.log(currentTime.isSameOrAfter(reservationStartTime));
                    if (currentTime.isSameOrAfter(reservationStartTime)&&currentTime.isBefore(reservationEndTime)) {
                        console.log("here");
                        isReserved = true;
                    }
                });
                // If the time slot is not reserved, add it to the list of available times
                if (!isReserved) {
                    // console.log("Pushed "+timeString);
                    timeSlots.push(timeString);
                }

                currentTime.add(timeSlotMinutes, 'minutes');
            }
            setAvailableTimes(timeSlots);
            setTimeVisible(true);
        }
    }
  };


  // Function to handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setConfirmVisible(true); // Show confirm button after time selection
  };

  // Function to handle confirmation
  const handleConfirmation = () => {
    // Implement confirmation logic
    alert(`Reservation confirmed for ${selectedDate} at ${selectedTime}`);
  };

  const handleDayClick = (date) => {
    // Add your logic here for handling the click event
    const day = date.toLocaleDateString('en-US', {weekday: 'long'});
    const formattedDate = date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
    console.log('Selected day:', day);
    if(selectedAmenity)
    CheckAvailability(day, selectedAmenityData, formattedDate);
  };

  const CheckAvailability = (selectedDate, amenity, formattedDate) => {
    setTimeVisible(false);
    const availableDays = amenity.availability.days.map(day => day.toLowerCase());
    const selectedDay = selectedDate.toLowerCase();
    if(availableDays.includes(selectedDay)){
       const amenityName = amenity.name;
       const reservations = amenity.reservations || [];
       const reservationsForFormattedDate = reservations.filter(reservation => {
        // Extract the date part from the reservation's date (YYYY-MM-DD format)
        const reservationDate = reservation.date;
        // Compare the extracted date with the formatted date
        return reservationDate === formattedDate;
        });
       fetchAvailableTimes(amenityName, reservationsForFormattedDate);
    }
    else{
        console.log("This facility is not open on this day");
    }

  }

  const [value, onChange] = useState(new Date());

  return (
    <div className="reservation-page">
      {/* Title */}
      <h1>Reservation Page</h1>

      {/* Unit Selection Field */}
      <select value={selectedUnit} onChange={(e) => handleUnitSelect(e.target.value)}>
                <option value="">Select Unit</option>
                {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                        {unit.name}
                    </option>
                ))}
            </select>

      {/* Amenity Selection Field */}
        <div>
            <h2>Select Amenity</h2>
            <select value={selectedAmenity} onChange={(e) => handleAmenitySelect(e.target.value)}>
                <option value="">Select Amenity</option>
                {amenities.map((amenity, index) => (
                    <option key={index} value={amenity.name}>
                        {amenity.name}
                    </option>
                ))}
            </select>
        </div>
      {/* Calendar Interface */}
      <div className="calendar">
        {/* Calendar component goes here */}
        <Calendar 
            onChange={onChange} 
            value={value}
            onClickDay={handleDayClick}
            calendarType='gregory'
            
        />
      </div>

      {/* Available Times Display */}
      {timeVisible&&
      (<div className="times">
       <h2>Available Times</h2>
        {availableTimes.map((time) => (
          <button key={time} onClick={() => handleTimeSelect(time)}>
            {time}
          </button>
        ))}
      </div>)}

      {/* Confirm Button */}
      {confirmVisible && <button onClick={handleConfirmation}>Confirm Reservation</button>}
    </div>
  );
};

export default ReservationPage;
