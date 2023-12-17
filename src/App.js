import "./App.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import PriceInput from "./components/priceInput";
import { useState, useEffect } from "react";
import i18n from "./i18n/index";
import AgeGroupSelect from "./components/ageGroupSelect";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
const darkTheme = createTheme({
  palette: {},
});
const addComma = (input) => {
  const reg = /\B(?=([0-9]{3})+(?![0-9]))/g;
  return input.toString().replace(reg, ",");
};
const getNumberIntervals = (input) => {
  const overlap = [];
  const notInclude = [];

  input.sort((a, b) => a[0] - b[0]);
  let startVal = 0;
  let endVal = 0;
  if (input.length > 1) {
    startVal = input[0][0];
    endVal = input[0][1];

    for (let i = 1; i < input.length; i++) {
      const flag = input[i];
      if (flag[0] >= startVal) {
        startVal = Math.max(flag[0], startVal);
      }
      if (flag[1] <= endVal) {
        endVal = Math.min(flag[1], endVal);
      }
      const next = input[i + 1];
      if (next !== undefined) {
        if (next[0] > endVal) {
          overlap.push([startVal, endVal]);
          startVal = next[0];
          endVal = next[1];
        }
      } else if (startVal <= endVal) {
        overlap.push([startVal, endVal]);
      }
    }
  } else {
    overlap.push(input);
  }

  const setInclude = new Set([]);
  for (let i = 0; i < input.length; i++) {
    for (let j = input[i][0]; j <= input[i][1]; j++) {
      setInclude.add(j);
    }
  }
  const arrInclude = [...setInclude];
  if (arrInclude[0] > 0) {
    notInclude.push([0, arrInclude[0] - 1]);
  }

  for (let i = 1; i < arrInclude.length; i++) {
    const curNumber = arrInclude[i];
    const preNumber = arrInclude[i - 1];
    if (curNumber > preNumber + 1) {
      notInclude.push([preNumber + 1, curNumber - 1]);
    }
    if (arrInclude[arrInclude.length - 1] < 20) {
      notInclude.push([arrInclude[arrInclude.length - 1] + 1, 20]);
      break;
    }
  }
  return {
    overlap: overlap,
    notInclude: notInclude,
  };
};

console.log(addComma(-7855948.9527));
console.log(
  getNumberIntervals([
    [6, 11],
    [5, 8],
    [17, 20],
    [7, 7],
    [14, 17],
  ])
);

const App = () => {
  const [count, setCount] = useState(0);
  const [formPriceInput, setFormPriceInput] = useState({
    title: i18n.tw.eCheckInPriceDay,
    value: 0,
    error: "",
    hit: true,
  });
  const [formAgeGroup, setFormAgeGroup] = useState({
    title: i18n.tw.ago,
    max: 20,
    min: 0,
    value: ["", ""],
    error: "",
    hit: false,
  });
  const [formAgeGroupPriceList, setformAgeGroupPriceList] = useState([]);
  const [groupNumber, setGroupNumber] = useState(0);
  const addGroupUI = () => {
    setformAgeGroupPriceList([
      ...formAgeGroupPriceList,
      {
        id: new Date().getTime(),
        title: i18n.tw.titleList + groupNumber,
        priceInput: {
          title: i18n.tw.eCheckInPriceDay,
          value: 0,
          error: "",
          hit: true,
        },
        ageGroup: {
          title: i18n.tw.ago,
          max: 20,
          min: 0,
          value: ["", ""],
          error: "",
          hit: false,
        },
      },
    ]);
    setGroupNumber(groupNumber + 1);
  };
  const deleGroupUI = (key) => {
    let tempData = [...formAgeGroupPriceList];
    tempData.splice(key, 1);
    setformAgeGroupPriceList(tempData);
  };
  const formPriceInputChange = (e, key) => {
    if (key > -1) {
      let tempData = [...formAgeGroupPriceList];
      tempData[key].priceInput.value = e;
      tempData[key].priceInput.error = e === "" ? i18n.tw.rules.required : "";
      setformAgeGroupPriceList(tempData);
    } else {
      setFormPriceInput({
        ...formPriceInput,
        error: e === "" ? i18n.tw.rules.required : "",
        value: e,
      });
    }
  };
  const formAgeGroupSelectChange = (e, key) => {
    if (key > -1) {
      let tempData = [...formAgeGroupPriceList];
      tempData[key].ageGroup.value = e;
      tempData[key].ageGroup.error =
        e[0] === e[1] ? i18n.tw.rules.ago.overlap : "";
      setformAgeGroupPriceList(tempData);
      setCount(count + 1);
    } else {
      setFormAgeGroup({
        ...formAgeGroup,
        value: e,
        error: e[0] === e[1] ? i18n.tw.rules.ago.overlap : "",
      });
    }
  };
  useEffect(() => {
    const PriceList = formAgeGroupPriceList.map((item) => {
      return item.ageGroup.value;
    });
    const isNum = (value) => typeof value === "number" && !isNaN(value);
    if (PriceList.every((subArray) => subArray.every(isNum))) {
      const getBack = getNumberIntervals(PriceList);
      let tempData = [...formAgeGroupPriceList];
      tempData.forEach((item) => {
        item.ageGroup.error =
          getBack.overlap.length > 0 ? i18n.tw.rules.ago.overlap : "";
      });
      setformAgeGroupPriceList(tempData);
    }
  }, [count]);
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container sx={{ pt: 2 }}>
          <Grid sx={{ py: 2 }} container spacing={2}>
            <Grid sx={{ pt: 2 }} item xs={6}>
              <PriceInput
                itemData={formPriceInput}
                onFormPriceInputChange={formPriceInputChange}
              />
            </Grid>
            <Grid sx={{ pt: 2 }} item xs={6}>
              <AgeGroupSelect
                itemData={formAgeGroup}
                onAgeGroupSelectChange={formAgeGroupSelectChange}
              />
            </Grid>
          </Grid>
          {formAgeGroupPriceList.map((item, index) => {
            return (
              <Grid container sx={{ pt: 2 }} spacing={2} key={ item.id}>
                <Grid item xs={12} md={index > 0 ? 6 : 12}>
                  <Typography
                    sx={{ px: 1, borderRadius: 1 }}
                    color="text.secondary"
                    align="left"
                  >
                    {item.title}
                  </Typography>
                </Grid>
                {index > 0 && (
                  <Grid item xs={12} md={6} align="right">
                    <Button
                      variant="outlined"
                      onClick={() => deleGroupUI(index)}
                    >
                      <DeleteIcon />
                      {i18n.tw.deleSetting}
                    </Button>
                  </Grid>
                )}

                <Grid item xs={12} md={6}>
                  <AgeGroupSelect
                    itemData={item.ageGroup}
                    itemKey={index}
                    onAgeGroupSelectChange={formAgeGroupSelectChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PriceInput
                    itemData={item.priceInput}
                    itemKey={index}
                    onFormPriceInputChange={formPriceInputChange}
                  />
                </Grid>
              </Grid>
            );
          })}
          <Grid container sx={{ pt: 2 }} spacing={2}>
            <Button variant="outlined" onClick={addGroupUI}>
              <AddIcon />
              {i18n.tw.newSetting}
            </Button>
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default App;