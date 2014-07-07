/* By: Eddie Ferrer
*  @package Random User Form auto-completion tool
*  @copyright 2014 Eddie Ferrer (http://eferrer.info)
*  @license MIT

*  Forked From: 
*  @package Form auto-completion tool
*  @copyright 2012 Dmitry Sheiko (http://dsheiko.com)
*  @license MIT
*/
(function( window ) {
    "use strict";
    var data;

    var document = window.document;
    //Default values in case API call fails. 
    var fieldValueMap = {
        "title"       : "Ms.", 
        "fullname"    : "Jon Snow", 
        "firstname"   : "Jon", 
        "lastname"    : "Snow", 
        "email"       : "jon.snow@winterfell.we",
        "username"    : "Stark",
        "password"    : "wintercomes",
        "confirmation": "wintercomes",
        "zipcode"     : "69523", 
        "country"     : "United States", 
        "state"       : "North Dakota", 
        "city"        : "Wichita", 
        "address"     : "3153 auburn ave", 
        "phone"       : "(327)-710-3077", 
        "cell"        : "(327)-710-3077", 
        "SSN"         : "966-49-5276"
    };

    var xmlhttp;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onload = function() {
        if (xmlhttp.readyState == 4 ) {
            if(xmlhttp.status == 200){
                data = JSON.parse(xmlhttp.responseText);
                fieldValueMap.title =  data.results[0].user.name.title;
                fieldValueMap.fullname = data.results[0].user.name.first + " " + data.results[0].user.name.last;
                fieldValueMap.firstname = data.results[0].user.name.first;
                fieldValueMap.lastname = data.results[0].user.name.last;
                fieldValueMap.email = data.results[0].user.email;
                fieldValueMap.username = data.results[0].user.username;
                fieldValueMap.password = data.results[0].user.password;
                fieldValueMap.confirmation = data.results[0].user.password;
                fieldValueMap.zipcode = data.results[0].user.location.zip;
                fieldValueMap.state = data.results[0].user.location.state;
                fieldValueMap.city = data.results[0].user.location.city;
                fieldValueMap.address = data.results[0].user.location.address;
                fieldValueMap.phone = data.results[0].user.phone;
                fieldValueMap.cell = data.results[0].user.cell;
                fieldValueMap.SSN = data.results[0].user.SSN;
                populateForm();
            }
            else if(xmlhttp.status == 400) {
                alert('There was an error 400')
            }
            else {
                alert('something else other than 200 was returned')
            }
        }
    }
    
    xmlhttp.open("GET", 'http://api.randomuser.me/', true);
    xmlhttp.send();

    function populateForm() {
        Object.keys( fieldValueMap ).forEach(function( name ){
            var input = document.querySelector( "form input[name='" + name + "']" )
                            || document.querySelector( "form select[name='" + name + "']" )
                || document.querySelector( "form textarea[name='" + name + "']" );

            input && input.type !== "hidden" && ( input.value = fieldValueMap[ name ] );
        });        
    }

})( window );