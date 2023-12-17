import React, { Component } from "react";
import Cookies from "js-cookie";
import Header from "../parts/Header";
import Hero from "../parts/Hero";
import MostPicked from "../parts/MostPicked";
import WhatsAppButton from "../elements/WaButton";
import Categories from "../parts/Categories";
import Footer from "../parts/Footer";
import { Redirect } from "react-router-dom";
import ScrollToTopButton from "../elements/ScrollTop";
import { connect } from "react-redux";
import AnimatedLines from "../elements/Loading/Loading";
import { fetchPage } from "../store/actions/page";
class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: Cookies.get("token"),
    };
    this.refMostPicked = React.createRef();
  }

  componentDidMount() {
    document.title = "Cakrawala | Beranda";
    window.scrollTo(0, 0);

    if (!this.props.page.landingPage)
      this.props.fetchPage(
        `${process.env.REACT_APP_HOST}/api-v1/landing-page`,
        "landingPage"
      );
  }
  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  render() {
    const { page } = this.props;
    const { token } = this.state;
    if (!token) {
      return <Redirect to="/login" />;
    }

    if (!page.hasOwnProperty("landingPage"))
      return (
        <div className="container">
          <AnimatedLines />
        </div>
      );

    return (
      <>
        <Header {...this.props} data={token}></Header>
        <Hero refMostPicked={this.refMostPicked} data={page.landingPage.hero} />
        <MostPicked
          refMostPicked={this.refMostPicked}
          data={page.landingPage.mostPicked}
        />
        <Categories data={page.landingPage.category} />
        <Footer />
        <WhatsAppButton />
        <ScrollToTopButton />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.page,
});

export default connect(mapStateToProps, { fetchPage })(LandingPage);
