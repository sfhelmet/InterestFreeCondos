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

  
    // Input building data here
    // The structure of the data is really important else everything breaks in the code. 
    // Key points:
    //      - Note: All times must be in 24h format no PM and AM.
    //      - Each building has an ID, a name, an array of amenities
    //      - For each element of the amenities array, so each amenity, contains the name of the amenity, the duration of a reservation (timeSlot), an array of reservations,
    //          and an availability array
    //      - Each reservation contains the date of the reservation (YYYY-MM-DD format), the start time of the reservation, the end time of the reservation 
    //          (can be calculated as to not store it in the db but I need it as its on parameter), and the user who made the reservation (not used but should be stored to 
    //          fetch all reservations later on).
    //      - Each availability contains the open time of the facility, the close time of the facility, an array contain the days in a week the facility is opened,
    //          and an array containing the closure periods. This closure period array contains all the closure period stored as a start of closure and end of closure
    // NOTE: In the below buildingData, ONLY Oasis Tower has been properly formatted. As such, all the tests were made using Oasis tower. Thus, use Oasis Tower as your template.
    const buildingData = useMemo(() =>[
        {
          id: 1,
          name: 'Oasis Towers',
          amenities: [
            { 
              name: 'Swimming Pool', 
              timeSlot: 60,
              reservations: [
                { date: '2024-03-25', start: '9:00 ', end: '10:00 ', user: 'John Doe' },
                { date: '2024-03-27', start: '14:00 ', end: '15:00 ', user: 'Jane Smith' }
                ],
              availability: { open: '6:00 AM', close: '10:00 PM', 
              days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
             } 
            },
            { 
              name: 'Massage Parlor', 
              timeSlot: 30,
              reservations: [
                { date: '2024-03-26', start: '9:00 ', end: '9:30 ', user: 'John Doe' },
                { date: '2024-03-27', start: '14:30 ', end: '15:00 ', user: 'Jane Smith' }
                ],
              availability: { open: '9:00 AM', close: '8:00 PM', 
              days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              closurePeriods: [
                { start: '2024-12-24', end: '2024-12-26' },
                { start: '2024-04-01', end: '2024-04-05' }
              ]
                }
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

      //Handle pushing the reservation to the DB here 
  const handleConfirmation = () => {
    // Everthing is already properly formatted at this point.
    alert(`Reservation confirmed for ${selectedDate} at ${selectedTime}`);
  };
  
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
    setTimeVisible(false);
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

  const moment = require('moment');

  // Function to fetch available times for the selected date
  const fetchAvailableTimes = (amenityName, reservations, formattedDate) => {
    //console.log(reservations[0].start);
    const selectedBuilding = buildingData.find(building => building.id === parseInt(selectedUnit));
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
                    // console.log(formattedCurrentTime.format('YYYY-MM-DD HH:mm:ss') + " compared to "+ formattedStartTime.format('YYYY-MM-DD HH:mm:ss') + " equals "+formattedCurrentTime.isSameOrAfter(formattedStartTime));
                    // console.log(formattedCurrentTime.format('YYYY-MM-DD HH:mm:ss') + " compared to "+ formattedEndTime.format('YYYY-MM-DD HH:mm:ss') + " equals "+formattedCurrentTime.isBefore(formattedEndTime));
                    // console.log(formattedCurrentTime.isSameOrAfter(formattedStartTime)&&formattedCurrentTime.isBefore(formattedEndTime));
                    // console.log("");
                    if (formattedCurrentTime.isSameOrAfter(formattedStartTime)&&formattedCurrentTime.isBefore(formattedEndTime)) {
                        // console.log("here");
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


  const handleDayClick = (date) => {
    const day = date.toLocaleDateString('en-US', {weekday: 'long'});
    const formattedDate = date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
    if(selectedAmenity)
    CheckAvailability(day, selectedAmenityData, formattedDate);
  };

  const CheckAvailability = (selectedDate, amenity, formattedDate) => {
    setTimeVisible(false);
    setSelectedDate(formattedDate);
    const availableDays = amenity.availability.days.map(day => day.toLowerCase());
    const selectedDay = selectedDate.toLowerCase();
    if(availableDays.includes(selectedDay)){
        if(amenity.availability.closurePeriods){
            const selectedMoment = moment(formattedDate, 'YYYY-MM-DD');

            let isVacation = false;
            const closure = amenity.availability.closurePeriods || [];
            closure.forEach(period => {
                const periodStart = moment(period.start, 'YYYY-MM-DD');
                const periodEnd = moment(period.end, 'YYYY-MM-DD');
                // console.log(selectedMoment.format('YYYY-MM-DD') + " compared to "+ periodStart.format('YYYY-MM-DD') + " equals "+selectedMoment.isSameOrAfter(periodStart));
                // console.log(selectedMoment.format('YYYY-MM-DD') + " compared to "+ periodEnd.format('YYYY-MM-DD') + " equals "+selectedMoment.isBefore(periodEnd));
                // console.log(selectedMoment.isSameOrAfter(periodStart)&&selectedMoment.isBefore(periodEnd));
                // console.log("");
                if(selectedMoment.isSameOrAfter(periodStart)&&selectedMoment.isSameOrBefore(periodEnd)){
                    isVacation=true;
                }
            });
            if(isVacation){
                console.log("Vacation time");
                return;
            }
            else{
                const amenityName = amenity.name;
                const reservations = amenity.reservations || [];
                const reservationsForFormattedDate = reservations.filter(reservation => {
                    // Extract the date part from the reservation's date (YYYY-MM-DD format)
                    const reservationDate = reservation.date;
                    // Compare the extracted date with the formatted date
                    return reservationDate === formattedDate;
                    });
                fetchAvailableTimes(amenityName, reservationsForFormattedDate, formattedDate);
            }
        }


       
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
          <label key={time} className="time-radio">
          <input
              type="radio"
              name="time"
              value={time}
              checked={selectedTime === time}
              onChange={() => handleTimeSelect(time)}
          />
          {time}
      </label>
        ))}
      </div>)}

      {/* Confirm Button */}
      {confirmVisible && <button onClick={handleConfirmation}>Confirm Reservation</button>}
    </div>
  );
};

export default ReservationPage;
