import React, { useContext, useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import "./index.css";
import {
  Button,
  Dropdown,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Modal,
  Toast,
} from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { FiCalendar, FiMap, FiMapPin, FiNavigation2 } from "react-icons/fi";
import Select from "react-select";
import { DataURLS } from "../../utils/DataURLS";
import Lottie from "lottie-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import { BottomSheet } from "../../components";
import { HeaderFooterContext } from "../../contexts";

let enumValues = ["AC", "Delux", "Normal", "Suspense AC", "Suspense Delux"];
let seatsValues = [11, 16, 29, 52, 67, 72];
const Search = () => {
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [searchResults, setSearchResults] = useState({
    data: [],
    loading: false,
    error: false,
    message: "",
  });

  const [headerFooter, setHeaderFooter] = useContext(HeaderFooterContext);

  const [buses, setBuses] = useState({
    error: false,
    loading: false,
    message: "",
    results: [],
  });

  const [isFocused, setIsFocused] = useState(false);
  const [iconsShown, setIconsShown] = useState(false);

  const [toggle, setToggle] = useState({
    pickupPoint: false,
    destinationPoint: false,
    dateShown: false,
  });
  const [ticketInfo, setTicketInfo] = useState({
    pickupPoint: params?.pickupPoint,
    destination: params?.destinationPoint,
    date: params?.date ? Date.parse(params?.date) : Date.now(),
    error: false,
    message: "",
  });

  const [bottomSheetHeight, setBottomSheetHeight] = useState(50);

  const navigate = useNavigate();

  const fetchBuses = () => {
    setBuses({
      ...buses,
      error: false,
      loading: true,
      message: "",
    });
    fetch(DataURLS.buses, {
      method: "GET",
    })
      .then((req) => req.json())
      .then((res) => {
        console.log(res);
        setBuses({
          error: false,
          loading: false,
          message: "",
          results: res,
        });
      })
      .catch((e) => {
        console.log(e);
        setBuses({
          ...buses,
          error: true,
          loading: false,
          message: "An error occurred, try again later.",
        });
      });
  };
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

  const [filter, setFilter] = useState({
    name: null,
    type: null,
    price: 100,
    seats: null,
  });

  const fetchByFilter = () => {
    setBuses({
      ...buses,
      error: false,
      loading: true,
      message: "",
    });
    fetch(DataURLS.filter, {
      method: "POST",
      body: JSON.stringify(filter),
    })
      .then((req) => req.json())
      .then((res) => {
        console.log(res);
        setBuses({
          error: false,
          loading: false,
          message: "",
          results: res?.error || res.length < 1 ? buses.results : res,
        });
      })
      .catch((e) => {
        console.log(e);
        setBuses({
          ...buses,
          error: true,
          loading: false,
          message: "An error occurred, try again later.",
        });
      });
  };

  useEffect(() => {
    setHeaderFooter(true);
    window.scroll(0, 0);
    fetchLocations();
  }, []);

  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    if (
      filter.name !== null ||
      filter.price !== 100 ||
      filter.seats !== null ||
      filter.type !== null
    ) {
      fetchByFilter();
    }
  }, [ticketInfo, filter]);

  useEffect(() => {
    fetchBuses();
  }, []);
  return (
    <div
      className="search"
      style={{
        marginTop: 55,
        position: "relative",
      }}
    >
      <Toast
        show={toastOpen}
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          zIndex: 102,
          backgroundColor: "red",
        }}
      >
        <Toast.Body>
          <p style={{ color: "#ffffff" }}>
            Please select a pickup point, destination point and travel date.
          </p>
        </Toast.Body>
      </Toast>
      <div
        className="select-pickup-and-dropping-station"
        style={{
          width: "100%",
        }}
      >
        <img
          src="/assets/images/bus1.jpg"
          style={{
            width: "100%",
            height: 250,
            objectFit: "cover",
          }}
        />
        <div className="select-booking">
          <div
            style={{
              position: "relative",
            }}
            className="search-item"
          >
            <FiNavigation2
              color="#47ca7e"
              size={25}
              style={{
                display: iconsShown ? "none" : "flex",
                position: "absolute",
                zIndex: 100,
                top: 12,
              }}
            />
            <Select
              options={locations.results.length < 1
                ? [
                    {
                      value: "loading locations...",
                      label: "loading locations...",
                    },
                  ]
                :locations.results.map((lo) => {
                return { value: lo.name, label: lo.name };
              })}
              placeholder={ticketInfo.pickupPoint ?? "Starting point"}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  width: "100%",
                  paddingLeft: 15,
                  height: 50,
                }),
              }}
              onChange={(e) => {
                setTicketInfo({ ...ticketInfo, pickupPoint: e.value });
                setIconsShown(false);
              }}
              onBlur={() => setIconsShown(false)}
              onFocus={() => setIconsShown(true)}
            />
          </div>

          <div
            style={{
              position: "relative",
            }}
            className="search-item"
          >
            <FiMapPin
              color="#47ca7e"
              size={25}
              style={{
                display: iconsShown ? "none" : "flex",
                position: "absolute",
                zIndex: 100,
                top: 12,
              }}
            />
            <Select
              options={locations.results.length < 1
                ? [
                    {
                      value: "loading locations...",
                      label: "loading locations...",
                    },
                  ]
                  :locations.results.map((lo) => {
                return { value: lo.name, label: lo.name };
              })}
              placeholder={ticketInfo.destination ?? "Destination Point"}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  width: "100%",
                  paddingLeft: 15,
                  height: 50,
                }),
              }}
              onChange={(e) => {
                setTicketInfo({ ...ticketInfo, destination: e.value });
                setIconsShown(false);
              }}
              onBlur={() => setIconsShown(false)}
              onFocus={() => setIconsShown(true)}
            />
          </div>
          <div className="search-item" style={{ position: "relative" }}>
            <FiCalendar
              color="#47ca7e"
              size={25}
              style={{
                display: iconsShown ? "none" : "flex",
                position: "absolute",
                zIndex: 100,
                top: 12,
                left: 3,
              }}
            />

            <DatePicker
              showIcon
              isClearable
              wrapperClassName="input"
              placeholderText="Departure date"
              icon={"fa fas calendar"}
              selected={ticketInfo.date}
              onChange={(date) => {
                console.log(date);
                setTicketInfo({ ...ticketInfo, date: date });
              }}
              className="input"
            />
          </div>
          <Button className="buy-ticket-button" onClick={() => {}}>
            Buy a ticket
          </Button>
        </div>
      </div>

      <Modal
        show={modalOpen}
        onBackdropClick={() => setModalOpen(false)}
        onHide={() => setModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select seat(s)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>seat 1</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalOpen(false)} variant="success">
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="holder">
        <div className="filters filters-big">
          <div className="filters-header">
            <label>Filter</label>
            <label
              onClick={(e) => {
                setFilter({
                  name: "",
                  price: 100,
                  type: "",
                  seats: 0,
                });
              }}
            >
              Reset all
            </label>
          </div>

          <div className="filter-holder">
            <label className="filter-title">Vehicle type</label>
            {enumValues.map((val, index) => {
              return (
                <div
                  key={index}
                  className="type"
                  onClick={(e) => setFilter({ ...filter, type: val })}
                >
                  <FormCheck checked={filter.type == val ? true : false} />{" "}
                  {val}
                </div>
              );
            })}
          </div>
          <div className="filter-holder">
            <label className="filter-title">Price</label>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label>{filter.price}</label>
              <input
                onChange={(e) => {
                  setFilter({ ...filter, price: e.target.value });
                  console.log(e.target.value);
                }}
                type="range"
                value={filter.price}
                min={100}
                max={5000}
              />
              <label>5000</label>
            </div>
          </div>
          <div className="filter-holder">
            <label className="filter-title">Seats</label>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              {seatsValues.map((seat, index) => {
                return (
                  <Button
                    onClick={(e) => setFilter({ ...filter, seats: seat })}
                    className="seat"
                    style={{
                      width: 40,
                      height: 40,
                      fontWeight: 500,
                      fontSize: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    variant={filter.seats == seat ? "primary" : "success"}
                  >
                    {seat}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="search-results">
          {buses.error ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {buses.message}

              <Button variant="success" onClick={fetchBuses}>
                Retry...
              </Button>
            </div>
          ) : buses.loading ? (
            <div className="select-seat-vehicle">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#ffffff",
                }}
              >
                <div
                  style={{
                    width: 300,
                    height: 300,
                  }}
                >
                  <Lottie
                    size={100}
                    loop
                    animationData={require("../../assets/lottie_animations/progress1.json")}
                  />
                </div>
              </div>
            </div>
          ) : buses.results.length < 1 ? (
            <div>No buses found</div>
          ) : (
            buses.results.map((item, index) => {
              return (
                <div key={index} className="search-result">
                  <img
                    src={item?.image ?? "/assets/images/bus.jpg"}
                    alt={`${item.name} logo`}
                    className="search-result-image"
                  />
                  <div className="search-result-info">
                    <h4>{item.name}</h4>
                    <label>
                      {item.boardingPoints.toString()}
                      {item.droppingPoints.toString()}
                    </label>
                    <p>
                      {
                        item?.features.map((f,index)=>{
                          return <label style={{color:"green",fontSize:16}} key={index}>{f}</label>
                        })
                      }
                    </p>
                    <label>Ksh.{item.fare}</label>
                    <label>{item.journeyDate}</label>
                  </div>
                  <Button
                    variant="success"
                    onClick={() => {
                      if (
                        !ticketInfo.pickupPoint &&
                        !ticketInfo.destination &&
                        !ticketInfo.date
                      ) {
                        setToastOpen(true);

                        setTimeout(() => {
                          setToastOpen(false);
                        }, 5000);
                      } else {
                        setToastOpen(false);
                        navigate(
                          `/select-seat/${item.slug}/${ticketInfo.pickupPoint}/${ticketInfo.destination}/${ticketInfo.date}`
                        );
                      }
                    }}
                  >
                    Select seat(s)
                  </Button>
                </div>
              );
            })
          )}
        </div>
      </div>

      <BottomSheet heading={"Filters"}>
        <div className="filters">
          <div className="filters-header">
            <label></label>
            <label
              onClick={(e) => {
                setFilter({
                  name: "",
                  price: 100,
                  type: "",
                  seats: 0,
                });
              }}
            >
              Reset all
            </label>
          </div>

          <div className="filter-holder">
            <label className="filter-title">Vehicle type</label>
            {enumValues.map((val, index) => {
              return (
                <div
                  key={index}
                  className="type"
                  onClick={(e) => {
                    setFilter({ ...filter, type: val });
                  }}
                >
                  <FormCheck checked={filter.type == val ? true : false} />{" "}
                  {val}
                </div>
              );
            })}
          </div>
          <div className="filter-holder">
            <label className="filter-title">Price</label>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label>{filter.price}</label>
              <input
                onChange={(e) => {
                  setFilter({ ...filter, price: e.target.value });
                  console.log(e.target.value);
                }}
                type="range"
                value={filter.price}
                min={100}
                max={5000}
              />
              <label>5000</label>
            </div>
          </div>
          <div className="filter-holder">
            <label className="filter-title">Seats</label>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              {seatsValues.map((seat, index) => {
                return (
                  <Button
                    onClick={(e) => setFilter({ ...filter, seats: seat })}
                    className="seat"
                    style={{
                      width: 40,
                      height: 40,
                      fontWeight: 500,
                      fontSize: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    variant={filter.seats == seat ? "primary" : "success"}
                  >
                    {seat}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default Search;
