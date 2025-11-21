import { useState } from "react";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [eventType, setEventType] = useState("Both");
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const { data, loading, error } = useFetch("https://meetupappbackend.vercel.app/meetups");
  
  let filteredMeetups = [];
  
  if (data) {
    if (eventType === "Both" && searchValue === "") {
      filteredMeetups = data.meetups;
    } else {
      filteredMeetups = data.meetups.filter(meet => {
        let query = searchValue.toLowerCase();
        let currTitle = meet.title.toLowerCase();
        let currTagArray = meet.eventtags;

        if (query === "") return meet.eventtype === eventType;
        return currTitle.includes(query) || currTagArray.includes(query);
      });
    }
  }

  return (
    <>
      {loading && <p className="m-5">Loading...</p>}
      {error && <p className="m-5">Error while fetching data.</p>}

      {data && (
        <div className="bg-light">
          <div className="container py-3">

            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center flex-wrap py-2">
              <a href="/">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaAnUgoSo-AEaMQPb5b40ViSP_hcJUSu3sAw&s" 
                  alt="logo" 
                  height="45" 
                />
              </a>

              <input
                className="form-control mt-3 mt-md-0"
                style={{ maxWidth: "300px" }}
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search by title or tags"
              />
            </div>

            <hr />

            {/* Title + Event Type Filter */}
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <h2 className="m-0 mb-2">Meetup Events</h2>

              <select 
                className="form-select"
                style={{ maxWidth: "200px" }}
                value={eventType} 
                onChange={(e) => setEventType(e.target.value)}
              >
                <option value="Both">Both</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            {/* Event Cards */}
            <div className="row py-4 g-4">
              {filteredMeetups.map((ele) => (
                <div className="col-12 col-sm-6 col-md-4" key={ele._id}>
                  <Link to={`/details/${ele._id}`} className="text-decoration-none text-dark">

                    <div className="card shadow-sm">
                      <img src={ele.photoUrl} className="img-fluid rounded-top" alt="" />
                    </div>

                    <p className="mt-2 text-secondary small">
                      {shortDays[new Date(ele.startTime).getDay()]}{" "}
                      {months[new Date(ele.startTime).getMonth()]}{" "}
                      {new Date(ele.startTime).getDate()}{" "}
                      {new Date(ele.startTime).getFullYear()}{" "}
                      {new Date(ele.startTime).getHours()}:
                      {new Date(ele.startTime).getMinutes().toString().padStart(2, "0")}
                      {" "}
                      {new Date(ele.startTime).getHours() < 12 ? "AM" : "PM"} IST
                    </p>

                    <h5>{ele.title}</h5>
                  </Link>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}
