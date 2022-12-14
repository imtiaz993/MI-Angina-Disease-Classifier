import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

const ResponsiveAppBar = () => {
  return (
    <AppBar position="fixed">
      <Container
        maxWidth="xl"
        sx={{ display: "flex", alignItems: "center", padding: "3px 0px" }}
      >
        <Box sx={{ flexGrow: 0 }}>
          <IconButton sx={{ p: 0, marginRight: "5px" }}>
            <Avatar
              sx={{ width: "50px", height: "50px" }}
              alt="Remy Sharp"
              src="/T09U7J9UH-U02LC9VJBD2-b865ec93e2f8-512.png"
            />
          </IconButton>
        </Box>
        <Typography
          variant="h6"
          component="a"
          href=""
          sx={{
            mr: 2,
            fontSize: "16px",
            display: { xs: "flex" },
            flexGrow: 1,
            fontWeight: 600,
            fontFamily: "monospace",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          IMTIAZ HUSSAIN
        </Typography>
        <Typography
          variant="h6"
          component="a"
          href=""
          sx={{
            fontSize: "22px",
            mr: 2,
            display: { xs: "flex" },
            flexGrow: 1,
            fontWeight: 500,
            fontFamily: "monospace",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Neural Network
        </Typography>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
