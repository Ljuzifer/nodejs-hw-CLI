const method = require("./contacts");
// const { program } = require("commander");
const { Command } = require("commander");
const program = new Command();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await method.listContacts();
      return console.table(contacts);

    case "get":
      const contact = await method.getContactById(id);
      return console.log(contact);

    case "add":
      const newContact = await method.addContact(name, email, phone);
      return console.log(newContact);

    case "remove":
      const deleted = await method.removeContact(id);
      return console.log(deleted);

    case "update":
      const updated = await method.updateContact(id, name, email, phone);
      return console.log(updated);

    default:
      return console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

invokeAction(options);
