import React, { Component } from "react";
import { Fade } from "react-awesome-reveal";
import { connect } from "react-redux";
import Header from "../parts/Header";
import Button from "../elements/Button";
import { Redirect } from "react-router-dom";
import Stepper, {
  Numbering,
  Meta,
  MainContent,
  Controller,
} from "../elements/Stepper";

import BookingInformation from "../parts/Checkout/BookingInformation";
import Equipment from "../parts/Checkout/Equipment";
import Completed from "../parts/Checkout/Completed";

import ItemDetails from "../json/bookingInformation.json";

import { submitBooking } from "../store/actions/Checkout";

class Checkout extends Component {
  state = {
    data: {
      member: [
        {
          fullname: "",
          address: "",
          email: "",
          gender: "",
          no_id: "",
          phone: "",
        },
      ],
      jumlahTenda: "",
      jumlahKompor: "",
      jumlahCarrier: "",
      jumlahKapasitas: "",
      jumlahMatras: "",
      jumlahSB: "",
      jumlahHeadlamp: "",
      jumlahP3k: "",
      token: localStorage.getItem("token"),
    },
  };

  onChange = (event, index) => {
    const { name, value } = event.target;
    const { data } = this.state;

    if (index !== undefined) {
      const newMembers = [...data.member];
      newMembers[index] = {
        ...newMembers[index],
        [name]: value,
      };
      this.setState((prevState) => ({
        data: {
          ...prevState.data,
          member: newMembers,
        },
      }));
    } else {
      this.setState((prevState) => ({
        data: {
          ...prevState.data,
          [name]: value,
        },
      }));
    }
  };

  handleAddRow = () => {
    this.setState((prevState) => {
      const newMember = {
        fullname: "",
        address: "",
        email: "",
        gender: "",
        no_id: "",
        phone: "",
      };

      const newData = {
        ...prevState.data,
        member: [...prevState.data.member, newMember],
      };

      return { data: newData };
    });
  };

  handleRemoveRow = (index) => {
    this.setState((prevState) => {
      const updatedMember = [...prevState.data.member];
      updatedMember.splice(index, 1);
      const newData = {
        ...prevState.data,
        member: updatedMember,
      };
      return {
        data: newData,
      };
    });
  };

  componentDidMount() {
    window.scroll(0, 0);
  }
  _Submit = (nextStep) => {
    const { data } = this.state;
    const { checkout } = this.props;
    const tax = 10;
    const subTotal = checkout.price * checkout.duration * data.member.length;
    const grandTotal = (subTotal * tax) / 100 + subTotal;
    const payload = new FormData();
    payload.append("idItem", checkout._id);
    payload.append("duration", checkout.duration);
    payload.append("startDateBooking", checkout.date.startDate);
    payload.append("endDateBooking", checkout.date.endDate);
    payload.append("total", grandTotal);

    data.member.forEach((member_data, index) => {
      const memberPrefix = `members[${index}]`;
      payload.append(`${memberPrefix}[nameMember]`, member_data.fullname);
      payload.append(`${memberPrefix}[addressMember]`, member_data.address);
      payload.append(`${memberPrefix}[noIdMember]`, member_data.no_id);
      payload.append(`${memberPrefix}[phoneMember]`, member_data.phone);
      payload.append(`${memberPrefix}[emailMember]`, member_data.email);
      payload.append(`${memberPrefix}[genderMember]`, member_data.gender);
    });
    payload.append("equipments[0][jumlahSleepingBag]", data.jumlahSB);
    payload.append("equipments[0][jumlahTenda]", data.jumlahTenda);
    payload.append("equipments[0][jumlahKompor]", data.jumlahKompor);
    payload.append("equipments[0][jumlahMatras]", data.jumlahMatras);
    payload.append("equipments[0][jumlahP3k]", data.jumlahP3k);
    payload.append("equipments[0][jumlahCarrier]", data.jumlahCarrier);
    payload.append("equipments[0][jumlahHeadlamp]", data.jumlahHeadlamp);

    this.props.submitBooking(payload).then(() => {
      nextStep();
    });
  };
  render() {
    const { data } = this.state;
    const { checkout } = this.props;

    console.log(data);
    if (!data.token) {
      return <Redirect to="/login" />;
    }
    // console.log(typeof data[0].member)
    if (!checkout)
      return (
        <div className="container">
          <div
            className="row align-items-center justify-content-center text-center"
            style={{ height: "100vh" }}>
            <div className="col-3">
              Pilih tanggal dulu
              <div>
                <Button
                  className="btn mt-5"
                  type="button"
                  onClick={() => this.props.history.goBack()}
                  isLight>
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      );

    const steps = {
      bookingInformation: {
        title: null,
        description: null,
        content: (
          <BookingInformation
            data={data}
            checkout={checkout}
            ItemDetails={ItemDetails}
            onChange={this.onChange}
            handleAddRow={this.handleAddRow}
            handleRemoveRow={this.handleRemoveRow}
          />
        ),
      },
      Equipment: {
        title: "Equipment",
        description: "Add your equipment for enjoy hiking!",
        content: (
          <Equipment
            data={data}
            checkout={checkout}
            ItemDetails={ItemDetails}
            onChange={this.onChange}
          />
        ),
      },
      completed: {
        title: "Yeay! Completed",
        description: "",
        content: <Completed />,
      },
    };
    return (
      <>
        <Header {...this.props} data={data.token} />
        <Stepper steps={steps} initialStep="">
          {(prevStep, nextStep, CurrentStep, steps) => (
            <>
              <Numbering data={steps} current={CurrentStep} />
              <Meta data={steps} current={CurrentStep} />
              <MainContent data={steps} current={CurrentStep} />
              {CurrentStep === "bookingInformation" && (
                <Controller>
                  <Fade>
                    <div className="row">
                      <div className="col d-flex justify-content-center">
                        <Button
                          className="btn mb-3"
                          type="button"
                          isBlock
                          isPrimary
                          hasShadow
                          onClick={nextStep}>
                          Continue to Book
                        </Button>
                      </div>
                    </div>
                  </Fade>
                  <Button
                    className="btn"
                    type="link"
                    isBlock
                    isLight
                    href={`/properties/${checkout._id}`}>
                    Cancel
                  </Button>
                </Controller>
              )}
              {CurrentStep === "Equipment" && (
                <Fade>
                  <Controller>
                    {data.proofEquipment !== "" &&
                      data.bankName !== "" &&
                      data.bankHolder !== "" && (
                        <Fade>
                          <Button
                            className="btn mb-3"
                            type="button"
                            isBlock
                            isPrimary
                            hasShadow
                            onClick={() => {
                              console.log(this.state.data); // Menampilkan state saat tombol diklik
                              this._Submit(nextStep); // Lanjutkan ke langkah berikutnya
                            }}>
                            Continue to Book
                          </Button>
                        </Fade>
                      )}
                    <Button
                      className="btn"
                      type="link"
                      isBlock
                      isLight
                      href={`/properties/${checkout._id}`}>
                      Cancel
                    </Button>
                  </Controller>
                </Fade>
              )}
              {CurrentStep === "completed" && (
                <Fade>
                  <Controller>
                    <Button
                      className="btn"
                      type="link"
                      isBlock
                      isPrimary
                      hasShadow
                      href="">
                      Back to Home
                    </Button>
                  </Controller>
                </Fade>
              )}
            </>
          )}
        </Stepper>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  checkout: state.checkout,
});
export default connect(mapStateToProps, { submitBooking })(Checkout);
