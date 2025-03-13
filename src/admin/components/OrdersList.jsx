import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const orders = [
  { id: 1, müşteri: "Ahmet Yılmaz", toplam: "1299 TL", durum: "Kargoya Verildi" },
  { id: 2, müşteri: "Merve Kaya", toplam: "899 TL", durum: "Hazırlanıyor" },
  { id: 3, müşteri: "Cemal Demir", toplam: "499 TL", durum: "Teslim Edildi" },
  { id: 4, müşteri: "Ebru Şahin", toplam: "199 TL", durum: "Hazırlanıyor" },
  { id: 5, müşteri: "Ali Çelik", toplam: "749 TL", durum: "Teslim Edildi" },
];

const OrdersList = () => {
  return (
    <TableContainer component={Paper} sx={{ padding: 2 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>Son Siparişler</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Müşteri</TableCell>
            <TableCell>Toplam</TableCell>
            <TableCell>Durum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.müşteri}</TableCell>
              <TableCell>{order.toplam}</TableCell>
              <TableCell>{order.durum}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersList;
