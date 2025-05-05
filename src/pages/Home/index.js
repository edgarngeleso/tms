import React, { useState, useContext, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiMap,
  FiMapPin,
  FiNavigation,
  FiNavigation2,
} from "react-icons/fi";
import "./index.css";
import {
  Button,
  Dropdown,
  DropdownButton,
  NavDropdown,
  Toast,
} from "react-bootstrap";
import Testimonials from "../Testimonials";
import { useEffect } from "react";
import Blogs from "../Blogs";
import Amenities from "../Amenities";
import { HeaderFooterContext } from "../../contexts";
import Select from "react-select";
import { DataURLS } from "../../utils/DataURLS";
import { Loading, HowToUse } from "../../components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const dateRef = useRef(null);
  const [toggle, setToggle] = useState({
    pickupPoint: false,
    destinationPoint: false,
    dateShown: false,
  });

  const [points, setPoints] = useState({
    pickup: [],
    drop: [],
  });

  const [ticketInfo, setTicketInfo] = useState({
    pickupPoint: "",
    destination: "",
    date: null,
    error: false,
    message: "",
  });

  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();
  const searchTicket = () => {
    if (ticketInfo.pickupPoint == "") {
      setTicketInfo({
        ...ticketInfo,
        error: true,
        message: "Select pickup point!",
      });
      return false;
    }
    if (ticketInfo.pickupPoint == "--------select------") {
      setTicketInfo({
        ...ticketInfo,
        error: true,
        message: "Select pickup point!",
      });
      return false;
    }
    if (ticketInfo.destination == "") {
      setTicketInfo({
        ...ticketInfo,
        error: true,
        message: "Select destination point!",
      });
      return false;
    }
    if (ticketInfo.destination == "--------select------") {
      setTicketInfo({
        ...ticketInfo,
        error: true,
        message: "Select destination point!",
      });
      return false;
    }
    if (ticketInfo.date == null) {
      setTicketInfo({
        ...ticketInfo,
        error: true,
        message: "Select date of travel first!",
      });
      return false;
    }

    navigate(
      `/search/${ticketInfo.pickupPoint}/${ticketInfo.destination}/${ticketInfo.date}`
    );
  };
  const [iconsShown, setIconsShown] = useState(false);
  const [headerFooter, setHeaderFooter] = useContext(HeaderFooterContext);

  const [todayDate, setTodayDate] = useState([]);

  //day use todaysDate/yesterday use todaysDate-24hrs/month ago use todaysDate<=
  const convertToTimeStamp = (date) => {
    let d = new Date(date);
    return Date.parse(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
  };

  useEffect(() => {
    let today = new Date();

    let d = `${today.getFullYear()}-${
      parseInt(today.getMonth()) + 1
    }-${today.getDate()}`;
    setTodayDate(d);
    let todayDateTimestamp = Date.parse(d);
    let output;

    output = todayDateTimestamp;
    //console.log('Top tabs', d);
    if (dateRef.current) {
      dateRef.current.setAttribute("min", d);
    }
  }, []);

  const [locations, setLocations] = useState({
    error: false,
    loading: false,
    message: "",
    results: [],
  });
  const fetchLocations = () => {
    setLocations({
      ...locations,
      error: false,
      loading: true,
      message: "",
    });
    fetch(DataURLS.locations, {
      method: "GET",
    })
      .then((req) => req.json())
      .then((res) => {
        console.log(res);
        setLocations({
          error: false,
          loading: false,
          message: "",
          results: res,
        });
        setPoints({
          pickup: res,
          drop: res,
        });
      })
      .catch((e) => {
        console.log(e);
        setLocations({
          ...locations,
          error: true,
          loading: false,
          message: "An error occurred, try again later.",
        });
      });
  };

  const observer = useRef(null);
  const callbackRef = useCallback((node) => {
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      console.log(entries[0].isIntersecting);
    });
    if (node) {
      observer.current.observe(node);
    }

    //console.log(node);
  }, []);

  useEffect(() => {
    fetchLocations();
    setHeaderFooter(true);

    window.scroll(0, 0);
  }, []);
  return (
    <div className="home">
      {/* {
        locations.loading?
        <Loading.AppLoading/>
        : */}
      <>
        <Toast
          show={ticketInfo.error}
          onClose={() => setTicketInfo({ ...ticketInfo, error: false })}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            zIndex: 102,
            backgroundColor: "red",
          }}
        >
          <Toast.Header>Error</Toast.Header>
          <Toast.Body>{ticketInfo.message}</Toast.Body>
        </Toast>

        <div
          className="home-data"
          style={{
            backgroundImage: "url('/assets/gifs/bus.gif')",
            backgroundColor: "transparent",
            position: "relative",
          }}
        >
          <div className="bg-holder">
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
          </div>
          <div className="home-info">
            <h1 style={{ fontWeight: "bold" }}>Get Your Ticket Online,</h1>
            <h1 style={{ fontWeight: "bold" }}>Easy and Safely</h1>
            <Button
              className="buy-ticket-button"
              onClick={() => navigate("/tickets")}
            >
              Book a ticket
            </Button>
          </div>

          <div className="search-home">
            <h5>Choose your ticket</h5>
            <div className="search-card">
              <div className="search-holder">
                <div
                  style={{
                    position: "relative",
                  }}
                  className="search-item"
                >
                  <FiNavigation2
                    color="#47ca7e"
                    size={23}
                    style={{
                      display: iconsShown ? "none" : "flex",
                      position: "absolute",
                      zIndex: 10,
                      top: 13,
                      left: 5,
                    }}
                  />
                  <Select
                    options={points.pickup.length < 1
                        ? [
                            {
                              value: "loading locations...",
                              label: "loading locations...",
                            },
                          ]
                        :points.pickup.map((lo) => {
                      return { value: lo.name, label: lo.name };
                    })}
                    placeholder="Starting point"
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "100%",
                        paddingLeft: 20,
                        zIndex: 9,
                        height: 50,
                      }),
                    }}
                    onBlur={() => setIconsShown(false)}
                    onFocus={() => setIconsShown(true)}
                    onChange={(e) => {
                      let drop = locations.results.filter(
                        (l) => l.name !== e.value
                      );
                      setPoints({ ...points, drop });
                      setTicketInfo({ ...ticketInfo, pickupPoint: e.value });
                    }}
                  />
                  <div className="route">
                    <FaArrowLeft />
                    <FaArrowRight />
                  </div>
                </div>
                <div
                  style={{
                    position: "relative",
                  }}
                  className="search-item"
                >
                  <FiMapPin
                    color="#47ca7e"
                    size={23}
                    style={{
                      display: iconsShown ? "none" : "flex",
                      position: "absolute",
                      zIndex: 2,
                      top: 13,
                      left: 5,
                    }}
                  />
                  <Select
                    options={
                      points.drop.length < 1
                        ? [
                            {
                              value: "loading locations...",
                              label: "loading locations...",
                            },
                          ]
                        : points.drop.map((lo) => {
                            return { value: lo.name, label: lo.name };
                          })
                    }
                    placeholder={`Destination Point`}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "100%",
                        paddingLeft: 20,
                        zindex: 3,
                      }),
                    }}
                    onChange={(e) => {
                      let pickup = locations.results.filter(
                        (l) => l.name !== e.value
                      );
                      setPoints({ ...points, pickup });

                      setTicketInfo({ ...ticketInfo, destination: e.value });
                    }}
                    onBlur={() => setIconsShown(false)}
                    onFocus={() => setIconsShown(true)}
                  />
                </div>
              </div>

              <div
                className="search-item"
                style={{ position: "relative", width: "98%", margin: "1%" }}
              >
                <FiCalendar
                  color="#47ca7e"
                  size={23}
                  style={{
                    display: iconsShown ? "none" : "flex",
                    position: "absolute",
                    zIndex: 2,
                    top: 12,
                    left: 5,
                  }}
                />
                {/* <input
                ref={dateRef} 
                style={{
                    width:"100%",
                    height:40,
                    paddingLeft:28,
                    borderColor:"grey",
                    border:"1px solid grey",
                    borderRadius:5,
                    outline:"none"
                }}
                type={isFocused?"date":"text"}  
                placeholder='Departure date' 
                onFocus={(e)=>{
                    setIsFocused(true);
                    setIconsShown(true);
                }}
                onBlur={(e)=>{
                    setIsFocused(false);
                    setIconsShown(false);
                }}
                min={todayDate}
                onChange={(e)=>setTicketInfo({...ticketInfo,date:e.target.value})}
                />  */}

                <DatePicker
                  wrapperClassName="input"
                  showIcon
                  isClearable
                  placeholderText="Departure date"
                  icon={"fa fas calendar"}
                  minDate={Date.now()}
                  selected={ticketInfo.date}
                  onChange={(date) => {
                    console.log(date);
                    setTicketInfo({ ...ticketInfo, date: date });
                  }}
                  className="input"
                />
              </div>

              <div
                className="search-item"
                style={{ position: "relative", width: "98%", margin: "1%" }}
              >
                <FiCalendar
                  color="#47ca7e"
                  size={23}
                  style={{
                    display: iconsShown ? "none" : "flex",
                    position: "absolute",
                    zIndex: 2,
                    top: 12,
                    left: 5,
                  }}
                />

                <DatePicker
                  wrapperClassName="input"
                  showIcon
                  isClearable
                  minDate={ticketInfo.date}
                  placeholderText="Return date (Optional)"
                  icon={"fa fas calendar"}
                  selected={ticketInfo.returnDate}
                  onChange={(date) => {
                    setTicketInfo({ ...ticketInfo, returnDate: date });
                  }}
                  className="input"
                />
              </div>

              {/* <div 
                className='search-item'
                style={{position:"relative",width:"98%",margin:"1%",display:"inline-block"}} >
                <DatePicker 
                  showIcon
                  isClearable
                  placeholderText='Departure date'
                  icon={"fa fas calendar"}
                  selected={ticketInfo.date} 
                  onChange={(date)=>{
                    console.log(date);
                    setTicketInfo({...ticketInfo,date:date})
                  }}
                  className='search-item'
                  /> 

            </div> */}

              <button className="search-button" onClick={searchTicket}>
                Search ticket
              </button>
            </div>
          </div>
        </div>

        <h5 ref={callbackRef} className="title">
          Get Your Tickets With Just 3 Steps
        </h5>
        {/*<Divider/>*/}
        <div className="description">
          <p>Lorem ipsum</p>
        </div>
        <div className="cards-holder">
          <HowToUse />
        </div>

        <h5 className="title">Our Amenities</h5>
        <div className="description">
          <p>Amenities available</p>
        </div>
        {/*<Divider/>*/}
        <Amenities />
        <h5 className="title">Our Testimonials</h5>
        {/*<Divider/>*/}
        <Testimonials />
        <h5 className="title">Recent Blog Post</h5>
        <div className="description">
          <p>Our blogs</p>
        </div>
        {/*<Divider/>*/}
        <Blogs marginTop={0} isShown={false} />
      </>
    </div>
  );
};

export default Home;
