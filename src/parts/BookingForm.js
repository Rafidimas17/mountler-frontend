import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import propTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "../elements/Button";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import { InputDate, InputNumber } from "../elements/Form";

class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        duration: null,
        track: null,
        nameMountain: "",
        date: {
          startDate: null,
          endDate: null,
        },
      },
      trackFilled: null,
    };
  }

  handleDatePickerChange = (selectedDates) => {
    // Add one day to both startDate and endDate
    const startDateWithOneDay =
      selectedDates.startDate && new Date(selectedDates.startDate);
    const endDateWithOneDay =
      selectedDates.endDate && new Date(selectedDates.endDate);

    if (startDateWithOneDay) {
      startDateWithOneDay.setDate(startDateWithOneDay.getDate() + 1);
    }

    if (endDateWithOneDay) {
      endDateWithOneDay.setDate(endDateWithOneDay.getDate() + 1);
    }

    // Calculate the duration in days
    const duration =
      startDateWithOneDay && endDateWithOneDay
        ? Math.ceil(
            (endDateWithOneDay - startDateWithOneDay) / (1000 * 60 * 60 * 24)
          )
        : null;

    // Set the selected dates and duration in the component state
    this.setState({
      data: {
        ...this.state.data,
        date: {
          startDate: startDateWithOneDay,
          endDate: endDateWithOneDay,
        },
        duration: duration + 1,
      },
    });
  };

  updateData = (e) => {
    const { name, value } = e.target;

    // If the user selects "--Pilih Track--", reset trackFilled to false
    if (name === "track" && value === null) {
      this.setState({
        trackFilled: false,
      });
    } else {
      this.setState((prevState) => ({
        data: {
          ...prevState.data,
          [name]: value,
        },
        trackFilled: name === "track" ? value !== null : prevState.trackFilled,
      }));
    }
  };

  startBooking = () => {
    const { data, trackFilled } = this.state;

    
    if (trackFilled === null || trackFilled === false) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wajib memilih jalur pendakian",
      });
      return;
    }
    
    else {
      // Proceed to checkout
      this.props.startBooking({
        _id: this.props.itemDetails._id,
        name: this.props.itemDetails.title,
        duration: data.duration,
        price: this.props.itemDetails.price,
        track: data.track,
        nameMountain: data.name,
        bankId: this.props.itemDetails.bankId,
        date: {
          startDate: data.date.startDate,
          endDate: data.date.endDate,
        },
      });

      this.props.history.push("/checkout");
    }
  };

  render() {
    const { data, trackFilled } = this.state;
    const { itemDetails } = this.props;

    return (
      <div className="card bordered" style={{ padding: "20px 40px" }}>
        <h4 className="mb-3">Jadwalkan sekarang</h4>
        <h5 className="h2 mb-4" style={{ color: "#6ECCAF" }}>
          Rp{itemDetails.price}{" "}
          <span className="text-gray-500 font-weight-light">per hari</span>
        </h5>
        <label htmlFor="date" style={{ fontFamily: "Poppins" }}>
          Pilih tanggal
        </label>
        <InputDate onDateChange={this.handleDatePickerChange} />
        <label htmlFor="date" style={{ fontFamily: "Poppins" }}>
          Pilih Jalur Pendakian
        </label>
        <Form.Select
          className="select"
          name="track"
          onChange={this.updateData}
          value={data.track}
          required>
          <option value="" disabled selected>
            --Pilih track--
          </option>
          {itemDetails.trackId.map((street, index) => (
            <option key={`street-Rp{index}`} value={street.name}>
              {street.name}
            </option>
          ))}
        </Form.Select>

        {/* Display error message if Form.Select is not filled */}
        {trackFilled === false && (
          <div
            style={{
              color: "red",
              marginTop: "5px",
              fontFamily: "Poppins",
            }}>
            Track wajib diisi.
          </div>
        )}

        <h6
          className="text-gray-700 mt-3"
          style={{
            marginBottom: 30,
            fontWeight: 370,
            fontFamily: "Poppins",
          }}>
          Total harga{" "}
          <span className="text-gray-900" style={{ fontWeight: 600 }}>
            Rp{itemDetails.price * data.duration}
          </span>{" "}
          per{" "}
          <span className="text-gray-900" style={{ fontWeight: 600 }}>
            {data.duration} hari
          </span>
        </h6>

        <Button
          className="btn mb-3"
          hasShadow
          isPrimary
          isBlock
          onClick={this.startBooking}>
          Pesan
        </Button>
      </div>
    );
  }
}

BookingForm.propTypes = {
  itemDetails: propTypes.object,
  startBooking: propTypes.func,
};

export default withRouter(BookingForm);
