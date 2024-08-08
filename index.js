#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const randomNumber = Math.floor(10000 + Math.random() * 50000);
let myBalance = 0;
let answers = await inquirer.prompt([
    {
        name: "student",
        type: "input",
        message: chalk.blue("Enter Student Name"),
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return chalk.red("Enter a Valid Name.");
        },
    },
    {
        name: "courses",
        type: "list",
        message: chalk.blue("Select the course to Enroll"),
        choices: ["HTML", "Javascript", "Python", "Typescript", "MS Office"],
    },
]);
const tutionFee = {
    "HTML": 2000,
    "Javascript": 5000,
    "Python": 8000,
    "Typescript": 10000,
    "MS Office": 4000,
};
console.log(chalk.yellowBright(`\n Tution Fees: ${tutionFee[answers.courses]}\n`));
console.log(chalk.green(`My Balance: ${myBalance}\n`));
let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: "Select Payment Method",
        choices: ["Bank Tranfer", "EasyPaisa", "JazzCash"]
    },
    {
        name: "amount",
        type: "input",
        message: "Transfer Money",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return chalk.red("Enter a Valid Amount");
        },
    }
]);
console.log(chalk.magenta(`\nYou have Selected ${paymentType.payment}\n`));
const tutionFees = tutionFee[answers.courses];
const paymentAmount = parseFloat(paymentType.amount);
if (tutionFees === paymentAmount) {
    console.log(chalk.greenBright(`Congratulations,You have successfully enrolled in ${answers.courses}.\n`));
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "What would you like to do next?",
            choices: ["View Status", "Exit"],
        }
    ]);
    if (ans.select === "View Status") {
        console.log(chalk.cyanBright(`\n********STATUS********`));
        console.log(chalk.yellow(`Student Name: ${answers.student}`));
        console.log(chalk.yellow(`Student ID: ${randomNumber}`));
        console.log(chalk.yellow(`Course:${answers.courses}`));
        console.log(chalk.yellow(`Tution Fees Paid: ${paymentAmount}`));
        console.log(chalk.yellow(`Balance: ${myBalance += paymentAmount}`));
    }
    else {
        console.log(chalk.redBright(`\nExiting Student Management System\n`));
    }
}
else {
    console.log(chalk.red("Invalid Amount"));
}
