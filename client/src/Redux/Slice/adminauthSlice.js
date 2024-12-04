import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "user",
  initialState: {
    userlist: [],
    userbyIdlist: [],
    loginuserlist: [],
    allvichelebyIdlist: [],
    allvicheleby_detalsIdlist: [],
    alldriverby_detalsIdlist: [],
    alldriverby_detalsIdlist: [],
    getby_iddriverby_detalsIdlist: [],
    getallModeldata_byownerlist: [],
    getallplanlist_list: [],
    allterminalbyIdlist: [],
    updateterminalbyIdlist: [],
    getid_terminalbyIdlist:[],
    gettrailers_urllist:[],
    gettrailers_urllistby_id:[],
    getVoilations_urllist:[],
    loading: false, // Track loading state
    error: null,  
  },
  reducers: {
    alluserslice: (state, action) => {
      state.userlist = action.payload.data;
    },
    userbyIdslice: (state, action) => {
      state.userbyIdlist = action.payload.data;
    },
    getloginuserslice: (state, action) => {
      state.loginuserlist = action.payload;
    },
    userbyIdslice: (state, action) => {
      state.userbyIdlist = action.payload.data;
    },
    allvichelsslice: (state, action) => {
      state.allvichelebyIdlist = action.payload.data;
    },
    VichelsBy_idbyIdslice: (state, action) => {
      state.allvicheleby_detalsIdlist = action.payload.data;
    },
    alldriver_byadminslice: (state, action) => {
      state.alldriverby_detalsIdlist = action.payload.data;
    },
    alldatbyowner_adminSlice:(state, action) =>{
      state.getallModeldata_byownerlist = action.payload.data || [];
    },
    getdriver_byadminIdslice: (state, action) => {
      state.getby_iddriverby_detalsIdlist = action.payload.data;
    },
    getallplanlist_slice: (state, action) => {
      state.getallplanlist_list = action.payload.data;
    },
    getallterminallist_slice: (state, action) => {
      state.allterminalbyIdlist = action.payload;
    },
    getaupdateterminallist_slice: (state, action) => {
      state.updateterminalbyIdlist = action.payload;
    },
    getterminal_idslice: (state, action) => {
      state.getid_terminalbyIdlist = action.payload;
    },
    gettrailers_urllist_slice: (state, action) => {
      state.gettrailers_urllist = action.payload
    },
    gettrailers_idslice: (state, action) => {
      state.gettrailers_urllistby_id = action.payload.data;
    },
    Voilationsslice: (state, action) => {
      state.getVoilations_urllist = action.payload.data;
    },


  },
});
export const authReducer = authSlice.reducer;
export const { alluserslice, userbyIdslice, getloginuserslice, allvichelsslice, VichelsBy_idbyIdslice, alldriver_byadminslice, getdriver_byadminIdslice,alldatbyowner_adminSlice, getallplanlist_slice,getallterminallist_slice,getterminal_idslice,gettrailers_urllist_slice,gettrailers_idslice,getaupdateterminallist_slice ,Voilationsslice} = authSlice.actions;