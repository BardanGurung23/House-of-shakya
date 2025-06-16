"use client";
import React from "react";
import "./events.scss";
import "../../styles/layout.scss";
import { IMAGE_BASE_URL, PUBLIC_BACKEND_URL } from "../../../constants";
import Image from "next/image";

interface EventItem {
  eventName: string;
  description: string;
  event_attachments: { attachment: { path: string } };
}

async function getData(): Promise<{ data: { event: EventItem[] } }> {
  const data = await fetch(`${PUBLIC_BACKEND_URL}event`, { cache: "no-store" });
  if (data.ok) {
    return data.json();
  } else {
    return { data: { event: [] } };
  }
}

const Events: React.FC = () => {
  const [events, setEvents] = React.useState<EventItem[]>([]);
  React.useEffect(() => {
    const fetchEvents = async () => {
      const res = await getData();
      setEvents(res.data.event);
    };
    fetchEvents();
  }, []);

  return (
    <>
      <div className="event-main">Events</div>
      <div className="container desktop-view">
        <div className="row">
          {events.map((each, index) => (
            <div key={index} className="col-lg-6 col-md-6 event-section mb-5">
              <div className="events-section ">
                <div className="events-frame py-2 box-shadow">
                  <Image
                    src={`${IMAGE_BASE_URL}${each.event_attachments[0]?.attachment?.path}`}
                    alt="Image"
                    height={500}
                    width={500}
                    className="event-image"
                  />
                  <div className="event-text">{each.eventName}</div>
                  <div className="event-description line-clamp-1">
                    {each.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* for small screen */}
      <div
        id="carouselExampleControls"
        className="carousel slide mobile-view"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {events.map((each, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="events-section">
                <div className="events-frame box-shadow">
                  <Image
                    src={`${IMAGE_BASE_URL}${each.event_attachments[0]?.attachment?.path}`}
                    alt="Image"
                    height={500}
                    width={500}
                    className="event-image"
                  />

                  <div className="event-text">{each.eventName}</div>
                  <div className="event-description line-clamp-1">
                    {each.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon previous"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon next"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Events;
