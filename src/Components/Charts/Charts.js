import { useEffect, useState, useContext } from "react"
import { StateContext } from "../../stateProvider/StateProvider";

import { Line, Bar } from "react-chartjs-2";


export default function Charts(params) {
    const { state, setState } = useContext(StateContext);
    const [fdata, setfData] = useState([]);

    useEffect(() => {
        async function fetchData(params) {
            try {
                let res = ""
                if (state === "") {
                    res = await fetch("https://covid19.mathdro.id/api/daily");
                }
                else {
                    res = await fetch(`https://covid19.mathdro.id/api/countries/${state}`);
                }
                const dt = await res.json();
                setfData(dt);
            }
            catch (e) {
                console.error("Error : ", e);
            }
        }
        fetchData();
    }, [state])


    let date = null;
    let dead = null;
    let conform = null;
    if (fdata[0]) {
        date = fdata.map((d) => d.reportDate);
        dead = fdata.map(d => d.deaths.total);
        conform = fdata.map(d => d.totalConfirmed)
    }
    // console.log("dead", dead);
    // console.log("date", date);
    // console.log("conf", conform);

    const dataline = {
        labels: date,
        datasets: [
            {
                label: "Deaths",
                data: dead,
                fill: false,
                backgroundColor: "rgba(255,0,0,0.3)",
                borderColor: "rgba(255,0,0,0.3)"
            },
            {
                label: "Conformed",
                data: conform,
                fill: false,
                borderColor: "#777"
            }
        ]
    };
    let barConf = null;
    let barRec = null;
    let bardeath = null;
    if (state !== "" && !fdata[1]) {
        //console.log("val", fdata)
        barConf = fdata.confirmed.value
        barRec = fdata.recovered.value
        bardeath = fdata.deaths.value
        // console.log(barConf);
        // console.log(barRec);
        // console.log(bardeath);
    }
    const databar = {
        labels: ["confirmed", "recovered", "deaths"],
        datasets: [
            {
                label: 'stats',
                data: [barConf, barRec, bardeath],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    let line = null;
    if (state === "" && fdata[0]) {
        line = <Line data={dataline}></Line>
    }
    //console.log("conf", fdata)
    if (fdata.confirmed) {
        line = <Bar data={databar} />
    }

    //console.log(fdata);
    return <div>
        {line}
    </div>
}