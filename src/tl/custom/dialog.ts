import type { TelegramClient } from "../../mod.ts";
import { Api } from "../mod.ts";
import type { Entity } from "../../define.d.ts";
import { getDisplayName, getInputPeer, getPeerId } from "../../Utils.ts";
import { Draft } from "./draft.ts";
import { betterConsoleLog, returnBigInt } from "../../Helpers.ts";
import bigInt from "npm:big-integer";
import { inspect } from "../../inspect.ts";

export class Dialog {
  _client: TelegramClient;
  dialog: Api.Dialog;
  pinned: boolean;
  folderId?: number;
  archived: boolean;
  message?: Api.Message;
  date: number;
  entity?: Entity;
  inputEntity: Api.TypeInputPeer;
  id?: bigInt.BigInteger;
  name?: string;
  title?: string;
  unreadCount: number;
  unreadMentionsCount: number;
  draft: Draft;
  isUser: boolean;
  isGroup: boolean;
  isChannel: boolean;
  [Symbol.for("Deno.customInspect")]() {
    return betterConsoleLog(this);
  }

  constructor(
    client: TelegramClient,
    dialog: Api.Dialog,
    entities: Map<string, Entity>,
    message?: Api.Message,
  ) {
    this._client = client;
    this.dialog = dialog;
    this.pinned = !!dialog.pinned;
    this.folderId = dialog.folderId;
    this.archived = dialog.folderId != undefined;
    this.message = message;
    this.date = this.message!.date!;

    this.entity = entities.get(getPeerId(dialog.peer));
    this.inputEntity = getInputPeer(this.entity);
    if (this.entity) {
      this.id = returnBigInt(getPeerId(this.entity)); // ^ May be InputPeerSelf();
      this.name = this.title = getDisplayName(this.entity);
    }

    this.unreadCount = dialog.unreadCount;
    this.unreadMentionsCount = dialog.unreadMentionsCount;
    if (!this.entity) {
      throw new Error("Entity not found for dialog");
    }
    this.draft = new Draft(client, this.entity, this.dialog.draft);

    this.isUser = this.entity instanceof Api.User;
    this.isGroup = !!(
      this.entity instanceof Api.Chat ||
      this.entity instanceof Api.ChatForbidden ||
      (this.entity instanceof Api.Channel && this.entity.megagroup)
    );
    this.isChannel = this.entity instanceof Api.Channel;
  }

  // TODO implement rest
}
