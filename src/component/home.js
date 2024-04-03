import '../App.css';
import { variables } from '../Variables';
import {useState, useEffect} from 'react' ;

function Home() {

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(0); 
  const [isChecked, setIsChecked] = useState(true); 
  const [name, setName] = useState('');
  const [date, setDate] = useState('04/05/24');
  const [dayNum, setDayNum] = useState(''); 

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  // //Fetches data
  // useEffect(() => {
  //   refreshList();
  // }, []); 
  // function refreshList(){
  //   fetch(variables.API_URL+'event')
  //   .then(response => response.json())
  //   .then(data => { 
  //     // Sort the data by eventId in descending order
  //     const sortedData = data.sort((a, b) => b.eventId - a.eventId);
  //     // Add the "Add new event" item at the beginning
  //     const newData = [
  //       { eventId: 0, name: 'Add new event', active: false, date: '', dayNum: '' },
  //       ...sortedData
  //     ];
  //     setEvents(newData);
  //   })
  // };  

  //dropdown select
  function handleDropdownChange(event) {
    setSelectedEvent(event.target.value);   
    const id = event.target.value  
    if(id === 0){
      setName('') 
    } else { 
      setName(events.find(ev => ev.eventId === parseInt(id))?.name || '') 
    }
    setDate(events.find(ev => ev.eventId === parseInt(id))?.date || '') 
    setDayNum(events.find(ev => ev.eventId === parseInt(id))?.dayNum || '') 
    setIsChecked(events.find(ev => ev.eventId === parseInt(id))?.active || '')  
  } 

  //insert event
  const Submit = () => {
    console.log(name,date,dayNum,isChecked)

    if(name !== "" && dayNum !== "" && dayNum !== "0" && date !== "" &&  /^\d+$/.test(dayNum)){
      if(isChecked){ 
        fetch(variables.API_URL+'eventDeactivater')
        .then(response => response.json())
        .then(data => { 
          console.log(data)
        })
      } 

      fetch(variables.API_URL+'event',{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            name: name,
            active: isChecked ? 1:0,
            date: date,
            dayNum: dayNum
          })
      })
      .then(res=>res.json())
      .then((result)=>{
          // alert(result); 
          console.log(result)
          // refreshList()
      },(error)=>{
          alert('Failed')
      }) 
    } else {
      alert("Fill all the necessary fields")
    }

  };

  //update event
  const Update = () => {
    console.log(name,date,dayNum,isChecked,selectedEvent)

    if(name !== "" && dayNum !== "" && dayNum !== "0" && date !== "" && /^\d+$/.test(dayNum)){
      if(isChecked){ 
        fetch(variables.API_URL+'eventDeactivater')
        .then(response => response.json())
        .then(data => { 
          console.log(data)
        })
      } 

      fetch(variables.API_URL+'event',{
          method:'PUT',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            name: name,
            active: isChecked ? 1:0,
            date: date,
            dayNum: dayNum,
            eventId: selectedEvent
          })
      })
      .then(res=>res.json())
      .then((result)=>{
          // alert(result); 
          console.log(result)
          // refreshList()
      },(error)=>{
          alert('Failed')
      })
    } else {
      alert("Fill all the necessary fields")
    }
  }; 

  function redirectTo(url) {
    window.location.href = url;
  }

  return (
    <div className="background"> 
      <div class="box">
        
          <h2 className="titleNames">iAttendance</h2>
          {/* Dropdown */}
          <div className="dropdown-container">
            <div>
              <h4 className='titleNames1'>Event:</h4>
            </div>
            <div className="date-holder">
              <select id="dropdown" name="dropdown" onChange={handleDropdownChange} value={selectedEvent} className='border'>
                {events.map(event => (
                  // Dropdown content
                  <option key={event.eventId} value={event.eventId} className={event.active ? 'active' : ''}>
                    {/* Checkbox icon */}
                    {event.active ? (<span className="checkmark">&#128505;</span>) : (<span className="checkmark">&#9744;</span>)}
                    {/* Dropdown Text */}
                    {event.eventId === 0 ? (event.name) : (event.name + " - Day " + event.dayNum)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Event Name */}
          <div>
            <div>
              <h4 className='titleNames1'>Event name:</h4>
            </div>
            <div className='container'>
              { selectedEvent !== "0" ? 
              <input className='textbox' type="text" id="input1" name="input1"  onChange={e => setName(e.target.value)}
              value={name}/>
              :
              <input className='textbox' type="text" id="input1" name="input1" value={name} onChange={e => setName(e.target.value)}/>
              }
            </div>
          </div>

          {/* Event Day Number */}
          <div>
            <div>
              <h4 className='titleNames1'>Day #:</h4>
            </div>
            <div className='container'>
              { selectedEvent !== "0" ? 
              <input className='textbox' type="text" id="input2" name="input2" onChange={e => setDayNum(e.target.value)}
              value={dayNum}/>
              :
              <input className='textbox' type="text" id="input2" name="input2" value={dayNum}
              onChange={e => setDayNum(e.target.value)}/>
              }
            </div>
          </div>

          {/* Event Date */}
          <div className="date-container">
            <div>
              <h4 className='titleNames1'>Day of Event:</h4>
            </div>
            <input 
              type="date" 
              id="dateInput" 
              value={date} 
              className='date-holder'
              onChange={(e) => console.log(e.target.value)} 
            />
          </div>

          {/* Active Checkbox */}
          <div class="checkbox-container"> 
            <input
              type="checkbox"
              checked={isChecked}
              onChange={toggleCheckbox}
            />
            <label for="active">Active</label> 
          </div>

          {/* Submit or update */}
          <div class="button-container">
            { selectedEvent !== "0" ? 
              <button className='btn' type="button" onClick={Update}>Update</button>
            :
              <button className='btn' type="button" onClick={Submit}>Submit</button>
            }
          </div>
          
          <div class="button-container">
            <button className='btn' type="button" onClick={() => redirectTo('/upload')}>Upload List</button>
          </div>
        
      </div>

    </div>
  );
}

export default Home;
