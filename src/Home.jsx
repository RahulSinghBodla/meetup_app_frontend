import { useState } from "react"
import useFetch from "./useFetch"
import { Link } from "react-router-dom";
export default function Home(){
    const [searchValue, setSearchValue] = useState("")
    const [eventType, setEventType] = useState("Both")
    const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let {data,loading,error} = useFetch("https://meetupappbackend.vercel.app/meetups")
    console.log(data)
    let filteredMeetups = []
    if(data)
    {
        if(eventType==="Both" && searchValue==="")
        filteredMeetups = data.meetups
        else
        filteredMeetups = data.meetups.filter(meet => (meet.eventtype === eventType) || (meet.title === searchValue))
    }
    
    return(
        <>
        {loading && <p>Loading...</p>}
        {error && <p>Error while fetching data.</p>}
        {data && (
            <>
            <div className="bg-light">
            <div className="container">
        <div className="d-flex justify-content-between">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaAnUgoSo-AEaMQPb5b40ViSP_hcJUSu3sAw&s" alt="" height="100px"/>
        <input className="text-align-right" type="text" placeholder="Search by title and tag" value={searchValue} onChange={(event)=>setSearchValue(event.target.value)}/>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
        <h2>Meetup Events</h2>
        <select name="eventtype" id="" value={eventType} onChange={(e)=>setEventType(e.target.value)}>
            <option value="Both">Both</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
        </select>
        </div>
            <div className="row py-3">
                {filteredMeetups.map((ele)=> (
                <>
                
                <div className="col-md-4" key={ele._id}>
                <Link to={`/details/${ele._id}`} >
                <div className="card">
                    
                    <img src={ele.photoUrl} height="220px" alt="" className="rounded"/>
                    
                </div>
                <p className="card-text secondary">{shortDays[new Date(ele.startTime).getDay()]} {months[new Date(ele.startTime).getMonth()]} {new Date(ele.startTime).getDate()} {new Date(ele.startTime).getFullYear()} {new Date(ele.startTime).getHours()}:{new Date(ele.startTime).getMinutes()}:{new Date(ele.startTime).getSeconds()} {new Date(ele.startTime).getHours()<12 ? "AM" : "PM"} IST</p>
                <h5>{ele.title}</h5>
                
                </Link>
                </div>
                </>
            ))}
            </div>
            </div>
            </div>
            </> )}
            </> )
}
        
        
    
