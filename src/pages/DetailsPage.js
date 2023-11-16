import Header from "../parts/Header";
import { connect } from "react-redux";
import React, { Component } from "react";
import Button from "../elements/Button";
import PageDetailTitle from "../parts/PageDetailTitle";
import FeaturedImage from "../parts/FeaturedImage";
import PageDetailDescription from "../parts/PageDetailDescription";
import Weather from "../parts/weather";
import Footer from "../parts/Footer";
import { Redirect } from "react-router-dom";
import BookingForm from "../parts/BookingForm";
import Activities from "../parts/Activites";
import Testimony from "../parts/Testimony";
import { checkoutBooking } from "../store/actions/Checkout";
import { fetchPage } from "../store/actions/page";
// import { fetchPage } from "./store/actions/page";
class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
    };
  }
  componentDidMount() {
    window.title = "Details Page";
    window.scrollTo(0, 0);
    if (!this.props.page[this.props.match.params.id])
      this.props
        .fetchPage(
          `${process.env.REACT_APP_HOST}/api-v1/detail-page/${this.props.match.params.id}`,
          this.props.match.params.id
        )
        .then((response) => {
          // console.log(response.message)
        });
  }
  render() {
    const { page, match } = this.props;
    const { token } = this.state;
    if (!token) {
      return <Redirect to="/login" />;
    }
    // console.log(this.props.page)
    if (!page[match.params.id]) {
      return (
        <div className="container">
          <div
            className="row align-items-center justify-content-center text-center"
            style={{ height: "100vh" }}>
            <div className="col-3">
              <div className="spinner-grow text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div>
                <Button className="btn mt-5" type="button" isLight>
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    const breadcrumb = [
      { pageTitle: "Home", pageHref: "" },
      { pageTitle: "Mountain Details", pageHref: "" },
    ];
    return (
      <>
        {/* <Payment someProp={propValue} /> */}
        <Header {...this.props} data={token}></Header>
        <PageDetailTitle breadcrumb={breadcrumb} data={page[match.params.id]} />
        <Weather data={page[match.params.id].currentWeather} />
        <FeaturedImage data={page[match.params.id].imageId} />
        <section className="container">
          <div className="row">
            <div className="col-lg-7 col-sm-12 pr-5">
              <PageDetailDescription data={page[match.params.id]} />
            </div>
            <div className="col-lg-5 col-sm-12">
              <BookingForm
                itemDetails={page[match.params.id]}
                startBooking={this.props.checkoutBooking}
              />
            </div>
          </div>
        </section>
        <Activities data={page[match.params.id].activityId} />
        <Testimony data={page[match.params.id].testimonial} />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.page,
});

export default connect(mapStateToProps, { checkoutBooking, fetchPage })(
  DetailsPage
);
