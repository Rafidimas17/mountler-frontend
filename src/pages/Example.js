const { name, job, experience, imageUrl, rate_star } = this.state;
const data = {
  id: this.props.match.params.id,
  name,
  job,
  experience,
  imageUrl,
  rate_star,
};
console.log("Data:", data); // Check the values of the data object
try {
  const link = `${process.env.REACT_APP_HOST}/api-v1/add-review`;
  console.log("Link:", link); // Check the value of the link variable
  const response = await axios.post(
    link,
    {
      name: name,
      position: job,
      rate: rate_star,
      image: imageUrl,
      content: experience,
      url: this.props.match.params.id,
    },
    {
      headers: {
        Authorization:
          "Bearer iO3quoYg265hlzq30E8RelQc0LOKle4R0yk6CMbgeHgGNcm_mR",
        "Content-Type": "application/json", // Make sure to set the Content-Type header appropriately
      },
    }
  );
  // Set the received data from the API to the ticketData state
  console.log("Response:", response.data); // Check the response data
} catch (error) {
  console.error("Error fetching data:", error);
}
