//<![CDATA[
//Written by Seth Greylyn, released under the FreeBSD license.

  // Delay between geocode requests - 100 miliseconds seems to work well,
  // but logic will adjust value if necessary
  var delay = 100;

  // ====== Sentinel to ensure compliance with business rules ======
  function matchesRequirements(result){
      if(1!=result.length){
          return false;
      }else if("ROOFTOP" != result[0].geometry.location_type || result[0].partial_match){
          return false;
      }
      return true;
  }
  
  // ====== Flag determines whether erroneous results are displayed ======
  var SEE_ERROR = true;

  // ====== Returns appropriate business rule violation ======
  function sieveError(result){
    if(1!=result.length){
          return "Multiple locations returned";
      }else if("ROOFTOP" != result[0].geometry.location_type){
        return "Address not ROOFTOP quality";
      }else if(result[0].partial_match){
          return "Only found a partial match";
      }else{
        return "Unspecified failure";
      }
      
  }

  // ====== Declare a client geocoder ======
  var geo = new google.maps.Geocoder(); 
  
  // ====== Geocoding ======
  function getAddress(search, next) {
    geo.geocode({address:search}, function (result, status)
      { 
        // If that was successful
        if (status == google.maps.GeocoderStatus.OK&&matchesRequirements(result)) {
          // The result exists and is singular, non-partial, of "ROOFTOP" quality.
          var p = result[0].geometry.location;
          var lat=p.lat();
          var lng=p.lng();
          // Display the results in XML format
          var xml = '&nbsp;&nbsp;&lt;marker address="' + search + '" lat="' +lat+ '" lng="' +lng+ '"&gt;<br>';
          document.getElementById("message").innerHTML += xml;
        }
        else {
          // === if we were sending the requests too fast, retry with a longer delay
          if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            nextAddress--;
            delay++;
          } else if(SEE_ERROR){
            
            var sieve = "";
            
            if(google.maps.GeocoderStatus.OK == status){
                sieve = sieveError(result);
            } else{
                sieve = status;
            }
            
            var xml = '&nbsp;&nbsp;&lt;marker address="' + search + '" error="' +sieve+ '"&gt;<br>';
            document.getElementById("message").innerHTML += xml;
          }   
        }
        next();
      }
    );
  }



  // ======= An array of locations that we want to geocode ========
  var addresses = [
        "3895 Church Street, Clarkston, GA 30021, USA",
        "7665 Honey Abbey, Koggiung, MA",
        "9974 Round Bluff Villas, Hemp, NH",
        "1103 Bombay Lane, Roswell, GA 30076, USA",
        "8462 Lazy Walk, Lumpkin, VA",
        "4716 Cinder Cider Green, Bowbells, NH",
        "7206 Hidden Alley, Badnation, HI",
        "2991 Middle Branch Corner, Baltimore, MS",
        "4501 Harvest Lagoon Trail, Screamer, VT",
        "6375 Spalding Drive Suite B Norcross",
        "4675 Highway 27 North, Carrollton, GA",
        "5370 Ash Street",
        "1978 Mount Vernon Road, Atlanta, GA 30338, USA",
        "4827 Indian Wharf, Dew Drop, NH, 03637-1315",
        "9418 Lost Stead, Sioux Lookout, ME",
        "3185 Rocky Valley, Bumble Bee, ND",
        "180 Foggy Lane, Line Store, MS",
        "4535 Silent Freeway, Bamboo, KY",
        "6109 Bright Loop, Gaysport, WV",
        "8407 Fallen Moor, Oklahoma, WI",
        "1761 Wishing Row, Churchill, PA",
        "6704 Little Quail Beach, Khwunrghunme, PA",
        "5167 Gentle Butterfly Arbor, Absaraka",
        "3837 Jagged Rise Point, Glenavon, ID",
        "3230 Cotton Diversion, New Market, AZ",
        "1684 Colonial Prairie Parade, Dry Prong, SD",
        "249 Waddell Street, Athens, GA",
        "4889 Burning Horse Circuit, Hanna, NY",
        "99 Shady Bear Extension, Chuloonawick, GA",
        "662 Colonial Beacon Highway, Kracker Station, OK",
        "2625 Middle Townline, Dot, CT",
        "2470 Crystal Bay, Chaplin, MS",
        "4368 Hartley Bridge Road, Macon, GA",
        "1183 Golden Cape, Chew, ME",
        "8276 Easy Towers, Cantaloupe, TX",
        "6278 Umber Lake Downs, Glen Comfort, TN",
        "3199 Merry Maze, Powassan, UT",
        "1310 Emerald Meadow, Folly, SD",
        "1125 Cozy Elk Centre, Wakatomika, SD",
        "4350 Rocky Ridge, Rodney, CT",
        "9678 Stony Branch Park, Curtin, WV",
        "8447 Lazy Glade, Cloud Chief, ND",
        "1983 Little Anchor Private, Riverview, CT",
        "4564 Pleasant Sky Front, Counselor, CO",
        "5942 Honey Blossom Freeway, Busti, MA",
        "7327 Tawny Hills Way, Buffalolick, ID",
        "8335 Heather Edge, Thistledown, WV",
        "1967 Grand Rabbit Pointe, Radical, CT",
        "3100 8th Street, Columbus, GA",
        "1203 Cozy Mews, Idahome, VT",
        "6025 Gentle Robin Parkway, Live Easy, AR",
        "3967 Hidden Vale, Obsidian, MO",
        "4896 Shady Drive, Toy, MS",
        "6616 Heather Spring Road, Duval, AZ",
        "5157 Velvet Place, Fort Fizzle, SC",
        "8621 Stony Alley, Tobasco, IN",
        "2823 Merry Beacon Highlands, Horse Shoe Run, CA",
        "5756 Old Manor, Star, PA",
        "197 Indian Park, Birds Landing, SD",
        "1290 Dusty Rise, Kerrobert, NJ",
        "4172 Broad Wynd, Beaverton, NE",
        "2450 Northwest 150th Street, Opa-locka, FL",
        "4471 Bright Pines, Pilot Butte, NJ",
        "7722 Quaking Arbor, Prohibition City, NJ",
        "5617 Green Range, Tumtum, OH",
        "4190 Rocky Brook Grounds, Trump, AZ",
        "3074 Middle Pond Corner, Vibank, ID",
        "4228 Cinder Wagon Gardens, Dovetail, MS",
        "12303 Southwest 133rd Court, Miami, FL",
        "7843 Fallen Carrefour, Rocky Ripple, HI",
        "8215 Blue Concession, Vixen, CO",
        "4661 Hazy Autoroute, Coffee City, IL",
        "4540 Silent Villas, Cinderella, GA",
        "2149 Merry View Hill, Klickitat, TX",
        "239 Green Quay, Dilly, WY",
        "4351 Emerald Beach, Thrashers Corner, AK",
        "1689 Osprey Bend, Weston, FL",
        "7033 Jagged Turnabout, Satsop, HI",
        "3168 Easy Way, Buchanan, AK",
        "5185 Silver Panda Freeway, Rembrandt, VA",
        "3483 Middle Robin Lane, Snow Tent, WA",
        "75 East Indiantown Road, Concourse Village Shopping Center, Jupiter, FL",
        "9561 Amber Leaf Mountain, Hat Creek, PA",
        "7609 Cinder Treasure Lookout, Bootleg, HI",
        "747 Golden Gardens, Village Thirteen, KS",
        "6143 Tawny Branch Valley, Chapultepee, ID",
        "3323 Little Ramp, Milk River, AK",
        "91 Wishing Plaza, Modest, AZ",
        "69 Clark Drive, Russellville, AL",
        "6163 Old Subdivision, Daysland, ME",
        "470 Thunder Green, Lumpkin, AR",
        "8868 Colonial Rise Orchard, Land of Pines, PA",
        "4390 Sunny Mews, Sacred Heart, KY",
        "9994 Rocky Cape, Goodtown, TN",
        "4791 Umber Panda Grounds, Chuckanut, MO",
        "9134 Gentle Cloud Avenue, Speers, MN",
        "6307 Dusty Sky Bend, Drumright, TN",
        "9592 Noble Rabbit Crest, X-Prairie, ID",
        "107 East 3rd Avenue, Crossett, AR 71635",
        "6628 Shady Point, Weeping Mary, MA",
        "6140 Thunder Wood, Contoocook, MN"
  ];

  // ======= Iterator for the recursive loop
  var nextAddress = 0;

  // ======= Function to call the next geocode operation when the reply comes back
  function theNext() {
    if (nextAddress < addresses.length) {
      setTimeout('getAddress("'+addresses[nextAddress]+'",theNext)', delay);
      ++nextAddress;
    } else {
      document.getElementById("message").innerHTML += "&lt;/markers&gt;";
    }
  }

  // ======= Call that function for the first time =======
  theNext();

// This Javascript is based on code provided by the
// Community Church Javascript Team
// http://www.bisphamchurch.org.uk/   
// http://econym.org.uk/gmap/

//]]>