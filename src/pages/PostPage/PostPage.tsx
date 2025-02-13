import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Skeleton,
} from "@mui/material";
import { Header } from "../../components/Header/Header";
import { Post } from "../../types/Post";
import { RootState } from "../../redux/store";
import { SocialShare } from "../../components/Social/Social";
import { BackgroundEffects } from "../../components/BackgroundEffects/BackgroundEffects";

export const PostPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setIsLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const posts = response.data;
        setPost(posts.find((p: { id: number }) => p.id === Number(id)) || null);
        setRelatedPosts(posts.slice(0, 5));
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 1000);
      });
  }, [id, isAuthenticated, navigate]);

  return (
    <Box sx={{ position: "relative", backgroundColor: "#f8f8f8", minHeight: "100vh", overflow: "hidden" }}>
      <BackgroundEffects />
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Header />
        <Box p={4} maxWidth="1200px" mx="auto" display="grid" gridTemplateColumns={{ xs: "1fr", md: "2fr 1fr" }} gap={4}>
          <Card sx={{ p: 4, backgroundColor: "transparent" }} elevation={0}>
            {IsLoading ? (
              <>
                <Skeleton variant="text" width="60%" height={40} />
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" width="70%" height={20} />
                <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 2, mt: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
                  <Skeleton variant="circular" width={40} height={40} />
                </Box>
              </>
            ) : post ? (
              <>
                <Typography variant="h4" fontWeight="bold">{post.title}</Typography>
                <Typography variant="body1" mt={2}>{post.body}</Typography>
                <Typography variant="subtitle2" color="textSecondary" mt={1}>
                  WEDNESDAY 12, MARCH 2024 · John Doe
                </Typography>
                <Box mt={2} height="300px" sx={{ backgroundColor: "#eee", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 8 }} />
                <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
                  <SocialShare />
                </Box>
              </>
            ) : null}
          </Card>
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5" fontWeight="bold">Related Articles</Typography>
              <Button
                variant="outlined"
                sx={{ borderRadius: "24px", textTransform: "none", color: "black", backgroundColor: "white", height: "42px", width: "114px", border: "1px solid #0000001A" }}
              >
                Read more
              </Button>
            </Box>
            <Box display="flex" flexDirection="column" gap={2}>
              {IsLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <Card key={index} elevation={0} sx={{ p: 2, display: "flex", gap: 2, backgroundColor: "transparent" }}>
                      <Skeleton variant="rectangular" width={100} height={100} sx={{ borderRadius: 2 }} />
                      <CardContent sx={{ flex: 1 }}>
                        <Skeleton variant="text" width="50%" />
                        <Skeleton variant="text" width="80%" />
                        <Skeleton variant="text" width="60%" />
                      </CardContent>
                    </Card>
                  ))
                : relatedPosts.map((related) => (
                    <Card
                      elevation={0}
                      component={Link}
                      to={`/post/${related.id}`}
                      key={related.id}
                      sx={{ textDecoration: "none", color: "inherit", p: 2, display: "flex", gap: 2, backgroundColor: "transparent" }}
                    >
                      <Box width="100px" height="100px" sx={{ backgroundColor: "#ddd", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 4 }} />
                      <CardContent sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" color="textSecondary">WEDNESDAY 12, MARCH 2024</Typography>
                        <Typography fontWeight="bold">{related.title}</Typography>
                        <Typography variant="body2" color="textSecondary">{related.body.slice(0, 50)}...</Typography>
                      </CardContent>
                    </Card>
                  ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};


<BackgroundEffects />;
