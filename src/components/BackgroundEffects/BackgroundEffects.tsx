import { Box } from "@mui/material";

export const BackgroundEffects: React.FC = () => {
    return (
      <>
        <Box sx={{ position: "absolute", top: "25%", left: "-10%", width: "600px", height: "700px", backgroundColor: "#1FFF1A", borderRadius: "50%", filter: "blur(200px)", zIndex: 0 }} />
        <Box sx={{ position: "absolute", top: "10%", right: "-10%", width: "500px", height: "600px", backgroundColor: "#1FFF1A", borderRadius: "50%", filter: "blur(100px)", zIndex: 0 }} />
      </>
    );
  };