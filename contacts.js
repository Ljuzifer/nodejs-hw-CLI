const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  const contacts = JSON.parse(data);

  return contacts;
}

function writeContacts(contacts) {
  const newContacts = fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2),
  );

  return newContacts;
}

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((i) => i.id === contactId);
  //   return contact || null;

  if (contact === undefined) {
    return null;
  }

  return contact;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const index = contacts.findIndex((i) => i.id === contactId);

  if (index === -1) {
    return null;
  }

  //   const [deletedContact] = contacts.splice(index, 1);
  //   await fs.writeFile(contacts);

  //     return deletedContact;

  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];
  await writeContacts(newContacts);

  return contacts[index];
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);

  await writeContacts(contacts);

  return newContact;
}

async function updateContact(id, name, email, phone) {
  const contacts = await readContacts();
  const index = contacts.findIndex((i) => i.id === id);

  if (index === -1) {
    return null;
  }

  const currentContact = contacts[index];

  const updatedContact = {
    id: currentContact.id,
    name: name || currentContact.name,
    email: email || currentContact.email,
    phone: phone || currentContact.phone,
  };

  contacts[index] = updatedContact;

  await writeContacts(contacts);
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
