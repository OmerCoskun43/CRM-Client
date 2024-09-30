import { useDispatch } from "react-redux";
import { login, logout, register, refresh } from "../features/userSlice";
import useAxios from "./useAxios";
import { notifyError, notifyInfo, notifySuccess } from "../helper/HotToast";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  // onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../auth/firebase";

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosPublic, axiosWithToken } = useAxios();
  const provider = new GoogleAuthProvider();

  const handleLogin = (user) => {
    dispatch(
      login({
        data: {
          _id: user.uid || "",
          name: user.displayName || "",
          email: user.email || "",
          isAdmin: false,
          isLead: false,
          isActive: true,
          photoURL: user.photoURL || "",
          isLoggedIn: true,
        },
        accessToken: user.accessToken,
      })
    );

    navigate("/");
  };

  const loginSuccess = async (userInfo) => {
    try {
      const { data } = await axiosPublic.post("/auth/login", userInfo);
      dispatch(login(data));
      notifySuccess("Login Successful");
      navigate("/");
    } catch (error) {
      console.log("Login error:", error); // Hata günlüğü
      notifyError("Login Failed");
    }
  };

  const logoutSuccess = async () => {
    try {
      await axiosWithToken.get("/auth/logout");
      dispatch(logout());
      notifySuccess("Logout Successful");
    } catch (error) {
      console.log("Logout error:", error); // Hata günlüğü
      notifyError("Logout Failed");
    }
  };

  const registerSuccess = async (userInfo) => {
    try {
      const { data } = await axiosPublic.post("/users", userInfo);
      dispatch(register(data));
      notifySuccess("Register Successful");
      navigate("/");
    } catch (error) {
      console.log("Register error:", error); // Hata günlüğü
      notifyError("Register Failed");
    }
  };

  const refreshTokenSuccess = async (refreshToken) => {
    try {
      const { data } = await axiosWithToken.post("/auth/refresh", {
        refreshToken,
      });
      dispatch(refresh(data));
      notifySuccess("Refreshed successfully");
    } catch (error) {
      console.log(error);
      notifyError("Refresh failed");
    }
  };

  const createUser = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName });
      notifySuccess("Register Successful");
    } catch (error) {
      console.log("Create user error:", error); // Hata günlüğü
      notifyError("Register Failed");
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      handleLogin(userCredential.user);
    } catch (error) {
      console.log("Sign in error:", error); // Hata günlüğü
      notifyError("Login Failed");
    }
  };

  const logoutGoogle = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      notifySuccess("Logout Successful");
    } catch (error) {
      console.log("Logout Google error:", error); // Hata günlüğü
      notifyError("Logout Failed");
    }
  };

  const loginWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      console.log("google", userCredential.user);
      handleLogin(userCredential.user);
      notifySuccess("Login Successful");
    } catch (error) {
      console.log("Google login error:", error); // Hata günlüğü
      notifyError("Login Failed");
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      notifyInfo("Şifre sıfırlama e-postası gönderildi.");
    } catch (error) {
      console.log("Reset password error:", error); // Hata günlüğü
      notifyError("Şifre sıfırlama başarısız.");
    }
  };

  const loginWithGoogleRedirect = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.log("Google redirect login error:", error); // Hata günlüğü
      notifyError("Login Failed");
    }
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       handleLogin(user);
  //       console.log("Kullanıcı giriş yaptı");
  //     } else {
  //       dispatch(logout());
  //       console.log("Kullanıcı çıkış yaptı");
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [dispatch]);

  return {
    loginSuccess,
    logoutSuccess,
    registerSuccess,
    logoutGoogle,
    createUser,
    signIn,
    loginWithGoogle,
    resetPassword,
    loginWithGoogleRedirect,
    refreshTokenSuccess,
  };
};

export default useAuthCalls;
