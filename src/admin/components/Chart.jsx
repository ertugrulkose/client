import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

const data = [
  { name: "Ocak", satış: 400 },
  { name: "Şubat", satış: 600 },
  { name: "Mart", satış: 700 },
  { name: "Nisan", satış: 1200 },
  { name: "Mayıs", satış: 900 },
  { name: "Haziran", satış: 1100 },
];

const Chart = () => {
  return (
    <Card sx={{ padding: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>Aylık Satışlar</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="satış" stroke="#3f51b5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;
