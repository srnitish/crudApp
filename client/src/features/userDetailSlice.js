import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const loginUser = createAsyncThunk('loginUser', async({ email, password }, { rejectWithValue }) => {
    try {
        // const response = await axios.get(`https://655f574e879575426b4523e1.mockapi.io/userLogin?email=${email}&password=${password}`, { email, password });

        const response = await axios.get(`https://655f574e879575426b4523e1.mockapi.io/crud-redux?email=${email}&password=${password}`, { email, password });
        const result = response.data;
        console.log("This is a data converted with JSON", result)
        if (result[0].email === `${email}` && result[0].password === `${password}`) {
            console.log("Login Successful!!");


        } else {
            console.log('Login Failed - User Not Found')
        }
        return response.data;

    } catch (error) {
        console.error("Error Fetching Data:", error);
        return rejectWithValue(error.response.data);
    }
});


//create action : To Create User Details
export const createUser = createAsyncThunk("createUser", async(data, { rejectWithValue }) => {
    console.log("data", data);
    const response = await fetch("https://655f574e879575426b4523e1.mockapi.io/crud-redux",

        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});

//read action: To Read & Display the Data.
export const displayUser = createAsyncThunk("displayUser", async(arg, { rejectWithValue }) => {
    const response = await fetch("https://655f574e879575426b4523e1.mockapi.io/crud-redux");
    try {
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});

//delete action: To Delete the Particular User Data.
export const deleteUser = createAsyncThunk("deleteUser", async(id, { rejectWithValue }) => {
    const response = await fetch(
        `https://655f574e879575426b4523e1.mockapi.io/crud-redux/${id}`, { method: "DELETE" }
    );

    try {
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});

//update action: To Update the Data
export const updateUser = createAsyncThunk("updateUser", async(data, { rejectWithValue }) => {
    console.log("updated data", data);
    const response = await fetch(
        `https://655f574e879575426b4523e1.mockapi.io/crud-redux/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const userDetail = createSlice({
    name: "userDetail",
    initialState: {
        users: [],
        loading: false,
        error: null,
        searchData: [],
        status: 'idle',
        isAuthenticated: false,

    },

    reducers: {
        searchUser: (state, action) => {
            // console.log(action.payload);
            state.searchData = action.payload;
        },
        loginSuccess: (state) => {
            state.isAuthenticated = true;
        },
    },

    extraReducers: {
        [createUser.pending]: (state) => {
            state.loading = true;
        },
        [createUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
        },
        [createUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

        [loginUser.pending]: (state) => {
            state.loading = true;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.status = 'succeeded';
            state.isAuthenticated = true;
            state.users = action.payload.users;
            state.error = null;
            // state.users.push(action.payload);
        },
        [loginUser.rejected]: (state, action) => {
            state.loading = false;
            if (action.error.message === 'Request Failed with status code 401') {
                state.error = "Access Denied!, Invalid Credentials";
            } else {
                state.error = action.error.message;
            }

        },


        [displayUser.pending]: (state) => {
            state.loading = true;
        },
        [displayUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        [displayUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        [deleteUser.pending]: (state) => {
            state.loading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
            const { id } = action.payload;
            if (id) {
                state.users = state.users.filter((ele) => ele.id !== id);
            }
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        [updateUser.pending]: (state) => {
            state.loading = true;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = state.users.map((ele) =>
                ele.id === action.payload.id ? action.payload : ele
            );
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        }
    },
});



export default userDetail.reducer;
export const { searchUser, setCurrentPage, loginSuccess } = userDetail.actions;