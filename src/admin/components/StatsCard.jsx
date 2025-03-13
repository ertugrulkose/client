import { Card, CardContent, Typography, Box } from "@mui/material";

const StatsCard = ({ title, count, icon }) => {
  return (
    <Card sx={{ display: "flex", alignItems: "center", padding: 2, minWidth: 220 }}>
      <Box sx={{ fontSize: 32, marginRight: 2 }}>{icon}</Box>
      <CardContent>
        <Typography variant="h5" fontWeight="bold">{count}</Typography>
        <Typography variant="subtitle1" color="text.secondary">{title}</Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
