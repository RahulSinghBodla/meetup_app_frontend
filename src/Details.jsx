import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

export default function Details() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`https://meetupappbackend.vercel.app/meetups/${id}`);

  const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec"];
  const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const formatDate = (time) => {
    const d = new Date(time);
    return `${shortDays[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")} ${d.getHours() < 12 ? "AM" : "PM"}`;
  };

  return (
    <>
      {loading && <p className="m-5">Loading....</p>}
      {error && <p className="m-5">Error while loading data.</p>}

      {data && (
        <div className="bg-light">
          <div className="container py-3">

            {/* Top Bar */}
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
                placeholder="Search by title and tags"
              />
            </div>

            <hr />

            {/* MAIN CONTENT */}
            <div className="row g-4 py-4">

              {/* LEFT SECTION */}
              <div className="col-12 col-md-7">
                <h1 className="fw-semibold">{data.ourmeet.title}</h1>

                <p className="mt-2">Hosted By:</p>
                <h5 className="fw-bold">{data.ourmeet.host}</h5>

                <img
                  src={data.ourmeet.photoUrl}
                  alt=""
                  className="img-fluid rounded my-4"
                />

                <h5 className="mt-3">Details:</h5>
                <p>{data.ourmeet.description}</p>

                <h5 className="mt-3">Additional Information:</h5>
                <p><strong>Dress Code:</strong> {data.ourmeet.additionalInfo.dress}</p>
                <p><strong>Age Restrictions:</strong> {data.ourmeet.additionalInfo.age}</p>

                <h5 className="mt-3">Event Tags:</h5>
                <div className="d-flex flex-wrap gap-2">
                  {data.ourmeet.eventtags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-pill"
                      style={{
                        backgroundColor: "#f8d7da",
                        color: "#b02a37",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT SECTION */}
              <div className="col-12 col-md-5">

                {/* Event Info Card */}
                <div className="card shadow-sm mb-4">
                  <div className="card-body">
                    <p className="mb-3">
                      <i className="bi bi-clock me-1"></i>
                      {formatDate(data.ourmeet.startTime)} <br />
                      to <br />
                      {formatDate(data.ourmeet.endTime)}
                    </p>

                    <p className="mb-3">
                      <i className="bi bi-geo-alt me-1"></i>
                      {data.ourmeet.address}
                    </p>

                    <p className="fw-bold">{data.ourmeet.price}</p>
                  </div>
                </div>

                {/* Speakers */}
                <h4 className="mb-3">
                  Speakers: ({data.ourmeet.speakers.length})
                </h4>

                <div className="row g-3">
                  {data.ourmeet.speakers.map((speaker, i) => (
                    <div key={i} className="col-12 col-sm-6">
                      <div className="card shadow-sm">
                        <div className="card-body text-center">
                          <img
                            src={speaker.photo}
                            alt=""
                            className="rounded-circle mb-2"
                            width="60"
                            height="60"
                          />
                          <p className="m-0 fw-bold">{speaker.name}</p>
                          <p className="m-0 text-secondary">
                            {speaker.designation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
