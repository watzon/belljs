import { Logger } from "../src/extensions/mod.ts";
import { TelegramClient } from "../src/mod.ts";
import { StringSession } from "../src/sessions/mod.ts";
import { NewMessage } from "../src/events/mod.ts";
import { NewMessageEvent } from "../src/events/NewMessage.ts";
import { CustomMessage } from "../src/tl/custom/message.ts";

const apiId = 12345;
const apiHash = "";
const stringSession = "";

async function eventPrint(event: NewMessageEvent) {
  const message = event.message as CustomMessage;

  // Checks if it's a private message (from user or bot)
  if (event.isPrivate) {
    // prints sender id
    console.log(message.senderId);
    // read message
    if (message.text == "hello") {
      const sender = await message.getSender();
      console.log("sender is", sender);
      await client.sendMessage(sender!, {
        message: `hi your id is ${message.senderId}`,
      });
    }
  }
}
const client = new TelegramClient(
  new StringSession(stringSession),
  apiId,
  apiHash,
  { connectionRetries: 5 },
);

(async () => {
  Logger.setLevel("debug");
  console.log("Loading interactive example...");
  await client.start({
    botAuthToken: "",
  });

  console.log(await client.getEntity("me"));
  console.log(client.session.save());
})();

// adds an event handler for new messages
client.addEventHandler(eventPrint, new NewMessage({}));
