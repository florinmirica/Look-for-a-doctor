import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import { doctorLookup } from './doctor.js';

$(document).ready(function() {
  let newDocSearch = new doctorLookup();
  
  $('#illnessSearch').click(function() {
    $('.showDoctorSearch').hide();
    $('.showIllnessSearch').show();
    let selectedIllness = $("#illness").val();
    newDocSearch.searchByIllness(selectedIllness);
  });
  $('#doctorSearch').click(function() {
    $('.showIllnessSearch').hide();
    $('.showDoctorSearch').show();
    let docName = $('#dr-name').val();
    console.log(docName);
    newDocSearch.searchByDoctor(docName);
  });
});
