import { Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/logo.svg";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";
import { useEffect } from "react";

export const Header: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    console.log("isAuthenticated changed:", isAuthenticated);
  }, [isAuthenticated]);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        py: 2,
        borderBottom: "1px solid #ddd",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          maxWidth: "1200px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button sx={{ color: "black", textTransform: "none" }}>Home</Button>
          <Button sx={{ color: "black", textTransform: "none" }}>
            Feature
          </Button>
          <Button
            component={Link}
            to="/"
            sx={{ color: "black", fontWeight: "bold", textTransform: "none" }}
          >
            Blog
          </Button>
          <Button sx={{ color: "black", textTransform: "none" }}>
            Testimonials
          </Button>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} alt="Logo" width={100} />
        </Box>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          {isAuthenticated ? (
            <Button
              variant="outlined"
              sx={{
                borderRadius: "24px",
                textTransform: "none",
                color: "black",
                backgroundColor: "white",
                height: "42px",
                width: "114px",
                border: "1px solid #ddd",
              }}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                component={Link}
                to="/login"
                sx={{
                  borderRadius: "24px",
                  textTransform: "none",
                  color: "black",
                  backgroundColor: "white",
                  height: "42px",
                  width: "114px",
                  border: "1px solid #0000001A",
                }}
              >
                Log in
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/signup"
                sx={{
                  borderRadius: "24px",
                  textTransform: "none",
                  backgroundColor: "#04AA00",
                  color: "white",
                  height: "42px",
                  width: "114px",
                  border: "1px solid #0000001A",
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </Box>
  );
};
