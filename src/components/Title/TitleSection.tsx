import { Box, Typography, Avatar } from "@mui/material";
import Featured from "../../assets/Featured.svg";

export const TitleSection = () => {
  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <img src={Featured} alt="Featured" />
      </Box>
      <Typography
        sx={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: "40px",
          lineHeight: "48px",
          letterSpacing: "-0.5px",
          textAlign: "center",
          marginTop: 1,
        }}
      >
        Global Climate Summit <br /> Urges Immediate Action
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ marginTop: 2, maxWidth: "600px" }}
      >
        Leaders from around the world gathered for a global climate summit,
        emphasizing the urgent need for coordinated action to address climate change.
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginTop: 3,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          WEDNESDAY 12, MARCH 2024
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            backgroundColor: "#F5F5F5",
            borderRadius: "24px",
            padding: "6px 12px",
          }}
        >
          <Avatar sx={{ bgcolor: "#E0E0E0", width: 32, height: 32 }} />
          <Typography variant="body2" fontWeight="bold">
            John Doe
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
