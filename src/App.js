import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "./Navbar";
function App() {
  const Data = [
    { id: 1, BP: 11, WB: 13, Class: "MI" },
    { id: 2, BP: 9, WB: 12, Class: "MI" },
    { id: 3, BP: 8.5, WB: 18, Class: "MI" },
    { id: 4, BP: 12, WB: 8, Class: "MI" },
    { id: 5, BP: 13, WB: 18, Class: "MI" },
    { id: 6, BP: 18, WB: 5, Class: "Angina" },
    { id: 7, BP: 20, WB: 7.5, Class: "Angina" },
    { id: 8, BP: 16.5, WB: 6, Class: "Angina" },
    { id: 9, BP: 19, WB: 6.5, Class: "Angina" },
    { id: 10, BP: 12, WB: 9, Class: "Angina" },
  ];
  const [Results, setResults] = React.useState([{}]);
  const tempResults = [];
  const [LearningRate, setLearningRate] = React.useState(0.01);
  const [weights, setWeights] = React.useState({ W1: -0.3, W2: 1 });
  const [totalEpochs, setTotalEpoch] = React.useState(2);

  var yt;
  var dt;

  const TrainModel = () => {
    console.log("Classification Started");
    const tempWeights = { ...weights };
    for (let epoch = 0; epoch < totalEpochs; epoch++) {
      for (let i = 0; i < Data.length; i++) {
        var answer = tempWeights.W1 * Data[i].BP + tempWeights.W2 * Data[i].WB;
        if (answer > 0) {
          yt = 1;
        } else yt = -1;
        if (Data[i].Class == "MI" && yt == 1) {
          let temp = {
            Currentepoch: epoch,
            ...Data[i],
            Classified: "MI",
            backgroundColor: "lightBlue",
          };
          tempResults.push(temp);

          //console.log("True", Data[i]);
        } else if (Data[i].Class == "Angina" && yt == -1) {
          let temp = {
            Currentepoch: epoch,
            ...Data[i],
            Classified: "Angina",
            backgroundColor: "lightBlue",
          };
          tempResults.push(temp);
        } else {
          // console.log("Old Weights:", tempWeights);

          if (Data[i].Class == "MI") {
            dt = 1;
            let temp = {
              Currentepoch: epoch,
              ...Data[i],
              Classified: "Angina",
              backgroundColor: "red",
            };
            tempResults.push(temp);
          } else {
            dt = -1;
            let temp = {
              Currentepoch: epoch,
              ...Data[i],
              Classified: "MI",
              backgroundColor: "red",
            };
            tempResults.push(temp);
          }

          tempWeights.W1 =
            tempWeights.W1 + LearningRate * (dt - yt) * Data[i].BP.toFixed(2);
          tempWeights.W2 =
            tempWeights.W2 + LearningRate * (dt - yt) * Data[i].WB.toFixed(2);
          let temp = {
            backgroundColor: "red",
            w1: tempWeights.W1,
            w2: tempWeights.W2,
          };
          tempResults.push(temp);
          console.log(
            "\n\nEpoch:",
            epoch + 1,
            "\n\nWrong Classified:",
            Data[i],
            "\n\nNew Weights:",
            tempWeights,
            "\n\n\n"
          );
          break;
        }
      }
    }
    setResults(tempResults);

    console.log("Classification Ended");
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          width: "95%",
          margin: "100px auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "35%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
            }}
          >
            <TextField
              id="standard-basic"
              label="Epochs"
              variant="standard"
              sx={{ marginRight: "15px" }}
              value={totalEpochs}
              onChange={(e) => {
                setTotalEpoch(e.target.value);
              }}
            />
            <TextField
              id="standard-basic"
              label="Learning Rate"
              variant="standard"
              sx={{ marginRight: "15px" }}
              value={LearningRate}
              onChange={(e) => {
                setLearningRate(e.target.value);
              }}
            />
            <TextField
              id="standard-basic"
              label="Weight 1"
              variant="standard"
              sx={{ marginRight: "15px" }}
              value={weights.W1}
              onChange={(e) => {
                setWeights((prevState) => {
                  return {
                    ...prevState,
                    W1: e.target.value,
                  };
                });
              }}
            />
            <TextField
              id="standard-basic"
              label="Weight 2"
              variant="standard"
              value={weights.W2}
              onChange={(e) => {
                setWeights((prevState) => {
                  return {
                    ...prevState,
                    W2: e.target.value,
                  };
                });
              }}
            />
          </div>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              marginBottom: "15px",
              padding: "2px",
            }}
            onClick={TrainModel}
          >
            Classify
          </Button>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead sx={{ backgroundColor: "black", color: "white" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }} align="center">
                    BP
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    WB
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Class
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Data.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        padding: "2px",
                      }}
                      align="center"
                    >
                      {item.BP}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "2px",
                      }}
                      align="center"
                    >
                      {item.WB}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "2px",
                      }}
                      align="center"
                    >
                      {item.Class}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ width: "60%" }}>
          {Results[0].BP && (
            <>
              <h3 style={{ textAlign: "center", margin: "0px 0px 10px" }}>
                Classification Results
              </h3>
              <TableContainer component={Paper} sx={{ marginTop: "0px" }}>
                <Table size="small" aria-label="a dense table">
                  <TableHead sx={{ backgroundColor: "black", color: "white" }}>
                    <TableRow>
                      <TableCell sx={{ color: "white" }} align="center">
                        Epoch
                      </TableCell>
                      <TableCell sx={{ color: "white" }} align="center">
                        ID
                      </TableCell>
                      <TableCell sx={{ color: "white" }} align="center">
                        BP
                      </TableCell>
                      <TableCell sx={{ color: "white" }} align="center">
                        WB
                      </TableCell>
                      <TableCell sx={{ color: "white" }} align="center">
                        Class
                      </TableCell>
                      <TableCell sx={{ color: "white" }} align="center">
                        Classified
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Results.map((item, index) =>
                      !item.w1 ? (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell
                            sx={{
                              backgroundColor: item.backgroundColor,
                              padding: "2px",
                            }}
                            align="center"
                          >
                            {item.Currentepoch}
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: item.backgroundColor,
                              padding: "2px",
                            }}
                            align="center"
                          >
                            {item.id}
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: item.backgroundColor,
                              padding: "2px",
                            }}
                            align="center"
                          >
                            {item.BP}
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: item.backgroundColor,
                              padding: "2px",
                            }}
                            align="center"
                          >
                            {item.WB}
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: item.backgroundColor,
                              padding: "2px",
                            }}
                            align="center"
                          >
                            {item.Class}
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: item.backgroundColor,
                              padding: "2px",
                            }}
                            align="center"
                          >
                            {item.Classified}
                          </TableCell>
                        </TableRow>
                      ) : (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell
                            sx={{
                              backgroundColor: item.backgroundColor,
                              padding: "2px",
                            }}
                            align="center"
                          >
                            New
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: item.backgroundColor,
                              padding: "2px",
                            }}
                          >
                            Weights
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: item.backgroundColor,
                              padding: "2px",
                            }}
                          ></TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: item.backgroundColor,
                              padding: "2px",
                            }}
                          ></TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: item.backgroundColor,
                              padding: "2px",
                            }}
                            align="center"
                          >
                            {item.w1.toFixed(2)}
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: item.backgroundColor,
                              padding: "2px",
                            }}
                            align="center"
                          >
                            {item.w2.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
