import express from "express";
import chalk from "chalk";

const server = express();

const holidays = [
  { date: "1/1/2022", name: "Confraternização mundial" },
  { date: "1/3/2022", name: "Carnaval" },
  { date: "4/17/2022", name: "Páscoa" },
  { date: "4/21/2022", name: "Tiradentes" },
  { date: "5/1/2022", name: "Dia do trabalho" },
  { date: "6/16/2022", name: "Corpus Christi" },
  { date: "9/7/2022", name: "Independência do Brasil" },
  { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
  { date: "11/2/2022", name: "Finados" },
  { date: "11/15/2022", name: "Proclamação da República" },
  { date: "12/25/2022", name: "Natal" }
];

server.get("/holidays", (req,res) => {
  res.send(holidays);
})

server.get("/holidays/:month", (req,res) => {
  const { month } = req.params;
  const holidaysMonth = holidays.filter(holiday => {
    const date = new Date(holiday.date);
    const monthOfDate = date.getMonth();
    return monthOfDate === month - 1;
  });

  res.send(holidaysMonth);
})

server.get("/is-today-holiday", (req,res) => {
  const today = new Date().toLocaleDateString();
  console.log(today); // 1/1/2022

  const isHoliday = holidays.find(holiday => {
    return holiday.date === today;
  })

  console.log(isHoliday);

  if(isHoliday){
    res.send(`Yes, today in Brazil is a holiday and the name of the holiday is: ${isHoliday.name}`);
  } else {
    res.send("Today is not a holiday :(")
  }
})

server.listen(5000, () => {
  console.log(chalk.bold.green(`Aplicação está funcionando!`))
})

