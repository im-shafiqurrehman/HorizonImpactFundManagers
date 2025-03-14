import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};
type forgetresponse={
  message: string;
  activationToken: string;
  user:any
}
type forgetdata={
  name:string,
  email:string,
}

interface RegisterationResponse {
  message: string;
  activationToken: string;
  user : string
}

interface RegisterationData {}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints are here
    register: builder.mutation<RegisterationResponse, RegisterationData>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }){
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
              user: result.data.user || null,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activationToken, activationCode }) => ({
        url: "activate-user",
        method: "POST",
        body: {
          activationToken,  // ✅ Correct key
          activationCode,   // ✅ Correct key
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    socialAuth: builder.mutation({
      query: ({ email, name, socialimage }) => ({
        url: "social-auth",
        method: "POST",
        body: {
          email,
          name,
          socialimage,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    logout: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    forgetpassword: builder.mutation<forgetresponse, forgetdata>({
      query: (data) => ({
        url: "/forgetpassword",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    checkResetPasswordOtp: builder.mutation({
      query: (data) => ({
        url: "/checkResetPasswordOtp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/resetPassword",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogoutQuery,
  useForgetpasswordMutation,
  useCheckResetPasswordOtpMutation,
  useResetPasswordMutation,
} = authApi;