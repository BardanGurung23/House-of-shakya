import { SubmitHandler, useForm } from "react-hook-form";
import "./App.css";
import Input from "./components/Input";
import Button from "./components/Button";
import { RiLoginBoxLine } from "react-icons/ri";
import { useLoginMutation } from "./redux/services/authentication";
import { handleError, handleResponse } from "./utils/responseHandler";
import { useNavigate } from "react-router-dom";
import { deleteToken, getToken, setToken } from "./utils/tokenHandler";
import { useEffect } from "react";
import Toast from "./components/Toast";
import { useDispatch } from "react-redux";
import { setAuthData } from "./redux/feature/authSlice";
import useTranslation from "./locale/useTranslation";
import Logo from "./assets/brandLogo.png";
import { jwtDecode } from "jwt-decode";
import { clearProfile } from "./redux/feature/profileSlice";
import { trimFormData } from "./utils/validationHelper";

interface FormValues {
  username: string;
  password: string;
}

interface DecodedToken {
  exp: number; // Expiration time in seconds since the epoch
  iat?: number; // Issued at time (optional)
  [key: string]: any; // Other custom claims
}

export default function App() {
  // const translate = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  useEffect(() => {
    const token = getToken("token");
    setToken("lang", "jp");
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);

        if (decodedToken?.exp * 1000 > Date.now()) {
          navigate("/admin/dashboard");
          Toast("User Logged in Successful", "success");
        } else {
          Toast("Session Expired. Please Try Again", "error");
          dispatch(clearProfile());
          deleteToken("token");
          navigate("/admin");
        }
      } catch (error) {
        Toast("Invalid Token. Please Try Again", "error");
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const trimmedData = trimFormData(data);
      const response = await login(trimmedData).unwrap();
      setToken("token", response.data.token);
      dispatch(setAuthData(response.data));
      handleResponse({
        res: response,
        onSuccess: () => navigate("/admin/dashboard"),
      });
    } catch (error) {
      handleError({ error });
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-form-wrapper">
          <div className="auth-logo-wrapper">
            <img src={Logo} alt="Logo" className="auth-logo" />
          </div>
          <h1>Nirvana Login</h1>
          <Input
            label="Username"
            placeholder="Enter your Username"
            {...register("username", { required: "Username is Required" })}
            error={errors.username}
          />
          <Input
            label="Password"
            placeholder="Password"
            type="password"
            {...register("password", { required: "Password is Required" })}
            error={errors.password}
          />
          <Button type="submit" className="submit-button">
            {" "}
            <div className="flex justify-center items-center gap-[0.5rem] text-white">
              Login <RiLoginBoxLine />
            </div>
          </Button>
        </div>
      </form>
    </main>
  );
}
