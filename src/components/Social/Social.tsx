import { Box, IconButton, Typography } from "@mui/material";
import { Facebook, Twitter, YouTube } from "@mui/icons-material";

export const SocialShare: React.FC = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
      <Typography variant="body2" mr={1} fontWeight="bold">
        Share to
      </Typography>
      <IconButton>
        <Facebook sx={{ color: "#1877F2" }} />
      </IconButton>
      <IconButton>
        <Twitter sx={{ color: "#1DA1F2" }} />
      </IconButton>
      <IconButton>
        <YouTube sx={{ color: "#FF0000" }} />
      </IconButton>
    </Box>
  );
};
