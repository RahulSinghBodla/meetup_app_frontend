import { useParams } from "react-router-dom"
import useFetch from "./useFetch"
export default function Details(){
    const {id} = useParams()
   
    const {data,loading,error} = useFetch(`https://meetupappbackend.vercel.app/meetups/${id}`)
    console.log(data)
    const months = [
    "Jan", "Feb", "March", "April", "May", "June",
    "July", "August", "Sep", "Oct", "Nov", "Dec"
    ];
    const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    
    return(
        <>
        {loading && <p className="m-5">Loading....</p>}
        {error && <p>Error while laoding data.</p>}
        {data && (
            <>
            <div className="bg-light">
            <div className="container">
                <div className="d-flex justify-content-between">
                    <a href="/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaAnUgoSo-AEaMQPb5b40ViSP_hcJUSu3sAw&s" alt="" height="50px" className="pt-4"/></a>
                    <div className="pt-4">
                        <input type="text" placeholder="Search by title and tags" />
                    </div>
                    
                </div>
                <hr />
                <div className="d-flex justify-content-between py-4">
                    <div className="d-flex flex-column col-md-6 py-4">
                        <p className="fs-1 fw-semibold">{data.ourmeet.title}</p>
                        <p>Hosted By:</p>
                        <h5 className="fw-bold">{data.ourmeet.host}</h5><br /><br />
                        <img src={data.ourmeet.photoUrl} alt="" width="600px"/><br /><br />
                        <h5 className="mb-1">Details: </h5>
                        <p className="mb-1">{data.ourmeet.description}</p>
                        <h5 >Additional Information: </h5>
                        <span><strong>Dress Code:</strong>{data.ourmeet.additionalInfo.dress}</span>
                        <span><strong>Age Restrictions:</strong>{data.ourmeet.additionalInfo.age}</span><br />
                        <h5>Event Tags:</h5>
                        <div className="d-flex flex-wrap gap-2">
                        <div className="d-flex flex-wrap gap-2">
                            {data.ourmeet.eventtags.map((tag, index) => (
                                <span key={index} style={{
                                backgroundColor: "#f8d7da",
                                color: "#b02a37",
                                padding: "4px 12px",
                                borderRadius: "20px",
                                fontSize: "0.85rem",
                                fontWeight: 500,
                                display: "inline-block",
                                }}>
                                {tag}</span>
                            ))}
                        </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-text">
                                    <p><i className="bi bi-clock me-1"></i> {shortDays[new Date(data.ourmeet.startTime).getDay()]} {months[new Date(data.ourmeet.startTime).getMonth()]} {new Date(data.ourmeet.startTime).getDate()} {new Date(data.ourmeet.startTime).getFullYear()} {new Date(data.ourmeet.startTime).getHours()}:{new Date(data.ourmeet.startTime).getMinutes()}:{new Date(data.ourmeet.startTime).getSeconds()} {new Date(data.ourmeet.startTime).getHours()<12 ? "AM" : "PM"} to <br/>{shortDays[new Date(data.ourmeet.endTime).getDay()]} {months[new Date(data.ourmeet.endTime).getMonth()]} {new Date(data.ourmeet.endTime).getDate()} {new Date(data.ourmeet.endTime).getFullYear()} {new Date(data.ourmeet.endTime).getHours()}:{new Date(data.ourmeet.endTime).getMinutes()}:{new Date(data.ourmeet.endTime).getSeconds()} {new Date(data.ourmeet.endTime).getHours()<12 ? "AM" : "PM"}</p>
                                    <br />
                                    <p><i className="bi bi-geo-alt"></i>{data.ourmeet.address}</p>
                                    <br />
                                    <p>{data.ourmeet.price}</p>
                                </div>
                            </div>
                        </div>
                        <div className="py-5">
                            <h4>Speakers: ({data.ourmeet.speakers.length})</h4>
                            <div className="d-flex justify-content-around">
                            {data.ourmeet.speakers.map((speaker)=>(
                                <>
                                <div className="col-md-5">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-text d-flex flex-column col-md-8 align-items-center">
                                            <img src={speaker.photo} alt="" className="rounded-circle" width="40" height="40"/>
                                            <p className="m-0"><strong>{speaker.name}</strong></p>
                                            <p className="m-0">{speaker.designation}</p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                </>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </>
        )}
        </>
    )
}