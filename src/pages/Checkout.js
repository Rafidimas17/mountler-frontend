import React, { Component } from "react";
import Cookies from "js-cookie";
import { Fade } from "react-awesome-reveal";
import { connect } from "react-redux";
import Header from "../parts/Header";
import { withRouter } from 'react-router-dom';
import Button from "../elements/Button";
import { Redirect } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
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
      token: Cookies.get("token"),
    },
  };
  validateMemberFields = () => {
    const { data } = this.state;
    let errors = {};

    // Add your specific validation logic here for each member field
    const isValid = data.member.every((member, index) => {
      const validFullname =
  typeof member.fullname === "string" && /^[A-Za-z\s]+$/.test(member.fullname.trim());
      const validAddress =
        member.address !== "" &&
        typeof member.address === "string" &&
        // Additional address format validation (customize as needed)
        /^[A-Za-z0-9\s,'.-]*$/.test(member.address);
      const validEmail =
        member.email !== "" &&
        typeof member.email === "string" &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email);
      const validGender =
        member.gender !== "" && typeof member.gender === "string";
      const validNoId =
        member.no_id !== "" &&
        typeof member.no_id === "string" &&
        // Additional no_id validation (minimum length: 16)
        /^[0-9]{16}$/.test(member.no_id);
      const validPhone =
        member.phone !== "" &&
        typeof member.phone === "string" &&
        // Additional phone validation (must be a number)
        /^[0-9]*$/.test(member.phone) &&
        // Additional phone validation (minimum length: 10)
        member.phone.length >= 10;

      if (
        !validFullname ||
        !validAddress ||
        !validEmail ||
        !validGender ||
        !validNoId ||
        !validPhone
      ) {
        errors[index] = {
          validFullname,
          validAddress,
          validEmail,
          validGender,
          validNoId,
          validPhone,
        };
      }

      return (
        validFullname &&
        validAddress &&
        validEmail &&
        validGender &&
        validNoId &&
        validPhone
      );
    });

    if (!isValid) {
      // Display error messages for each invalid field
      Object.keys(errors).forEach((index) => {
        const error = errors[index];
        const errorMessages = Object.keys(error)
          .filter((key) => !error[key])
          .map((key) => {
            switch (key) {
              case "validFullname":
                return parseInt(index) === 0
                  ? "Nama ketua tidak sesuai"
                  : "Nama anggota tidak sesuai";
              case "validAddress":
                return parseInt(index) === 0
                  ? "Alamat ketua tidak sesuai"
                  : "Alamat anggota tidak sesuai";
              case "validEmail":
                return parseInt(index) === 0
                  ? "Email ketua tidak sesuai"
                  : "Email anggota tidak sesuai";
              case "validGender":
                return parseInt(index) === 0
                  ? "Gender ketua tidak sesuai"
                  : "Gender anggota tidak sesuai";
              case "validNoId":
                return parseInt(index) === 0
                  ? "Nomor ID ketua harus 16 angka"
                  : "Nomor ID anggota harus 16 angka";
              case "validPhone":
                return parseInt(index) === 0
                  ? "Nomor telepon ketua tidak sesuai"
                  : "Nomor telepon anggota tidak sesuai";
              default:
                return "";
            }
          })
          .join(", ");

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Harap periksa informasi ${
            parseInt(index) === 0 ? "ketua" : `anggota ke-${parseInt(index)}`
          }: ${errorMessages}`,
        });
      });
    }

    return isValid;
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

  showSwal = (resolve, reject, nextStep) => {
    return withReactContent(Swal)
      .fire({
        icon: "success",
        title: "Pesanan berhasil dibuat",
        showConfirmButton: false,
        timer: 2000,
      })
      .then(() => {
        resolve(); // Resolusi untuk lanjut ke langkah berikutnya
        nextStep(); // Panggil nextStep setelah swal selesai
      })
      .catch((error) => {
        reject(error); // Menolak jika terjadi kesalahan
      });
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
      updatedMember.splice(index, 0);
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
    document.title = "Cakrawala | Checkout";
    window.scroll(0, 0);
    const { checkout } = this.props;
    if (checkout && checkout._id) {
      // console.log(checkout._id);
    } else {
      // console.error(
      //   "Objek checkout tidak memiliki properti _id atau objek checkout adalah null atau undefined."
      // );
    }

  }
  _Submit = (nextStep) => {
    return new Promise((resolve, reject) => {
      const { data } = this.state;
      const { checkout } = this.props;

      const jumlahSafety = data.jumlahTenda * data.jumlahKapasitas;

if (
  jumlahSafety < data.member.length 
) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Jumlah tenda tidak sesuai",
    footer: "Kapasitas tenda harus lebih besar dari jumlah anggota",
  });
}
else if (
  data.jumlahHeadlamp <= 0 ||
  data.jumlahCarrier <= 0 ||
  data.jumlahKompor <= 0 ||
  data.jumlahP3k <= 0 ||
  data.jumlahSB <= 0 ||
  data.jumlahHeadlamp <= 0 ||
  data.jumlahMatras <= 0
) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Perlengkapan utama belum sesuai",
    footer: "Wajib minimal bawa satu perlengkapan utama",
  });
}
 else if(jumlahSafety >= data.member.length &&
  data.jumlahHeadlamp >= 0 &&
  data.jumlahCarrier >= 0 &&
  data.jumlahKompor >= 0 &&
  data.jumlahP3k >= 0 &&
  data.jumlahSB >= 0 &&
  data.jumlahHeadlamp >= 0 &&
  data.jumlahMatras >= 0) {
        const tax = 10;
        const subTotal =
          checkout.price * checkout.duration * data.member.length;
        const grandTotal = (subTotal * tax) / 100 + subTotal;
        const payload = new FormData();
        payload.append("token", data.token);
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

        Promise.all([
          this.props.submitBooking(payload),
          this.showSwal(resolve, reject, nextStep),
        ])
          .then(() => {
            resolve(); // Resolusi utama setelah keduanya selesai
          })
          .catch((error) => {
            reject(error); // Menolak utama jika salah satu di antaranya gagal
          });
      }
    });
  };

  render() {
    const { data } = this.state;
    const { checkout } = this.props;   

    // console.log(data);
    if (!data.token) {
      return <Redirect to="/login" />;
    }
    // console.log(typeof data[0].member)
   
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
        title: "Perlengkapan",
        description: "Data perlengkapan utama yang dibawa pendaki ",
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
        <Header isCentered data={data.token} />
        <Stepper steps={steps} initialStep="">
          {(prevStep, nextStep, CurrentStep, steps) => (
            <>
              <Numbering data={steps} current={CurrentStep} />
              <Meta data={steps} current={CurrentStep} />
              <MainContent data={steps} current={CurrentStep} />
              {CurrentStep === "bookingInformation" && (
                <Controller>
                  {data.member.every((member) =>
                    Object.values(member).every((value) => value !== "")
                  ) && (
                    <Button
                      className="btn mb-3"
                      type="button"
                      isBlock
                      isPrimary
                      hasShadow
                      onClick={() => {
                        // Check if member fields are valid
                        const isValid = this.validateMemberFields();

                        if (isValid) {
                          nextStep(); // Proceed to the next step if valid
                        } else {
                          this.validateMemberFields(); // Trigger validation and display specific error messages
                        }
                      }}>
                      Lanjutkan
                    </Button>
                  )}
                  <Button
                    className="btn"
                    type="link"
                    isBlock
                    isLight
                    href={`/properties/${checkout._id}`}>
                    Batal
                  </Button>
                </Controller>
              )}
              {CurrentStep === "Equipment" && (
                <Fade>
                <Controller>
      {data.jumlahCarrier !== "" &&
        data.jumlahHeadlamp !== "" &&
        data.jumlahMatras !== "" &&
        data.jumlahTenda !== "" &&
        data.jumlahSB !== "" &&
        data.jumlahP3k !== "" &&
        data.jumlahKompor !== "" && (
          <Fade>
            <Button
              className="btn mb-3"
              type="button"
              isBlock
              isPrimary
              hasShadow
              onClick={() => {
                this._Submit().then(nextStep); // Menampilkan state saat tombol diklik
              }}>
              Pesan sekarang
            </Button>
          </Fade>
        )}
        <Button
        className="btn"
        type="link"
        isBlock
        isLight
        onClick={prevStep}        
      >
        Kembali
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
                      href="/menunggu-pembayaran">
                      Mulai pembayaran
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
export default withRouter(connect(mapStateToProps, { submitBooking })(Checkout));
