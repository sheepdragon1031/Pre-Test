import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import i18n from "../i18n/index";
import { red, grey } from "@mui/material/colors";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const itemView = (min, max) => {
  if (max === "") {
    max = 20;
  }
  let arr = [];
  for (let i = 0; i < min; i++) {
    arr.push(
      <MenuItem disabled value={i}>
        {i}
      </MenuItem>
    );
  }
  for (let i = min; i <= max; i++) {
    arr.push(<MenuItem value={i}>{i}</MenuItem>);
  }
  for (let i = max + 1; i <= 20; i++) {
    arr.push(
      <MenuItem disabled value={i}>
        {i}
      </MenuItem>
    );
  }
  return arr;
};
const ageGroupSelect = ({ itemData, onAgeGroupSelectChange, itemKey }) => {
  const handleMinValue = (e) => {
    onAgeGroupSelectChange([e.target.value, itemData.value[1]], itemKey);
  };
  const handleMaxValue = (e) => {
    onAgeGroupSelectChange([itemData.value[0], e.target.value], itemKey);
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, py: 2 }}
          color="text.secondary"
          align="left"
        >
          {itemData.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            theme: "light",
            background: grey[200],
            borderRadius: 1,
          }}
        >
          <Select
            value={itemData.value[0]}
            sx={{ background: grey[100], borderRadius: 1, borderLeft: 0 }}
            fullWidth
            variant="outlined"
            defaultValue="20"
            onChange={handleMinValue}
          >
            {itemView(0, itemData.value[1])}
          </Select>
          <Typography sx={{ px: 2, borderRadius: 1 }}>~</Typography>
          <Select
            value={itemData.value[1]}
            sx={{ background: grey[200], borderRadius: 1, borderLeft: 0 }}
            fullWidth
            variant="outlined"
            defaultValue="20"
            onChange={handleMaxValue}
          >
            {itemView(itemData.value[0], 20)}
          </Select>
        </Box>
        {itemData.error && (
          <Typography
            sx={{ fontSize: 14, p: 1, background: red[300], borderRadius: 1 }}
            align="left"
            color="#fff"
          >
            {itemData.error}
          </Typography>
        )}
      </CardContent>
      {itemData.hit && (
        <CardActions sx={{ flexDirection: "row-reverse" }}>
          <Typography
            sx={{ px: 1, borderRadius: 1 }}
            color="text.secondary"
            align="right"
          >
            {i18n.tw.priceInput.hit}
          </Typography>
        </CardActions>
      )}
    </Card>
  );
};

export default ageGroupSelect;
