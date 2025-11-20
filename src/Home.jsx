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
        filteredMeetups = data.meetups.filter(meet => {
        let query = searchValue.toLowerCase()
        let currTitle = meet.title.toLowerCase()
        let currTagArray = meet.eventtags
        if(query==="")
            return meet.eventtype === eventType
        else
            return currTitle.includes(query) || currTagArray.includes(query)
    })
    }
    
    return(
        <>
        {loading && <p className="m-5">Loading...</p>}
        {error && <p>Error while fetching data.</p>}
        {data && (
            <>
            <div className="bg-light">
            <div className="container">
        <div className="d-flex justify-content-between">
        <a href="/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaAnUgoSo-AEaMQPb5b40ViSP_hcJUSu3sAw&s" alt="" className="img-fluid"/></a>
        <input  className="img-fluid" type="text" placeholder="Search by title and tag" value={searchValue} onChange={(event)=>setSearchValue(event.target.value)}/>
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
                
                <div className="col-md-4 col-12 col-sm-6" key={ele._id}>
                <Link to={`/details/${ele._id}`} >
                <div className="card">
                    
                    <img src={ele.photoUrl} className="img-fluid rounded" alt="" />
                    
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
        
        
    
