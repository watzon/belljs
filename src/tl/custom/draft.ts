import type { Entity } from "../../define.d.ts";
import type { TelegramClient } from "../../mod.ts";
import { getInputPeer, getPeer } from "../../Utils.ts";
import { Api } from "../mod.ts";
import { betterConsoleLog } from "../../Helpers.ts";
import { inspect } from "../../inspect.ts";

export class Draft {
  private _client: TelegramClient;
  private readonly _entity?: Entity;
  private readonly _peer: ReturnType<typeof getPeer>;
  private _inputEntity: Api.TypeInputPeer | undefined;
  private _text?: string;
  private _rawText?: string;
  private date?: Api.int;
  private linkPreview?: boolean;
  private replyToMsgId?: Api.int;

  [Symbol.for("Deno.customInspect")]() {
    return betterConsoleLog(this);
  }

  constructor(
    client: TelegramClient,
    entity: Entity,
    draft: Api.TypeDraftMessage | undefined,
  ) {
    this._client = client;
    this._peer = getPeer(entity);
    this._entity = entity;
    this._inputEntity = entity ? getInputPeer(entity) : undefined;
    if (!draft || !(draft instanceof Api.DraftMessage)) {
      draft = new Api.DraftMessage({
        message: "",
        date: -1,
      });
    }
    if (!(draft instanceof Api.DraftMessageEmpty)) {
      this.linkPreview = !draft.noWebpage;
      this._text = client.parseMode
        ? client.parseMode.unparse(draft.message, draft.entities || [])
        : draft.message;
      this._rawText = draft.message;
      this.date = draft.date;
      this.replyToMsgId = draft.replyToMsgId;
    }
  }

  get entity() {
    return this._entity;
  }

  get inputEntity() {
    if (!this._inputEntity) {
      this._inputEntity = this._client._entityCache.get(this._peer);
    }
    return this._inputEntity;
  }

  // TODO later
}
