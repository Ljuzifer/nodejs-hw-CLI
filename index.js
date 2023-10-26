const method = require("./db/contacts");

const { Command } = require("commander");
const program = new Command();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = method.listContacts();
      return console.table(contacts);

    case "get":
      const contact = method.getContactById(id);
      return console.log(contact);

    case "add":
      const newContact = method.addContact(name, email, phone);
      return console.log(newContact);

    case "remove":
      const deleted = method.removeContact(id);
      return console.log(deleted);

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

const argv = program.opts();

invokeAction(argv);
