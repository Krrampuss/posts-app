import { useState, useEffect } from "react";
import { Container, Box, Skeleton } from "@mui/material";
import { TitleSection } from "../../components/Title/TitleSection";
import { MainImageSection } from "../../components/MainImages/MainImages";
import { SocialShare } from "../../components/Social/Social";
import { RelatedPosts } from "../../components/Related/Related";
import { Header } from "../../components/Header/Header";
import { BackgroundEffects } from "../../components/BackgroundEffects/BackgroundEffects";

export const HomePage: React.FC = () => {
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#f8f8f8",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <BackgroundEffects />
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Header />
        <Container
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {IsLoading ? (
            <>
              <Skeleton variant="text" width={300} height={50} />
              <Skeleton variant="rectangular" width="80%" height={400} sx={{ borderRadius: 4 }} />
              <Skeleton variant="text" width={200} height={30} />
              <Skeleton variant="rectangular" width="80%" height={200} sx={{ borderRadius: 4 }} />
            </>
          ) : (
            <>
              <TitleSection />
              <MainImageSection />
              <SocialShare />
              <RelatedPosts />
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
};

