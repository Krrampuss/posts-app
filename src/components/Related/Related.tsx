import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Card, CardContent, Typography, CircularProgress, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Post } from "../../types/Post";

export const RelatedPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data.slice(0, 5));
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <Container>
      <Box
        mt={2}
        py={4}
        px={4}
        sx={{
          backgroundColor: "#F5F5F5",
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {IsLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Grid item md={2.4} key={post.id}>
                <Card component={Link} to={`/post/${post.id}`} sx={{ textDecoration: "none", color: "inherit" }}>
                  <Box sx={{ height: 120, backgroundColor: "#E0E0E0", borderRadius: 6 }} />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      WEDNESDAY 12, MARCH 2024
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.body.slice(0, 20)}...
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};





