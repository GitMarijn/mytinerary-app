import comments from "../../Components/comments";

export const getCities = cities => {
  return {
    type: "GET_CITIES",
    cities
  };
};

export const citiesIsLoading = citiesIsLoading => {
  return {
    type: "CITIES_IS_LOADING",
    citiesIsLoading
  };
};

export const fetchCitiesData = () => {
  return dispatch => {
    fetch("/api/all")
      .then(response => response.json())
      .then(result => {
        dispatch(getCities(result));
        dispatch(citiesIsLoading(false));
      })
      .catch(e => console.log(e));
  };
};

export const getItineraries = itineraries => {
  return {
    type: "GET_ITINERARIES",
    itineraries
  };
};

export const itinerariesIsLoading = itinerariesIsLoading => {
  return {
    type: "ITINERARIES_IS_LOADING",
    itinerariesIsLoading
  };
};

export const fetchItinerariesData = city => {
  return dispatch => {
    fetch("/api/itinerary/" + city)
      .then(response => response.json())
      .then(result => {
        dispatch(getItineraries(result));
        dispatch(itinerariesIsLoading(false));
      })
      .catch(e => console.log(e));
  };
};

export const getActivities = activities => {
  return {
    type: "GET_ACTIVITIES",
    activities
  };
};

export const activitiesIsLoading = activitiesIsLoading => {
  return {
    type: "ACTIVITIES_IS_LOADING",
    activitiesIsLoading
  };
};

export const fetchActivitiesData = itinerary => {
  return dispatch => {
    fetch("/api/activities/" + itinerary)
      .then(response => response.json())
      .then(result => {
        dispatch(getActivities(result));
        dispatch(activitiesIsLoading(false));
      })
      .catch(e => console.log(e));
  };
};

export const getToken = token => {
  return {
    type: "GET_TOKEN",
    token
  };
};

export const getComments = comments => {
  return {
    type: "GET_COMMENTS",
    comments
  };
};

export const commentsIsLoading = commentsIsLoading => {
  return {
    type: "COMMENTS_IS_LOADING",
    commentsIsLoading
  };
};

export const fetchComments = id => {
  return dispatch => {
    fetch("/api/comments/" + id)
      .then(response => response.json())
      .then(result => {
        dispatch(getComments(result));
        dispatch(commentsIsLoading(false));
      })
      .catch(e => console.log(e));
  };
};

export const getUser = user => {
  return {
    type: "GET_USER",
    user
  };
};

export const userIsLoading = userIsLoading => {
  return {
    type: "USER_IS_LOADING",
    userIsLoading
  };
};

export const fetchUser = id => {
  return dispatch => {
    fetch("/api/user/verify/" + id)
      .then(response => response.json())
      .then(result => {
        dispatch(getUser(result));
        dispatch(userIsLoading(false));
      })
      .catch(e => console.log(e));
  };
};

export const getFavourites = favourites => {
  return {
    type: "GET_FAVOURITES",
    favourites
  };
};

export const favouritesIsLoading = favouritesIsLoading => {
  return {
    type: "FAVOURITES_IS_LOADING",
    favouritesIsLoading
  };
};

export const fetchFavourites = favs => {
  let query= "";

  for (let i = 0; i < favs.length; i++) {
    query += "f"+i+"="+favs[i];
    if (i != favs.length - 1)
      query += "&"
  }
  return dispatch => {
    fetch("/api/favourites?" + query)
      .then(response => response.json())
      .then(result => {
        dispatch(getFavourites(result));
        {console.log(result)}
        dispatch(favouritesIsLoading(false));
      })
      .catch(e => console.log(e));
  };
};