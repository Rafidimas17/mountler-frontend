import React, { Component } from "react";

import StarRating from "../elements/StartRating";
import "./review.css";
import { InputFile } from "../elements/Form";
import Button from "../elements/Button";
import Header from "../parts/Header";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      job: "",
      rate_star: null,
      experience: "",
      imageUrl: "",
      token: localStorage.getItem("token"),
    };
  }

  handleRating = (rating) => {
    this.setState({ rate_star: rating });
  };
  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleJobChange = (e) => {
    this.setState({ job: e.target.value });
  };

  handleExperienceChange = (e) => {
    this.setState({ experience: e.target.value });
  };

  handleImageChange = (e) => {
    this.setState({
      imageUrl: e.target.value,
    });
  };

  handleButtonClick = async () => {
    const { name, job, experience, imageUrl, rate_star } = this.state;
    const data = {
      id: this.props.match.params.id,
      name,
      job,
      experience,
      imageUrl,
      rate_star,
    };
    // Check the values of the data object
    try {
      const link = `${process.env.REACT_APP_HOST}/api-v1/add-review`;

      // Check the value of the link variable
      const formData = new FormData();
      formData.append("name", name);
      formData.append("position", job);
      formData.append("rate", rate_star);
      formData.append("content", experience);
      formData.append("url", this.props.match.params.id);
      formData.append("image", imageUrl[0]);
      const response = await axios.post(link, formData, {
        headers: {
          Authorization:
            "Bearer iO3quoYg265hlzq30E8RelQc0LOKle4R0yk6CMbgeHgGNcm_mR",
          "Content-Type": "multipart/form-data", // Make sure to set the Content-Type header appropriately
        },
      });
      this.showSwal(response.data.message);
      // Set the received data from the API to the ticketData state

      // Check the response data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  showSwal = (responsePayload) => {
    withReactContent(Swal)
      .fire({
        icon: "success",
        title: responsePayload,
        showConfirmButton: false,
        timer: 1500,
      })
      .then(() => {
        // Assuming responsePayload is defined somewhere
        this.props.history.push(`/}`);
      });
  };

  render() {
    const { name, job, experience, token, imageUrl } = this.state;

    return (
      <>
        <Header {...this.props} data={token} isCentered />
        <div
          className="container d-flex flex-column"
          style={{
            padding: "20px",
            borderRadius: "5px",
          }}>
          <label
            style={{ color: "#2B2A4C", fontFamily: "Poppins", fontSize: 15 }}>
            Nama
          </label>
          <input
            type="text"
            value={name}
            onChange={this.handleNameChange}
            placeholder="Nama"
            style={{
              marginBottom: "20px",
              borderRadius: 4,
              padding: 8,
              height: 30,
              color: "#2B2A4C",
              fontFamily: "Poppins",
              fontSize: 14,
              border: "1px solid #4F709C",
            }}
          />
          <label
            style={{ color: "#2B2A4C", fontFamily: "Poppins", fontSize: 15 }}>
            Pekerjaan
          </label>
          <input
            type="text"
            value={job}
            onChange={this.handleJobChange}
            placeholder="Pekerjaan"
            style={{
              marginBottom: "20px",
              borderRadius: 4,
              padding: 8,
              height: 30,
              color: "#2B2A4C",
              fontFamily: "Poppins",
              fontSize: 14,
              border: "1px solid #4F709C",
            }}
          />
          <label
            style={{ color: "#2B2A4C", fontFamily: "Poppins", fontSize: 15 }}>
            Kualitas pendakian
          </label>
          <StarRating handleRating={this.handleRating} />
          <label
            style={{ color: "#2B2A4C", fontFamily: "Poppins", fontSize: 15 }}>
            Ulasan
          </label>
          <input
            type="text"
            value={experience}
            onChange={this.handleExperienceChange}
            placeholder="Bagikan pengalamanmu tentang gunung ini untuk membantu pendaki lain"
            style={{
              marginBottom: "20px",
              borderRadius: 4,
              padding: 8,
              height: 80,
              alignItems: "start",
              color: "#2B2A4C",
              fontFamily: "Poppins",
              fontSize: 14,
              border: "1px solid #4F709C",
            }}
          />
          <label
            style={{ color: "#2B2A4C", fontFamily: "Poppins", fontSize: 15 }}>
            Tambahkan Gambar
          </label>
          <InputFile
            accept="image/*"
            id="imageUrl"
            name="imageUrl"
            value={imageUrl}
            onChange={this.handleImageChange}
          />

          <Button
            className="btn btn-primary mt-3"
            onClick={this.handleButtonClick}>
            OK
          </Button>
        </div>
      </>
    );
  }
}

export default Review;
