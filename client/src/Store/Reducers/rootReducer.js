const initState = {
    cities: [],
    citiesIsLoading: true,
    itineraries: [],
    itinerariesIsLoading: true,
    activities: [],
    activitiesIsLoading: true,
    token: "",
    comments: [],
    commentsIsLoading: true,
    user: {},
    userIsLoading: true,
    favourites: [],
    favouritesIsLoading: true
    }

export const rootReducer = (state = initState, action) => {

    if(action.type === "GET_CITIES")
    {
        state = {
            ...state,
            cities: action.cities
        }
    }

    if(action.type === "CITIES_IS_LOADING")
    {
        state = {
            ...state,
            citiesIsLoading: action.citiesIsLoading
        }
    }

    if(action.type === "GET_ITINERARIES") {
        state = {
            ...state,
            itineraries: action.itineraries,
        }
    }

    if(action.type === "ITINERARIES_IS_LOADING"){
        state = {
            ...state,
            itinerariesIsLoading: action.itinerariesIsLoading
        }
    }

    if(action.type === "GET_ACTIVITIES") {
        state = {
            ...state,
            activities: action.activities,
        }
    }

    if(action.type === "ACTIVITIES_IS_LOADING"){
        state = {
            ...state,
            activitiesIsLoading: action.activitiesIsLoading
        }
    }

    if(action.type === "GET_TOKEN")
    {
        state = {
            ...state,
            token: action.token
        }
    }

    if(action.type === "GET_COMMENTS") {
        state = {
            ...state,
            comments: action.comments,
        }
    }

    if(action.type === "COMMENTS_IS_LOADING"){
        state = {
            ...state,
            commentsIsLoading: action.commentsIsLoading
        }
    }

    if(action.type === "GET_USER"){
        state = {
            ...state,
            user: action.user.user
        }
    }

    if(action.type === "USER_IS_LOADING"){
        state = {
            ...state,
            userIsLoading: action.userIsLoading
        }
    }

    if(action.type === "GET_FAVOURITES"){
        state = {
            ...state,
            favourites: action.favourites
        }
    }

    if(action.type === "USER_IS_LOADING"){
        state = {
            ...state,
            favouritesIsLoading: action.favouritesIsLoading
        }
    }

    return state
}