import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { login } from "../../redux/slices/authSlice";
import logo from "../../assets/logo.svg";
import icon1 from "../../assets/1.svg";
import icon2 from "../../assets/2.svg";
import icon3 from "../../assets/3.svg";
import icon4 from "../../assets/4.svg";
import { ErrorForm } from "../../types/Error";

interface AuthFormProps {
  type: "login" | "signup";
}

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.includes("@")) {
      newErrors.email = ErrorForm.INVALID_EMAIL;
    }

    if (type === "signup" && !formData.firstName) {
      newErrors.firstName = ErrorForm.FIRST_NAME_REQUIRED;
    }

    if (type === "signup" && !formData.lastName) {
      newErrors.lastName = ErrorForm.LAST_NAME_REQUIRED;
    }

    if (formData.password.length < 6) {
      newErrors.password = ErrorForm.PASSWORD_TOO_SHORT;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(
      login({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
      })
    );

    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        flexDirection: "column",
      }}
    >
      <img src={logo} alt="Logo" width={240} style={{ marginBottom: "40px" }} />
      <Box
        sx={{
          display: "flex",
          width: "750px",
          height: type === "signup" ? "586px" : "480px",
          borderRadius: "25px",
          overflow: "hidden",
          backgroundColor: "white",
          border: "1px solid #000000",
        }}
      >
        <Box sx={{ flex: 2, p: 4 }}>
          <Typography variant="h5" fontWeight="bold" fontSize={24} mb={2}>
            {type === "login" ? "Sign in" : "Sign up"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Typography>Email address</Typography>
            <TextField
              placeholder="Your email address"
              fullWidth
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            {type === "signup" && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{ fontSize: "16px", fontWeight: 500, mb: "2px" }}
                  >
                    First name
                  </Typography>
                  <TextField
                    placeholder="First name"
                    fullWidth
                    margin="none"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    size="small"
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{ fontSize: "16px", fontWeight: 500, mb: "2px" }}
                  >
                    Last name
                  </Typography>
                  <TextField
                    placeholder="Last name"
                    fullWidth
                    margin="none"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    size="small"
                  />
                </Box>
              </Box>
            )}
            <Typography>Password</Typography>
            <TextField
              type={showPassword ? "text" : "password"}
              fullWidth
              placeholder="Enter password"
              margin="normal"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ cursor: "pointer" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </InputAdornment>
                ),
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Typography
                component={Link}
                to="#"
                style={{
                  color: "#04AA00",
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </Typography>
            </Box>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#04AA00",
                borderRadius: "4px",
                textTransform: "none",
                py: 1.2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
              }}
            >
              {type === "login" ? "Sign In" : "Sign Up"}
              <span style={{ fontSize: "18px" }}>→</span>
            </Button>
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
              <Typography sx={{ fontSize: 14 }}>
                {type === "signup"
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <RouterLink
                  to={type === "signup" ? "/login" : "/signup"}
                  style={{
                    color: "#04AA00",
                    fontWeight: "bold",
                    textDecoration: "underline",
                    fontSize: 14,
                  }}
                >
                  {type === "signup" ? "Sign In" : "Sign Up"}
                </RouterLink>
              </Typography>
              <RouterLink
                to="/"
                style={{
                  color: "#04AA00",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  fontSize: 14,
                }}
              >
                Continue as Guest
              </RouterLink>
            </Box>
          </form>
        </Box>
        <Box
          sx={{
            flex: 1,
            backgroundColor: "black",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          {type === "signup" ? (
            <>
              <Typography variant="h6" fontWeight="bold" fontSize={23}>
                Get Your FREE 30-Days Trial Now!
              </Typography>
              <Box mt={4} sx={{ textAlign: "left", color: "white" }}>
                {[
                  {
                    icon: icon1,
                    title: "Absolutely FREE",
                    desc: "No hidden charges, No credit card required",
                  },
                  {
                    icon: icon2,
                    title: "Fast & Easy",
                    desc: "Get access instantly, no downloads required",
                  },
                  {
                    icon: icon3,
                    title: "Your Own Data",
                    desc: "Enjoy the Free Trial with your company data",
                  },
                  {
                    icon: icon4,
                    title: "Unlimited Features",
                    desc: "Access all features of the world's #1 business software!",
                  },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <img
                      src={item.icon}
                      alt={item.title}
                      style={{
                        marginBottom: "30px",
                        marginRight: "5px",
                      }}
                    />
                    <Box>
                      <Typography fontWeight="bold" color="white" fontSize={16}>
                        {item.title}
                      </Typography>
                      <Typography fontSize={12} color="#484848">
                        {item.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Typography variant="body2" mt={8} color="#ccc">
                Call us at{" "}
                <span style={{ color: "#04AA00" }}>800 1301 448</span>
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h5" fontWeight="bold">
                Kodix{" "}
                <Box
                  component="span"
                  sx={{
                    backgroundColor: "black",
                    color: "#00FF00",
                    border: "1px solid #1FFF1A",
                    borderRadius: "8px",
                    padding: "2px 8px",
                    fontSize: "12px",
                    marginLeft: "6px",
                  }}
                >
                  PRO
                </Box>
              </Typography>
              <Typography
                sx={{
                  color: "#777",
                  marginTop: "10px",
                  fontSize: "14px",
                  maxWidth: "220px",
                  textAlign: "center",
                }}
              >
                Unlimited traffic, strategic support, and AI-driven upsells
              </Typography>
              <Typography
                component="a"
                href="#"
                sx={{
                  color: "#1FFF1A",
                  fontSize: "14px",
                  textDecoration: "underline",
                  marginTop: "20px",
                }}
              >
                Learn More
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
