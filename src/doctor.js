import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

export class doctorLookup {
  constructor() {
  }

  searchByIllness(illness) {
    $.get(`https://api.betterdoctor.com/2016-03-01/doctors?user_key=${process.env.exports.apiKey}&location=47.6062,-122.3321,25&query=${illness}`).then(function(response) {
      if (response.data.length === 0) {
        $('.showIllnessSearch').html(`<h3>We're sorry. We couldn't find any doctors in your area that can help with ${illness}.`);
      } else {
        $('.showIllnessSearch').empty();
        for (let i=0 ; i<response.data.length; i++ ) {
          let firstName = response.data[i].profile.first_name;
          let lastName = response.data[i].profile.last_name;
          let bio = response.data[i].profile.bio;
          if (bio === undefined || bio === "") {
            bio = "not available for this doctor";
          }
          let phone = response.data[i].practices[0].phones[0].number;
          $('.showIllnessSearch').append(`<div class="card"><h3 class="card-title">Name: ${firstName} ${lastName}</h3><h6>Phone: ${phone}</h6><h6>Bio: ${bio}</h6>`);
          }
        }
    }).fail(function(error) {
      $('.showIllnessSearch').text(`There was an error processing your request: ${error.message}. Please try again.`);
    });
  }
  searchByDoctor(doctor) {
    $.get(`https://api.betterdoctor.com/2016-03-01/doctors?user_key=${process.env.exports.apiKey}&location=47.6062,-122.3321,25&name=${doctor}`).then(function(response) {
      if (response.data.length === 0) {
        $('.showDoctorSearch').html(`<h3>We're sorry. We couldn't find any doctors in your area with a name that contains "${doctor}".`);
      } else {
        $('.showDoctorSearch').empty();
        for (let i=0 ; i<response.data.length; i++ ) {
          let firstName = response.data[i].profile.first_name;
          let lastName = response.data[i].profile.last_name;
          let phone = response.data[i].practices[0].phones[0].number;
          let address = (response.data[i].practices[0].visit_address.street) + ", " + (response.data[i].practices[0].visit_address.city) + ", " + (response.data[i].practices[0].visit_address.state) + ", " + (response.data[i].practices[0].visit_address.zip);
          let website = response.data[i].practices[0].website;
          if (website === undefined) {
            website = "not available for this doctor";
          }
          let acceptingPatients = response.data[i].practices[0].accepts_new_patients;
          $('.showDoctorSearch').append(`<div class="card"><h3 class="card-title">Name: ${firstName} ${lastName}</h3><h6>Phone: ${phone}</h6><h6><h6>Address:  ${address}</h6><h6>Website: ${website}</h6><h6>Accepting patients: ${acceptingPatients}</h6>`);
        }
      }
    }).fail(function(error) {
      console.log(error);
      console.log(error.meta);
      $('.showDoctorSearch').text(`There was an error processing your request: ${error.message}. Please try again.`);
    });
  }
}
