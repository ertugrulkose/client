import Grid from "@mui/material/Grid2";
import StatsCard from "../components/StatsCard";
import Chart from "../components/Chart";
import OrdersList from "../components/OrdersList";
import { ShoppingCart, People, Store } from "@mui/icons-material";
import { Box } from "@mui/material";

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3} justifyContent="left">
        {/* İstatistik Kartları */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatsCard title="Toplam Sipariş" count={256} icon={<ShoppingCart />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatsCard title="Toplam Müşteri" count={120} icon={<People />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatsCard title="Toplam Ürün" count={48} icon={<Store />} />
        </Grid>


        <Grid container spacing={3} size= {{xs: 12}} >
          {/* Satış Grafiği */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Chart />
          </Grid>

          {/* Son Siparişler */}

          <Grid size={{ xs: 12, md: 6 }}>
            <OrdersList />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
