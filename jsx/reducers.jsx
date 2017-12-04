import { _ } from 'underscore';



const update = (state, mutations) =>
_.assign({}, state, mutations);

 const INITIAL_STATE = {
     personalId: '',
     phone: '',
     urlParams: {
         callback: '',
         grantType: '',
         appId: '',
         state: ''

    }
  };

const reducers = (state = INITIAL_STATE, action ) => {

    switch( action.type ) {

    case 'URL_PARAMS_CHANGED' :
        state = update(state, {urlParams: action.data,
                               personalId: 200360303,
                               phone: "0546592374"} );
        break;

    case 'PID_CHANGED' :
        state = update(state, {personalId: action.data} );
        break;

    case 'PHONE_CHANGED':
        state = update(state, {phone: action.data});
        break;

    default:
        return state;
    }
    return state;

};


export default reducers;
