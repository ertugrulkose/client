import { Container, Box } from "@mui/material";
import Navbar from "../src/components/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container
         maxWidth="lg"
         sx={{
           marginTop: "100px", // Navbar sabit
           minHeight: "100vh", // Sayfa boyu
           textAlign: "center",
         }}
      >
        {children}
      </Container>
    </>
  );
};

export default Layout;
